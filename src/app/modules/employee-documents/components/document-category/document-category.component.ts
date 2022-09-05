import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfigureCategoryFieldsService } from "../../services/configure-category-fields.service";
import { ToastService } from "../../services/toast.service";
import { FileUploadService } from "../../services/file-upload/file-upload.service";
import { PersonalFileSetupService } from "../../services/personal-file-setup/personal-file-setup.service";
import { ObservableService } from "../../util/observablefn.service";
import "rxjs/Rx";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CategoryFieldModal } from "./category-field-modal/category-field-modal";
import { ConfirmDialogRemove } from "./confirm-dialog-remove/confirm-dialog-remove.modal";

@Component({
  selector: "app-document-category",
  templateUrl: "./document-category.component.html",
  styleUrls: ["./document-category.component.scss"],
})
export class DocumentCategoryComponent implements OnInit {
  @Input() category;
  @Input() updating;

  personalSetupForm: FormGroup;
  submitted: boolean = false;
  f_submitted: boolean = false;

  fieldsConfigurationCount: number = 0;
  isNewCategory: boolean = false;
  forReviewFields: boolean = false;
  isMandatoryFields: boolean = false;
  templateUrlFields: boolean = false;
  hideAllFields: boolean = false;
  fields: any;
  name;
  clientId = this.os.getClientId();
  filter = {};
  newFieldIndex = 0;

  categoryFields = [];
  dropDownCategoryFields = [];
  categoryFieldsHash = {};

  constructor(
    private fb: FormBuilder,
    private os: ObservableService,
    private pfSetup: PersonalFileSetupService,
    private fieldConfigurationService: ConfigureCategoryFieldsService,
    private fileUploadService: FileUploadService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fields = this.category.fields;
    console.log(this.category);

    if (this.category.parentCategory == "Personal File") {
      this.isMandatoryFields = true;
    }
    if (this.category.parentCategory == "Onboarding Documents") {
      if (this.category.name == "Recrutment Pack Documents") {
        this.templateUrlFields = true;
      } else {
        this.forReviewFields = true;
      }
    }
    if (this.category.parentCategory == "Office Use Documents") {
      this.hideAllFields = true;
    }

    if (!this.fields) this.fields = [];
    this.personalSetupForm = this.fb.group({
      fieldsConfiguration: this.fb.array(
        this.fields.map((field) => this.createCategoryField(field))
      ),
    });

    this.fields.forEach((field) => {
      this.categoryFieldsHash[field.name] = field;
    });
    this.pfSetup.subscribe(this.removeCategory, this, this.category.id);
    this.getCategoryFields();
  }

  get fieldsConfiguration() {
    return this.personalSetupForm.controls["fieldsConfiguration"] as FormArray;
  }

  async getCategoryFields() {
    const result = await this.pfSetup.getCategoryFields({
      cId: this.clientId,
      categoryId: this.category.id,
    });

    this.categoryFields = result.data;

    console.log("in category field hash");

    console.log(this.categoryFieldsHash);

    const filteredArray = [];
    result.data.forEach((field) => {
      if (!this.categoryFieldsHash[field.name]) {
        filteredArray.push(field);
      }
    });

    this.dropDownCategoryFields = filteredArray;

    console.log(this.dropDownCategoryFields);
  }

  toBoolean(value) {
    if (value) return true;
    return false;
  }
  getConfigurationKeyAndValue(field) {
    const response = { fieldName: "", value: null };
    let fieldName = "";

    if (this.isMandatoryFields) {
      response.fieldName = "isMandatory";
      response.value = this.toBoolean(field.isMandatory) || false;
    }
    if (this.forReviewFields) {
      response.fieldName = "forReview";
      if (!field.forReview || field.forSubmission) {
        response.value = false;
      }
      if (field.forReview)
        response.value = this.toBoolean(field.forReview) || false;
      if (field.forSubmission)
        response.value = this.toBoolean(field.forSubmission) || false;
    }

    if (this.templateUrlFields) {
      response.fieldName = "templateUrl";
      response.value = field.templateUrl || null;
    }
    if (this.hideAllFields) {
      response.fieldName = "isMandatory";
      response.value = false;
    }

    return response;
  }
  createCategoryField(field): FormGroup {
    if (!this.updating) {
      this.fieldConfigurationService.configureCategoryField(
        field.id,
        field.categoryFieldId,
        this.getConfigurationKeyAndValue(field).fieldName,
        this.getConfigurationKeyAndValue(field).value,
        this.category.id
      );
    }

    return this.fb.group({
      id: [field.id],
      catField: [field.name, Validators.required],
      isMandatory: [field.isMandatory],
      forReview: [field.forReview],
      forSubmission: [field.forSubmission],
      templateUrl: [field.templateUrl],
      categoryFieldId: [field.categoryFieldId],
      categoryId: [field.categoryId],
    });
  }
  
  categoryFieldExists(fieldName): Boolean {
    let exists = false;

    const length = this.fieldsConfiguration.length - 1;

    this.fieldsConfiguration.controls.every((field, index) => {
      if (fieldName == field["controls"].catField.value && index != length) {
        exists = true;
        return false;
      }
      return true;
    });

    // return exists;

    // this.fields.every((field) => {
    //   if (fieldName == field.name) {
    //     exists = true;
    //     return false;
    //   }
    //   return true;
    // });
    return exists;
  }
  dropDownClosed() {
    console.log("closed");
  }
  addNewCategoryFromDropDown(selectedField) {
    console.log(selectedField.triggerValue);

    const fieldsConfigurationForm: FormGroup = this.fb.group({
      id: [null],
      catField: [selectedField.triggerValue, Validators.required],
      isMandatory: [false],
      forReview: [false],
      forSubmission: [false],
      templateUrl: [null],
      categoryFieldId: [selectedField.value],
    });
    this.fieldsConfiguration.push(fieldsConfigurationForm);

    this.categoryFieldsHash[selectedField.triggerValue] = true;

    console.log(selectedField.triggerValue);
    console.log(selectedField.value);

    this.fieldConfigurationService.addNewConfiguration(
      selectedField.value,
      this.getConfigurationKeyAndValue({}).fieldName,
      this.getConfigurationKeyAndValue({}).value,
      this.category.id
    );
  }

  addNewCategoryField() {
    return new Promise(async (resolve, reject) => {
      const fieldsConfigurationForm: FormGroup = this.fb.group({
        id: [null],
        catField: ["", Validators.required],
        isMandatory: [false],
        forReview: [false],
        forSubmission: [false],
        templateUrl: [null],
      });

      if (!this.isNewCategory) {
        this.fieldsConfiguration.push(fieldsConfigurationForm);
        this.newFieldIndex = this.fieldsConfiguration.controls.length - 1;
        resolve("");
      } else {
        this.name =
          this.fieldsConfiguration.controls[
            this.fieldsConfiguration.controls.length - 1
          ]["controls"].catField.value;

        if (this.name == "") {
          this.toastService.toast("Category Field is required!", "error-toast");
          //Toaster Goes here

          return;
        }

        const exists = this.categoryFieldExists(this.name);

        if (exists) {
          this.toastService.toast("Already exists!", "error-toast");
          //Show Toaster Here
          return;
        }
        const data = this.os
          .asPromised(
            this.pfSetup.createDocumentCategory(
              this.clientId,
              this.category.id,
              this.name
            )
          )
          .then((response) => {
            const id = response["payload"][0].id;
            this.fieldsConfiguration.controls[
              this.fieldsConfiguration.controls.length - 1
            ]["controls"].id.patchValue(id);

            if (response.status)
              this.toastService.toast(
                "New Category Field Added!",
                "success-toast"
              );
            else this.toastService.toast(response.message, "error-toast");
          });
      }
      this.isNewCategory = !this.isNewCategory;
      resolve("");
    });
  }

  // get validation() {
  //   return this.personalSetupForm.controls.fieldsConfiguration['controls'];
  // }

  inputChanged(field, fieldName) {
    console.log(field);

    const fieldId = field.categoryFieldId.value;
    let keyValue = field[fieldName].value;

    console.log(fieldId, keyValue);
    this.fieldConfigurationService.configureCategoryField(
      field.id.value,
      fieldId,
      fieldName,
      keyValue,
      this.category.id,
      this.updating
    );
  }

  async upload(event, field, index) {
    let file;

    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];

      const fileType = this.fileUploadService.getFileTypes().docx;

      console.log(fileType);

      const result = await this.fileUploadService.uploadFile(file, fileType);

      if (!result["success"]) {
        this.toastService.toast(result["error"], "error-toast");
        return;
      }

      const url = result["data"].url;
      this.fieldsConfiguration.controls[index][
        "controls"
      ].templateUrl.patchValue(url);

      this.inputChanged(field, "templateUrl");
      this.toastService.toast("File Uploaded Successfully!", "success-toast");
    }
    return;
  }

  downloadFile(data: any, fileName: String = "") {
    // let downloadUrl = data.split(" ");
    // downloadUrl = downloadUrl.join("%");

    // const fileType = this.fileUploadService.getFileTypes().doc;
    // const blob = new Blob([data],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    // const url= window.URL.createObjectURL(blob);
    // window.open(url);

    // window.open(downloadUrl, "_blank");

    this.fileUploadService.downloadFile(data).subscribe(
      (response) => {
        const blob = new Blob([response]);
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${fileName}.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // window.open(response);
      },
      (error) => {}
    );
  }

  removeCategory(id, categoryId, that) {
    console.log(that.category.id);

    if (that.category.id != categoryId) return;

    let field = that.fieldsConfiguration.at(id).value;

    delete that.categoryFieldsHash[field.catField];

    console.log(field);

    that.fieldConfigurationService.deleteConfiguration(
      field.id,
      field.categoryFieldId
    );

    that.toastService.toast(
      "Category Field deleted successfully!",
      "success-toast"
    );
    that.fieldsConfiguration.removeAt(id);

    // if (field.id != null) {
    //   const result = await this.os.asPromised(
    //     this.pfSetup.deleteCategoryField(field.id)
    //   );
    //   if (result.status) {
    //     this.toastService.toast(
    //       "Category Field deleted successfully!",
    //       "success-toast"
    //     );
    //     this.fieldsConfiguration.removeAt(id);
    //   }
    // } else {
    //   this.toastService.toast(
    //     "Category Field deleted successfully!",
    //     "success-toast"
    //   );
    //   this.fieldsConfiguration.removeAt(id);
    // }

    if (id == that.newFieldIndex) {
      that.isNewCategory = false;
    } else {
      that.newFieldIndex = that.fieldsConfiguration.controls.length - 1;
    }
  }

  openConfirmDialog(id, catField, categoryId): void {
    const dialogRef = this.dialog.open(ConfirmDialogRemove, {
      width: "350px",
      panelClass: "module-style",
      data: { id, catField, categoryId },
    });
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(CategoryFieldModal, {
      width: "400px",
      panelClass: "module-style",
      data: { categoryId: this.category.id, clientId: this.clientId },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
