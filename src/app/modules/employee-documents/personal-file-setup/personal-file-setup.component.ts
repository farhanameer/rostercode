import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfigureCategoryFieldsService } from "../services/configure-category-fields.service";
import { PersonalFileSetupService } from "../services/personal-file-setup/personal-file-setup.service";
import { ToastService } from "../services/toast.service";
import { ObservableService } from "../util/observablefn.service";

@Component({
  selector: "app-personal-file-setup",
  templateUrl: "./personal-file-setup.component.html",
  styleUrls: ["./personal-file-setup.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("openClose", [
      state("maximize", style({ display: "flex" })),
      state("minimize", style({ display: "none" })),
      transition("maximize <=> minimize", [animate("100ms ease-in-out")]),
    ]),
  ],
})
export class PersonalFileSetupComponent implements OnInit {
  personalSetupForm: FormGroup;
  personalSetupFilterForm: FormGroup;

  title: String = "";
  regionArray = [];
  bandArray = [];
  departmentArray = [];
  designationArray = [];

  filterURLs = ["getCountry", "getDepartment", "getBand", "getDesignation"];

  submissionType: String = "";

  status: string = "1";
  isDefault: boolean = false;

  personalFilesDetails = [];
  personalFileCategories = [];
  onboardingCategories = [];
  officeUseDocuments = [];

  filtersData = ["regionId", "departmentId", "bandId", "designationId"];

  filter = {};
  location: Array<any> = [];
  categories = [];
  statePersonal: string = "maximize";
  stateSavedPersonal: string = "maximize";
  submitted: boolean = false;

  pageIndex: number = 0;
  lowValue: number = 0;
  highValue: number = 5;
  pageSize: number = 5;
  pageNumber: number = 1;
  clientId = this.os.getClientId();
  mode: string = "create";

  disabledReset: boolean = true;
  isUpdating: boolean = false;
  updateFileSetupId: number = 0;
  appliedFilters = {};
  disableInfinitScroll: Boolean = false;
  defaultSetupIndex: number = -1;

  isLoaded = {
    region: false,
    department: false,
    band: false,
    designation: false,
  };
  disabledSave: boolean = true;

  @ViewChild("personalFileRefForm") personalFileRefForm: FormGroupDirective;
  @ViewChild("filtersRefForm") filtersRefForm: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private os: ObservableService,
    private pfSetup: PersonalFileSetupService,
    private filedsConfiguration: ConfigureCategoryFieldsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getPersonalFilesDetails({});

    this.getData("/getCountry", this.clientId);

    this.initForm();

    this.personalSetupFilterForm = this.fb.group({
      regionId: [""],
      departmentId: [""],
      bandId: [""],
      designationId: [""],
    });
  }

  initForm() {    
    this.personalSetupForm = this.fb.group({
      title: ["", Validators.required],
      regionId: ["", Validators.required],
      departmentId: ["", Validators.required],
      bandId: ["", Validators.required],
      designationId: ["", Validators.required],
      submissionType: ["", Validators.required],
      isDefault: [false],
      status: ["1"],
    });
  }

  getDynamicHeight() {
    return `${
      this.personalFilesDetails.length < this.pageSize
        ? 30 * this.personalFilesDetails.length + 30
        : 30 * this.pageSize + 30
    }px`;
  }

  async getPersonalFilesDetails(
    params,
    pageNumber = this.pageNumber,
    pageSize = this.pageSize
  ) {
    for (const filter of this.filtersData) {
      console.log(params, filter);
      if (!params[filter]) delete params[filter];
    }

    this.appliedFilters = params;
    const response = await this.os.asPromised(
      this.pfSetup.getPersonalFilesDetails(
        this.clientId,
        params,
        pageNumber,
        pageSize
      )
    );

    if (this.personalFilesDetails.length == 0)
      this.personalFilesDetails = response.payload.data;
    else if (response.payload.page == 1 && response.payload.data.length == 0)
      this.personalFilesDetails = [];
    else if (response.payload.page == 1)
      this.personalFilesDetails = response.payload.data;
    else if (response.payload.page != 1 && response.payload.data.length == 0)
      this.disableInfinitScroll = true;
    else {
      const newHash = {};

      response.payload.data.forEach((rs) => {
        newHash[rs.id] = rs;
      });

      this.personalFilesDetails.forEach((pr) => {
        if (newHash[pr.id]) {
          delete newHash[pr.id];
        }
      });

      for (const property in newHash) {
        this.personalFilesDetails.push(newHash[property]);
      }

      // this.personalFilesDetails = this.personalFilesDetails.concat(response.payload.data);
    }

    console.log("final Array ", this.personalFilesDetails);

    if (this.defaultSetupIndex == -1) {
      this.personalFilesDetails.forEach((file, index) => {
        if (file.setAsDefault == 1) {
          this.defaultSetupIndex = index;
        }
      });
    }
  }

  get fieldsConfiguration() {
    return this.personalSetupForm.controls["fieldsConfiguration"] as FormArray;
  }

  async getLocation(url, cId) {
    // this.location = (
    //   await this.os.asPromised(this.psSetup.getCountries(cId))
    // ).data;
  }
  // async editPersonalFileSetup(personalFileId) {
  //     const PersonalFileSetupData = await this.os.asPromised(
  //       this.pfSetup.editPersonalFileSetup(personalFileId)
  //     )["payload"];

  //     this.regionArray.push({
  //       country_id: PersonalFileSetupData.countries.id,
  //       country: PersonalFileSetupData.countries.name,
  //     });
  //     this.departmentArray.push({
  //       id: PersonalFileSetupData.states.id,
  //       value: PersonalFileSetupData.states.name,
  //     });
  //     this.bandArray.push({
  //       id: PersonalFileSetupData.cities.id,
  //       city_name: PersonalFileSetupData.cities.name,
  //     });
  //     this.designationArray.push({
  //       loc_id: PersonalFileSetupData.branches.id,
  //       loc_decs: PersonalFileSetupData.branches.name,
  //     });
  //     this.personalSetupForm.controls['isDefault'].setValue(PersonalFileSetupData.id)
  //     this.personalSetupForm.controls['title'].setValue(PersonalFileSetupData.title)
  //     this.personalSetupForm.controls['submissionType'].setValue(PersonalFileSetupData.submissionType)

  //     for (const key in PersonalFileSetupData) {
  //       this.personalSetupForm.controls[key].setValue(PersonalFileSetupData[key].id);
  //     }

  //     this.mode = "update";
  // }

  changeDropdown(control) {
    let url = `/get${control}`;
    this.getData(url, this.clientId);
    this.enableSave()
  }
  async getData(url, clientId) {
    const data = (
      await this.os.asPromised(this.pfSetup.getStaticData(url, clientId))
    ).data;

    if (data && url == "/getCountry") this.isLoaded.region = true;
    if (data && url == "/getDepartment") this.isLoaded.department = true;
    if (data && url == "/getBand") this.isLoaded.band = true;
    if (data && url == "/getDesignation") this.isLoaded.designation = true;

    if (url === "/getCountry") this.regionArray = data;
    if (url === "/getDepartment") this.departmentArray = data;
    if (url === "/getBand") this.bandArray = data;
    if (url === "/getDesignation") this.designationArray = data;
    return data;
  }
  addNewCategoryField() {
    const fieldsConfigurationForm: FormGroup = this.fb.group({
      // documentCategoryFieldId: ["", Validators.required],
      isMandatory: [true],
      catField: [""],
      forSubmission: [""],
      forReview: [""],
      templateUrl: [""],
      // designationId: ["", Validators.required],
    });

    // async getCountries(cId) {
    //   this.countries = (
    //     await this.os.asPromised(this.plSetup.getCountries(cId))
    //   ).data;
    // }
  }

  async getCategories() {
    console.log("get categories");

    let allCategories = (
      await this.os.asPromised(this.pfSetup.getCategories(this.clientId))
    ).payload;

    allCategories.forEach((category) => {
      if (category.parentCategory == "Personal File") {
        this.personalFileCategories = category.childCategories;
      }
      if (category.parentCategory == "Onboarding Documents") {
        this.onboardingCategories = category.childCategories;
      }
      if (category.parentCategory == "Office Use Documents") {
        this.officeUseDocuments = category.childCategories;
      }
    });
  }
  maxMinPersonalCard() {
    this.statePersonal =
      this.statePersonal == "maximize" ? "minimize" : "maximize";
  }
  maxMinSavedPersonalCard() {
    this.stateSavedPersonal =
      this.stateSavedPersonal == "maximize" ? "minimize" : "maximize";
  }

  addRecord() {
    this.submitted = true;
  }

  get validation() {
    return this.personalSetupForm.controls;
  }
  get f_validation() {
    return this.personalSetupFilterForm.controls;
  }

  // getPaginatorData(event) {
  //   if (event.pageIndex === this.pageIndex + 1) {
  //     this.lowValue = this.lowValue + this.pageSize;
  //     this.highValue = this.highValue + this.pageSize;
  //   } else if (event.pageIndex === this.pageIndex - 1) {
  //     this.lowValue = this.lowValue - this.pageSize;
  //     this.highValue = this.highValue - this.pageSize;
  //   }
  //   this.pageIndex = event.pageIndex;
  // }
  matSelect: boolean = true;
  async changeStatus(action, fileId) {
    const response = await this.os.asPromised(
      this.pfSetup.changeStatus(this.clientId, action, fileId)
    );

    if (response.status) {
      this.toastService.toast("Status Changed Successfully!", "success-toast");

      this.personalFilesDetails.forEach((file) => {
        if (file.id == fileId) {
          if (action) file.status = 1;
          if (!action) file.status = 0;
          this.matSelect = false;
          this.matSelect = true;
        }
      });
    } else this.toastService.toast(response.message, "error-toast");
  }

  async updatePersonalFileSetup() {
    const newConfigurations = this.filedsConfiguration.getFieldConfiguration();
    const deletedConfigurations =
      this.filedsConfiguration.getDeleteConfiguration();
    const updatedConfigurations =
      this.filedsConfiguration.getUpdatedConfiguration();

    const designationId = this.personalSetupForm.controls.designationId.value;
    const bandId = this.personalSetupForm.controls.bandId.value;
    const regionId = this.personalSetupForm.controls.regionId.value;
    const isDefault = this.personalSetupForm.controls.isDefault.value;
    const isLive = this.toBoolean(this.personalSetupForm.controls.status.value);
    const title = this.personalSetupForm.controls.title.value;
    const departmentId = this.personalSetupForm.controls.departmentId.value;
    const submissionType = this.personalSetupForm.controls.submissionType.value;
    const cId = this.clientId;

    // if (isDefault == "true") isDefault = true;
    // else isDefault = false;

    const payload = {
      deleteConfiguration: deletedConfigurations,
      newConfiguration: newConfigurations,
      updateConfiguration: updatedConfigurations,
      isLive,
      title,
      regionId,
      departmentId,
      designationId,
      bandId,
      submissionType,
      cId,
      isDefault,
      id: this.updateFileSetupId,
    };

    const response = await this.os.asPromised(
      this.pfSetup.updateCategoriesFieldsConfigurations(payload)
    );

    if (response.status) {
      this.isUpdating = false;
      this.toastService.toast(
        "Personal Setup updated Successfully!",
        "success-toast"
      );
    } else this.toastService.toast(response.message, "error-toast");

    setTimeout(() => {
      this.personalFileRefForm.reset();
      this.validation.status.setValue("1");
      this.validation.isDefault.setValue(false);
      this.isUpdating = false;
    
      this.getCategories();
      this.getPersonalFilesDetails({});
    }, 0);

    return;
  }

  getCorrectPageNumber(documentLength, currentPage, pageSize) {
    const currentSize = currentPage * pageSize;
    console.log(currentSize);
    if (documentLength < currentSize) {
      return this.getCorrectPageNumber(
        documentLength,
        currentPage - 1,
        pageSize
      );
    } else if (documentLength > currentSize) {
      return currentPage + 1;
    } else if (documentLength == currentSize) {
      return currentPage + 1;
    }
  }
  async createPersonalFile() {
    if (this.isUpdating) {
      const newConfigurations =
        this.filedsConfiguration.getFieldConfiguration();
      const deletedConfigurations =
        this.filedsConfiguration.getDeleteConfiguration();
      const updatedConfigurations =
        this.filedsConfiguration.getUpdatedConfiguration();
      
      this.getCategories();
      this.getPersonalFilesDetails({});
      
      return;
    }
    this.submitted = true;

    const fieldsConfiguration =
      this.filedsConfiguration.getFieldConfiguration();

    const designationId = this.personalSetupForm.controls.designationId.value;
    const bandId = this.personalSetupForm.controls.bandId.value;
    const regionId = this.personalSetupForm.controls.regionId.value;
    const title = this.personalSetupForm.controls.title.value;
    const departmentId = this.personalSetupForm.controls.departmentId.value;
    const submissionType = this.personalSetupForm.controls.submissionType.value;
    const isDefault = this.personalSetupForm.controls.isDefault.value;
    const isLive = this.toBoolean(this.personalSetupForm.controls.status.value);
    const cId = this.clientId;
    console.log(this.personalSetupForm.value);

    // if (isDefault == 1) isDefault = true;
    // else isDefault = false;

    const payload = {
      fieldsConfiguration,
      isLive,
      title,
      regionId,
      departmentId,
      designationId,
      bandId,
      submissionType,
      cId,
      isDefault,
    };

    console.log(
      "personal file setup create form",
      this.personalSetupFilterForm
    );
    if (payload.fieldsConfiguration.length == 0) {
      this.toastService.toast("Missing fields configuaration", "error-toast");
      return;
    }
    const response = await this.os.asPromised(
      this.pfSetup.configureCategoriesFields(payload)
    );

    if (response.status) {
      if (isDefault && this.defaultSetupIndex != -1)
        this.personalFilesDetails[this.defaultSetupIndex].setAsDefault = false;
      this.toastService.toast(
        "Personal Setup Created Successfully!",
        "success-toast"
      );
    } else this.toastService.toast(response.message, "error-toast");

    console.log(this.personalFilesDetails);

    const pageNumber = this.getCorrectPageNumber(
      this.personalFilesDetails.length,
      this.pageNumber,
      this.pageSize
    );

    this.disableInfinitScroll = false;

    console.log("pageNumber", pageNumber);

    this.getPersonalFilesDetails(
      this.appliedFilters,
      pageNumber,
      this.pageSize
    );
    this.reset()
  }

  resetFiltersArray() {
    this.regionArray = [];
    this.departmentArray = [];
    this.bandArray = [];
    this.designationArray = [];
  }

  resetFilters() {
    setTimeout(() => {
      this.pageNumber = 1;
      this.getPersonalFilesDetails({});
      this.filtersRefForm.reset();
      this.resetFiltersArray();
      Object.keys(this.personalSetupFilterForm.controls).forEach((key) => {
        if (this.personalSetupFilterForm.get(key))
          this.personalSetupFilterForm.get(key).reset();

        this.personalSetupFilterForm.get(key).setErrors(null);
      });
    }, 0);
    this.getData("/getCountry", this.clientId);
    this.disabledReset = true;
  }

  toBoolean(value) {
    if (value == "1") return true;
    if (value == "0") return false;
  }

  resetPhysicalLocationFields(field) {
    const matFormNames = {
      regionArray: "regionId",
      departmentArray: "departmentId",
      bandArray: "bandId",
      designationArray: "designationId",
    };

    const resetFields = [
      "regionArray",
      "departmentArray",
      "bandArray",
      "designationArray",
    ];
    let change = false;
    for (const key of resetFields) {
      if (matFormNames[key])
        this.resetPhysicalLocationMatSelect(matFormNames[key]);
    }
  }

  resetPhysicalLocationMatSelect(name) {
    this.validation[name].setValue(null);
    this.personalSetupForm.get(name).setErrors(null);
  }

  async editPersonalFiles(personalFilesId) {
    this.isUpdating = true;
    const personalFiles = (
      await this.os.asPromised(this.pfSetup.editPersonalFiles(personalFilesId))
    ).payload[0];
    this.regionArray = [];
    this.departmentArray = [];
    this.bandArray = [];
    this.designationArray = [];
    console.log(personalFiles);
    console.log(this.personalSetupForm);

    for (const key in personalFiles) {
      if (Array.isArray(this[key])) this[key].push(personalFiles[key]);
    }
    this.title = personalFiles.title;
    this.isDefault = personalFiles.isDefault == 1 ? true : false;
    this.submissionType = personalFiles.submissionType;
    this.updateFileSetupId = personalFiles.id;
    this.status = personalFiles.isLive == 1 ? "1" : "0";
    this.personalSetupForm.setValue({
      title: personalFiles.title,
      regionId: personalFiles.regionArray.country_id,
      departmentId: personalFiles.departmentArray.id,
      bandId: personalFiles.bandArray.id,
      designationId: personalFiles.designationArray.designation_id,
      submissionType: personalFiles.submissionType,
      status: this.status,
      isDefault: this.isDefault,
    });

    this.filedsConfiguration.reset();

    const allCategories = personalFiles.configurations;
    allCategories.forEach((category) => {
      if (category.parentCategory == "Personal File") {
        this.personalFileCategories = category.childCategories;
      }
      if (category.parentCategory == "Onboarding Documents") {
        this.onboardingCategories = category.childCategories;
      }
      if (category.parentCategory == "Office Use Documents") {
        this.officeUseDocuments = category.childCategories;
      }
    });
    this.mode = "update";
    this.isUpdating = true;
    this.changeDropdown("Country");
    this.changeDropdown("Department");
    this.changeDropdown("Band");
    this.changeDropdown("Designation");
  }

  getDataOnScroll({ regionId, departmentId, bandId, designationId }) {
    console.log("in scroll");
    if (this.disableInfinitScroll) return;
    let filters = {};
    if (regionId) filters = { regionId };
    if (departmentId) filters["departmentId"] = departmentId;
    if (bandId) filters["bandId"] = bandId;
    if (designationId) filters["designationId"] = designationId;

    this.pageNumber = this.pageNumber + 1;

    this.getPersonalFilesDetails(filters, this.pageNumber, this.pageSize);
  }
  enableSave() {
    console.log(this.isUpdating, this.personalSetupForm.valid);
    
    if (!this.isUpdating && this.personalSetupForm.valid)
      this.disabledSave = false;
  }
  reset() {
    setTimeout(() => {
      this.personalFileRefForm.reset();
      this.resetFiltersArray();
      Object.keys(this.personalSetupForm.controls).forEach((key) => {
        this.validation[key].setValue("");
        this.validation[key].markAsUntouched();
        this.validation[key].setErrors(null);
      });
      this.validation.status.setValue("1");
      this.validation.isDefault.setValue(false);

      this.validation.status.markAsUntouched();
      this.validation.isDefault.markAsUntouched();

      this.validation.status.setErrors(null);
      this.validation.isDefault.setErrors(null);

      this.initForm();
      for (const url of this.filterURLs) this.getData(`/${url}`, this.clientId);
      this.getCategories();
      this.getPersonalFilesDetails({});
    }, 0);
    this.disabledSave = true;
    this.isUpdating = false;
  }
}
