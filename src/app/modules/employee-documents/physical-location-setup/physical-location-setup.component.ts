import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {
  IBox,
  IBranch,
  IBuilding,
  ICabinet,
  IDrawer,
  IFlap,
  IFloor,
} from "../models/address.interface";
import { ICity, ICountry, IState } from "../models/location.interface";
import { DropDownFieldService } from "../services/dropdown-fields-service";
import { PhysicalLocationSetupService } from "../services/physical-location-setup/physical-location-setup.service";
import { ToastService } from "../services/toast.service";
import { LoaderService } from "../util/loader.service";
import { ObservableService } from "../util/observablefn.service";
import { PhysicalLocationModal } from "./physical-location-modal/physical-location-modal";

@Component({
  selector: "app-physical-location-setup",
  templateUrl: "./physical-location-setup.component.html",
  styleUrls: ["./physical-location-setup.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("openClose", [
      state("maximize", style({ display: "block" })),
      state("minimize", style({ display: "none" })),
      transition("maximize <=> minimize", [animate("100ms ease-in-out")]),
    ]),
  ],
})
export class PhysicalLocationSetupComponent implements OnInit {
  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];
  countriesFilter: Array<any> = [];
  statesFilter: Array<any> = [];
  citiesFilter: Array<any> = [];
  branches: Array<any> = [];
  buildings: Array<any> = [];
  floors: Array<any> = [];
  boxes: Array<any> = [];
  cabinets: Array<any> = [];
  drawers: Array<any> = [];
  flaps: Array<any> = [];

  stateFilterVariable: "";
  citiyFilterVaraiable: "";

  locationId: number;
  stateId: number;
  parentId: number;

  parentIds = {
    branchId: 0,
    buildingId: 0,
    floorId: 0,
    boxId: 0,
    cabinetId: 0,
  };
  clientId: number = this.os.getClientId();
  submitted: boolean = false;

  physicalLocationForm: FormGroup;
  filtersForm: FormGroup;
  filter = {};
  disabledSave: boolean = true;
  mode = "create";

  statePhysicalLocation: string = "maximize";
  statePhysicalList: string = "maximize";

  locationsList: Array<any> = [];

  lowValue: number = 0;
  highValue: number = 2;

  pageNumber: number = 1;
  pageSize: number = 4;
  appliedFilters = {};

  disableInfinitScroll: Boolean = false;

  dropDownNgModels = {
    building: "",
    floor: "",
    box: "",
    cabinet: "",
    drawer: "",
    flap: "",
  };

  isUpdating: boolean = false;

  selectedValue = "";
  updateLocationId: Number = 0;

  apiCallsCache = {};

  disabledReset: boolean = true;

  isLoaded = {
    country: false,
    state: false,
    city: false,
    branch: false,
    building: false,
    floor: false,
    box: false,
    cabinet: false,
    drawer: false,
    flap: false,
    countryFilter: false,
    stateFilter: false,
    cityFilter: false,
  };

  @ViewChild("physicalLocationRefForm") form1: FormGroupDirective;
  @ViewChild("filtersRefForm") filtersRefForm: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private plSetup: PhysicalLocationSetupService,
    private os: ObservableService,
    private dropDownService: DropDownFieldService,
    private toastService: ToastService,
    private ls: LoaderService
  ) {

    this.filtersForm = this.fb.group({
      countryId: ["", Validators.required],
      stateId: ["", Validators.required],
      cityId: ["", Validators.required],
    });

    this.physicalLocationForm = this.fb.group({
      countryId: ["", Validators.required],
      stateId: ["", Validators.required],
      cityId: ["", Validators.required],

      branchId: ["", Validators.required],
      buildingId: ["", Validators.required],
      floorId: ["", Validators.required],
      boxId: ["", Validators.required],
      cabinetId: ["", Validators.required],
      drawerId: [""],
      flapId: [""],
    });
  }



  ngOnInit() {

    this.getCountries(this.clientId);
    this.getCountries(this.clientId, {});
    this.getCountriesFilters(this.clientId);
    this.getLocationsList({});

    this.dropDownService.resetDropDown.subscribe((value) => {
      this.resetDropDownValues(value);
    });
    
    this.dropDownService.enableLocations.subscribe((data:any) =>{
      console.log('location toggled Data for enabled');
      console.log(data);

      console.log('boxId is as follows',this.physicalLocationForm.get("boxId").value);



      data.ids.forEach(id =>{
        this.locationsList.forEach(lo =>{
          if(lo[`id`] == id){
            lo.is_disabled = false;
          }
        })
      });


      // this.toggleLocationEnableOrDisable('id' , data.ids , false);
    });

    this.dropDownService.disabledLocations.subscribe((data:any) =>{
      console.log('location toggled Data for disabled');
      console.log(data);

      this.toggleLocationEnableOrDisable(data.key , data.ids , true);
    });

    this.dropDownService.dropDownApiCall.subscribe(({ key }) => {
      const functionsObject = {
        building: {
          name: "getBuildings",
          id: "branchId",
        },
        floor: {
          name: "getFloors",
          id: "buildingId",
        },
        box: {
          name: "getBoxes",
          id: "floorId",
        },
        cabinet: {
          name: "getCabinets",
          id: "boxId",
        },
        drawer: {
          name: "getDrawers",
          id: "cabinetId",
        },
        flap: {
          name: "getFlaps",
          id: "cabinetId",
        },
      };

      if (functionsObject[key]) {
        const name = functionsObject[key].name;

        const id = functionsObject[key].id;

        this[name](this.parentIds[id], false);
      }
    });
  }

  resetArrays() {
    this.countries = [];
    this.states = [];
    this.cities = [];
    this.branches = [];
    this.buildings = [];
    this.floors = [];
    this.boxes = [];
    this.cabinets = [];
    this.drawers = [];
    this.flaps = [];
  }

  resetDropDownValues(data) {
    const resetFields = [
      "countries",
      "states",
      "cities",
      "statesFilter",
      "citiesFilter",
      "branches",
      "buildings",
      "floors",
      "boxes",
      "cabinets",
      "drawers",
      "flaps",
    ];
    let deleted = false;
    for (const [key, value] of Object.entries(this.dropDownNgModels)) {
      if (key == data.name) {
        this.dropDownNgModels[data.name] = "";
        deleted = true;
        continue;
      }
      if (deleted) {
        this[`${key}s`] = [];
        this.dropDownNgModels[key] = "";
      }
    }
  }


  toggleLocationEnableOrDisable(key , ids = [] , boolean = false){



    
    console.log(this.physicalLocationForm.get(`${key}Id`).value);

    

    ids.forEach(id =>{
      this.locationsList.forEach(lo =>{
        if(lo[`${key}_id`] == id){
          lo.is_disabled = boolean;
        }

        if(this.physicalLocationForm.get(`${key}Id`).value == id){
          console.log('location cleared');
          this.cancelEditForm('');
        }
      })
    });
  }
  registerDropDown(name, value) {
    this.dropDownService.registerDropDownValue(value, name);
  }

  getDropDownList(listName, value) {
    const element = document.getElementsByClassName("options-panel")[0];

    if (element) {
      document
        .getElementsByClassName("options-panel")[0]
        .parentElement.parentElement.parentElement.setAttribute(
          "class",
          "custom-cdk-input"
        );
    }
    console.log('is Updating Value' , this.isUpdating);
    if (!this.isUpdating) return;

    console.log('came out of is Updating');
    console.log('possible issue might be' , this.apiCallsCache[listName]);
    if (this.apiCallsCache[listName]) return;

    const regionObject = {
      states: {
        name: "getStates",
        id: value,
      },
      cities: {
        name: "getCities",
        id: value,
      },
    };
    const branchObject = {
      countries: {
        name: "getCountries",
        id: this.clientId,
      },
    };
    const functionsObject = {
      branches: {
        name: "getBranches",
        id: value,
      },
      building: {
        name: "getBuildings",
        id: value,
      },
      floor: {
        name: "getFloors",
        id: value,
      },
      box: {
        name: "getBoxes",
        id: value,
      },
      cabinet: {
        name: "getCabinets",
        id: value,
      },
      drawer: {
        name: "getDrawers",
        id: value,
      },
      flap: {
        name: "getFlaps",
        id: value,
      },
    };

    if (regionObject[listName]) {
      const name = regionObject[listName].name;
      const id = regionObject[listName].id;

      if (this.mode == "update") this[name](id, null, false);
    }
    if (functionsObject[listName]) {
      const name = functionsObject[listName].name;
      const id = functionsObject[listName].id;

      if (this.mode == "update") this[name](id, false);
    }

    if (branchObject[listName]) {
      const name = branchObject[listName].name;
      const id = branchObject[listName].id;
      this[name](id);
    }
    this.apiCallsCache[listName] = 1;
  }
  resetPhysicalLocationMatSelect(name) {
    this.physicalLocationForm.get(name).setValue(null);
    this.physicalLocationForm.get(name).markAsUntouched();
  }
  resetFiltersMatSelect(name) {
    if (this.filtersForm.get(name)) {
      this.filtersForm.get(name).setValue(null);
      this.filtersForm.get(name).markAsUntouched();
    }
  }

  async getCountriesFilters(cId) {
    this.countriesFilter = (
      await this.os.asPromised(this.plSetup.getCountries(cId))
    ).data;
  }

  async getCountries(cId, filter = null) {
    if (filter != null) {
      this.isLoaded.countryFilter = false;
      this.countriesFilter = (
        await this.os.asPromised(this.plSetup.getCountries(cId))
      ).data;
      if (this.countriesFilter) this.isLoaded.countryFilter = true;
      this.getLocationsList(filter);
    } else {
      this.isLoaded.country = false;
      this.countries = (
        await this.os.asPromised(this.plSetup.getCountries(cId))
      ).data;
      if (this.countries) this.isLoaded.country = true;
      if (this.mode == "create") this.resetPhysicalLocationFields("countries");
    }
  }

  async getStates(countryId, filter = null, reset = true) {
    if (filter != null) {
      this.isLoaded.stateFilter = false;
      this.statesFilter = (
        await this.os.asPromised(
          this.plSetup.getStates(this.clientId, countryId)
        )
      ).data;
      if (this.statesFilter) this.isLoaded.stateFilter = true;
      Object.keys(this.filtersForm.controls).forEach((key) => {
        this.filtersForm.get(key).setErrors(null);
      });
      this.getLocationsList(filter);
      this.stateFilterVariable = "";
      this.citiyFilterVaraiable = "";
      if (reset) {
        this.resetFiltersMatSelect("stateId");
        this.resetFiltersFields("statesFilter");
      }
      this.disabledReset = false;
    } else {
      if (reset) {
        this.resetPhysicalLocationFields("countries");
      }
      this.isLoaded.state = false;
      this.states = (
        await this.os.asPromised(
          this.plSetup.getStates(this.clientId, countryId)
        )
      ).data;
      if (this.states) this.isLoaded.state = true;
    }
  }
  async getCities(stateId, filter = null, reset = true) {
    this.stateId = stateId;

    if (filter != null) {
      this.isLoaded.cityFilter = false;
      this.citiesFilter = (
        await this.os.asPromised(this.plSetup.getCities(this.clientId, stateId))
      ).data;
      if (this.citiesFilter) this.isLoaded.cityFilter = true;
      this.getLocationsList(filter);
      this.citiyFilterVaraiable = "";

      if (reset) {
        this.resetFiltersFields("cityId");
        this.resetFiltersMatSelect("citiesFilter");
      }
    } else {
      if (reset) {
        this.resetPhysicalLocationFields("states");
      }
      this.isLoaded.city = false;
      this.cities = (
        await this.os.asPromised(this.plSetup.getCities(this.clientId, stateId))
      ).data;
      if (this.cities) this.isLoaded.city = true;
    }
  }
  async getBranches(cityId, reset = true) {
    if (reset) {
      this.resetPhysicalLocationFields("cities");
    }
    this.isLoaded.branch = false;
    this.branches = (
      await this.os.asPromised(this.plSetup.getBranches(this.clientId, cityId))
    )[2];
    if (this.branches) this.isLoaded.branch = true;
  }

  filterDeletedData(array : Array<any>){
    const filteredArray = [];
    array.forEach(item =>{
     
      if(!item.is_disabled) {
        
        filteredArray.push(item);
      }
    })
    return filteredArray;
  }
  async getBuildings(branchId, reset = true) {
    this.parentIds.branchId = branchId;

    if (reset) {
      this.resetPhysicalLocationFields("branches");
    }
    this.isLoaded.building = false;
    this.buildings = (
      await this.os.asPromised(
        this.plSetup.getBuildings(this.clientId, this.parentIds.branchId)
      )
    ).payload;

    this.buildings = this.filterDeletedData(this.buildings);
    if (this.buildings) this.isLoaded.building = true;
  }
  async getFloors(buildingId, reset = true) {
    this.parentIds.buildingId = buildingId;

    this.parentId = buildingId;
    if (reset) {
      this.resetPhysicalLocationFields("buildings");
    }
    this.isLoaded.floor = false;
    this.floors = (
      await this.os.asPromised(
        this.plSetup.getFloors(this.clientId, this.parentIds.buildingId)
      )
    ).payload;
    this.floors = this.filterDeletedData(this.floors);
    if (this.floors) this.isLoaded.floor = true;
  }
  async getBoxes(floorId, reset = true) {
    this.parentIds.floorId = floorId;
    if (reset) {
      this.resetPhysicalLocationFields("cabinets");
    }
    this.isLoaded.box = false;
    this.boxes = (
      await this.os.asPromised(this.plSetup.getBoxes(this.clientId, floorId))
    ).payload;

    this.boxes = this.filterDeletedData(this.boxes);
    if (this.boxes) this.isLoaded.box = true;
  }
  async getCabinets(boxId, reset = true) {
    this.parentIds.boxId = boxId;

    if (reset) {
      this.resetPhysicalLocationFields("boxes");
    }
    this.isLoaded.cabinet = false;
    this.cabinets = (
      await this.os.asPromised(this.plSetup.getCabinets(this.clientId, boxId))
    ).payload;

    this.cabinets = this.filterDeletedData(this.cabinets);

    if (this.cabinets) this.isLoaded.cabinet = true;
  }
  async getDrawersAndFlaps(cabinetId, reset = true) {
    this.parentIds.cabinetId = cabinetId;
    if (reset) {
      this.resetPhysicalLocationMatSelect("drawerId");
      this.resetPhysicalLocationMatSelect("flapId");
    }
    this.isLoaded.drawer = false;
    this.drawers = (
      await this.os.asPromised(
        this.plSetup.getDrawers(this.clientId, cabinetId)
      )
    ).payload;
    this.drawers = this.filterDeletedData(this.drawers);
    if (this.drawers) this.isLoaded.drawer = true;
    this.isLoaded.flap = false;
    this.flaps = (
      await this.os.asPromised(this.plSetup.getFlaps(this.clientId, cabinetId))
    ).payload;
    this.flaps = this.filterDeletedData(this.flaps);
    if (this.flaps) this.isLoaded.flap = true;
  }

  async getDrawers(cabinetId) {
    this.parentIds.cabinetId = cabinetId;
    this.isLoaded.drawer = false;
    this.drawers = (
      await this.os.asPromised(
        this.plSetup.getDrawers(this.clientId, cabinetId)
      )
    ).payload;
    this.drawers = this.filterDeletedData(this.drawers);
    if (this.drawers) this.isLoaded.drawer = true;
  }

  async getFlaps(cabinetId) {
    this.parentIds.cabinetId = cabinetId;
    this.isLoaded.flap = false;
    this.flaps = (
      await this.os.asPromised(this.plSetup.getFlaps(this.clientId, cabinetId))
    ).payload;
    this.flaps = this.filterDeletedData(this.flaps);
    if (this.flaps) this.isLoaded.flap = true;
  }


  lastDataPageNumber : Number = 1;
  async getLocationsList(
    filter,
    pageNumber = this.pageNumber,
    pageSize = this.pageSize
  ) {
    this.appliedFilters = filter;
    const response = await this.os.asPromised(
      this.plSetup.getLocationsList(this.clientId, filter, pageNumber, pageSize)
    );
    
    if(response.payload.data.length != 0) {
      if(response.payload.page == 1) {
        this.lastDataPageNumber = response.payload.page;
      }
      else{
        if(response.payload.data.length == this.pageSize) {
          this.lastDataPageNumber = response.payload.page;
        }
        else{
          this.lastDataPageNumber = Number(response.payload.page) - 1;
        }
      }
      
    }
    if (this.locationsList.length == 0)
      this.locationsList = response.payload.data;
    else if (response.payload.page == 1 && response.payload.data.length == 0)
      this.locationsList = [];
    else if (response.payload.page == 1)
      this.locationsList = response.payload.data;
    else if (response.payload.page != 1 && response.payload.data.length == 0)
      this.disableInfinitScroll = true;
    else {
      const newHash = {};

      response.payload.data.forEach((rs) => {
        newHash[rs.id] = rs;
      });

      this.locationsList.forEach((pr, index) => {
        if (newHash[pr.id]) {
          this.locationsList[index] = newHash[pr.id];
          delete newHash[pr.id];
        }
      });

      for (const property in newHash) {
        this.locationsList.push(newHash[property]);
      }
    }
  }

  resetPhysicalLocationFields(field) {
    const matFormNames = {
      countries: "countryId",
      states: "stateId",
      cities: "cityId",
      branches: "branchId",
      buildings: "buildingId",
      floors: "floorId",
      boxes: "boxId",
      cabinets: "cabinetId",
      drawers: "drawerId",
      flaps: "flapId",
    };
    const resetFields = [
      "all",
      "countries",
      "states",
      "cities",
      "branches",
      "buildings",
      "floors",
      "boxes",
      "cabinets",
      "drawers",
      "flaps",
    ];
    let change = false;
    for (let key of resetFields) {
      if (key === field) {
        change = true;

        continue;
      }

      if (change) {
        this[key] = [];
        if (matFormNames[key])
          this.resetPhysicalLocationMatSelect(matFormNames[key]);
      }
    }
  }

  resetFiltersFields(field) {
    const matFormNames = {
      countriesFilter: "countryId",
      statesFilter: "stateId",
      citiesFilter: "cityId",
    };
    const resetFields = [
      "all",
      "countriesFilter",
      "statesFilter",
      "citiesFilter",
    ];
    let change = false;
    for (const key of resetFields) {
      if (key === field) {
        change = true;

        continue;
      }
      if (change) {
        this[key] = [];
        if (matFormNames[key]) this.resetFiltersMatSelect(matFormNames[key]);
      }
    }
  }

  get validationForm() {
    return this.physicalLocationForm.controls;
  }

  get validationFilters() {
    return this.filtersForm.controls;
  }

  minMaxPhysicalLocation() {
    this.statePhysicalLocation =
      this.statePhysicalLocation == "maximize" ? "minimize" : "maximize";
  }

  minMaxPhysicalList() {
    this.statePhysicalList =
      this.statePhysicalList == "maximize" ? "minimize" : "maximize";
  }

  cancelEditForm(formData) {
    setTimeout(() => {
      this.resetPhysicalLocationFields("all");
      this.isUpdating = false;
      this.mode = "create";
      this.countries = [];
      this.apiCallsCache = {};
      this.getCountries(this.clientId);
    }, 0);
  }

  getCorrectPageNumber(documentLength, currentPage, pageSize) {


    this.disableInfinitScroll = false;
    // if(currentPage == 1) return currentPage;
    // else return currentPage - 1;

    return this.lastDataPageNumber;
    
    const currentSize = currentPage * pageSize;
    
    

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

  updatingIndex: number = 0;
  getPageNumberByIndex(index, pageSize, initialPage) {
    if (index == 1 || index == 0) return 1;
    const result = pageSize * initialPage;
    if (result >= index) return initialPage;
    else return this.getPageNumberByIndex(index, pageSize, initialPage + 1);
  }

  async addRecord(formData, filters) {
    let response;

    if (this.isUpdating) {
      Object.keys(formData.value).forEach((key) => {
        if (formData.value[key] == "") delete formData.value[key];
      });
      this.submitted = true;

      formData.value["id"] = this.updateLocationId;

      this.ls.showLoader("");
      response = await this.os.asPromised(
        this.plSetup.updateAddress(formData.value)
      );
      if (response) this.ls.hideLoader();
      this.getCountries(this.clientId);
    } else {
      formData.value.cId = this.clientId;
      Object.keys(formData.value).forEach((key) => {
        if (formData.value[key] == "") delete formData.value[key];
      });

      this.submitted = true;
      this.ls.showLoader("");
      response = await this.os.asPromised(
        this.plSetup.addAddress(formData.value)
      );
      if (response) this.ls.hideLoader();
    }

    if (response.status) {
      if (this.isUpdating) {
        this.toastService.toast(
          "Physical location updated successfully!",
          "success-toast"
        );
      } else {
        this.toastService.toast(
          "Physical location created successfully!",
          "success-toast"
        );
      }
    } else this.toastService.toast(response.message, "error-toast");

    Object.keys(filters).forEach((key) => {
      if (filters[key] == null || filters[key] == "") delete filters[key];
    });

    this.disableInfinitScroll = false;
    this.pageNumber = this.getCorrectPageNumber(
      this.locationsList.length,
      this.pageNumber,
      this.pageSize
    );

    if (this.isUpdating) {
      const page = this.getPageNumberByIndex(
        this.updatingIndex + 1,
        this.pageSize,
        1
      );
      this.getLocationsList(filters, page);
    } else {
      // this.getLocationsList(filters, pageNumber);
    }

    this.isUpdating = false;
    this.apiCallsCache = {};
    this.disableInfinitScroll = false;
    setTimeout(() => {
      this.resetPhysicalLocationFields("all");
      this.getCountries(this.clientId);
      this.submitted = false;
    }, 0);
    if (!this.isUpdating) {
      this.disabledSave = true;
    }
  }

  resetFilters() {
    setTimeout(() => {
      (this.pageNumber = 1),
        (this.disableInfinitScroll = false),
        this.resetFiltersFields("all");
      this.getLocationsList({});
      this.getCountriesFilters(this.clientId);
    }, 0);
    this.disabledReset = true;
  }

  getDataOnScroll({ countryId, stateId, cityId }) {
    console.log('invoking');
    console.log(this.disableInfinitScroll);
    if (this.disableInfinitScroll) return;
    console.log('worked here',this.disableInfinitScroll);
    let filters = {};
    if (countryId) filters = { countryId };
    if (stateId) filters["stateId"] = stateId;
    if (cityId) filters["cityId"] = cityId;

    this.pageNumber++;
    this.getLocationsList(filters, this.pageNumber, this.pageSize);
  }

  async editLocation(locationId, index) {
    this.isUpdating = true;
    this.mode = "update";
    this.ls.showLoader("");
    const locationData = (
      await this.os.asPromised(this.plSetup.editLocation(locationId))
    ).payload[0];
    if (locationData) this.ls.hideLoader();
    this.resetArrays();
    for (const key in locationData) {
      if (key == "id") continue;
      this[key].push(locationData[key]);
    }

    this.physicalLocationForm.setValue({
      countryId: locationData.countries.country_id,
      stateId: locationData.states.id,
      cityId: locationData.cities.id,
      branchId: locationData.branches.loc_id,
      buildingId: locationData.buildings.id,
      floorId: locationData.floors.id,
      boxId: locationData.boxes.id,
      cabinetId: locationData.cabinets.id,
      drawerId: locationData.drawers.id ? locationData.drawers.id : "",
      flapId: locationData.flaps.id ? locationData.flaps.id : "",
    });

    this.updateLocationId = locationData.id;
    this.updatingIndex = index;
    this.registerDropDown("building", locationData.buildings.id);
    this.registerDropDown("floor", locationData.floors.id);
    this.registerDropDown("box", locationData.boxes.id);
    this.registerDropDown("cabinet", locationData.cabinets.id);

    this.registerDropDown(
      "drawer",
      locationData.drawers.id ? locationData.drawers.id : ""
    );

    this.registerDropDown(
      "flap",
      locationData.flaps.id ? locationData.flaps.id : ""
    );
    this.mode = "update";
  }

  openDialog(data, modalData, disabled): void {
    const fieldName = modalData.idName.slice(0, -2);
    const parentId = this.validationForm[modalData.parentId].value;

    if (!disabled) {
      if (this.mode == "update") this.getDropDownList(fieldName, parentId);
      let parentIdOf = this.parentIds[modalData.parentId];
      const dialogRef = this.dialog.open(PhysicalLocationModal, {
        width: "360px",
        panelClass: "module-style",
        data: { control: data, modalData, parentId: parentIdOf },
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

  errorMatSelect(control, name) {
    if (
      (control.status == "INVALID" || this.submitted) &&
      control.errors?.required
    ) {
      document
        .querySelector(`mat-select[formcontrolname=${name}]`)
        .parentElement.classList.add("errors");
    }
    if (control.touched) {
      document
        .querySelector(`mat-select[formcontrolname=${name}]`)
        .parentElement.classList.remove("errors");
    }
  }

  enableSave() {
    if (!this.isUpdating && this.physicalLocationForm.valid)
      this.disabledSave = false;
  }
}
