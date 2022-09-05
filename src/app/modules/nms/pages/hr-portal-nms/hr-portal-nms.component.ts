import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotificationSettingsService } from "../../services/notification-settings.service";
import { ObservableService } from "../../util/observablefn.service";

@Component({
  selector: "app-hr-portal-nms",
  templateUrl: "./hr-portal-nms.component.html",
  styleUrls: ["./hr-portal-nms.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HRPortalNMSComponent implements OnInit {
  locations = {
    company: [],
    market: [],
    cluster: [],
    subCluster: [],
    country: [],
    state: [],
    city: [],
    branch: [],
    department: [],
    designation: [],
    band: [],
  };

  isLoaded = {
    company: false,
    market: false,
    cluster: false,
    subCluster: false,
    country: false,
    state: false,
    city: false,
    branch: false,
    department: false,
    designation: false,
    band: false,
  };
  userCount: number = 0;
  clientId: number;

  disabledCluster: boolean = true;
  disabledSubCluster: boolean = true;
  disabledCountry: boolean = true;
  filters: any = {};

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private os: ObservableService,
    private nss: NotificationSettingsService
  ) {
    this.clientId = parseInt(localStorage.getItem("client_id"));
    this.form = this.fb.group({
      companyId: [null],
      marketId: [null],
      clusterId: [null],
      subClusterId: [null],
      countryId: [null],
      stateId: [null],
      cityId: [null],
      branchId: [null],
      departmentId: [null],
      designationId: [null],
      bandId: [null],
    });
  }

  ngOnInit(): void {
    this.getLocation("getClientList", "company", {});
    this.form.get("countryId").disable();
  }

  updateClientId(clientId) {
    this.clientId = clientId;
  }

  async getLocation(url, control, params) {
    const response = await this.os.asPromised(
      this.nss.getLocation(this.clientId, url, params)
    );
    if (response) this.isLoaded[control] = true;
    else this.isLoaded[control] = false;
    
    if (control == "company")
      this.locations[control] = this.transformCompany(response);
    else if (control == "state")
      this.locations[control] = this.transformState(response.data);
    else if (control == "city")
      this.locations[control] = this.transformCity(response.data);
    else if (control == "branch")
      this.locations[control] = this.transformBranch(response.data);
    else if (control == "department")
      this.locations[control] = this.transformDepartment(response.data);
    else if (control == "designation")
      this.locations[control] = this.transformDesignation(response.data);
    else if (control == "band")
      this.locations[control] = this.transformBand(response.data);
    this.getUserCount();
  }

  async getRegion(url, control, params) {
    const response = await this.os.asPromised(
      this.nss.getRegion(this.clientId, url, params)
    );
    if (response) this.isLoaded[control] = true;
    else this.isLoaded[control] = false;

    if (control == "country")
      this.locations[control] = this.transformCountry(
        response.payload[control]
      );
    else this.locations[control] = response.payload[control];
    return this.locations[control].length > 0;
  }

  async checkIfClusterExists(params) {
    
    this.getUserCount();
    const exists = await this.getRegion("getCluster", "cluster", params);
    
    if (exists) {
      this.disabledCluster = false;
      this.form.get("clusterId").enable();
      
      return;
    } else {
      this.disabledCluster = true;
      this.disabledSubCluster = true;
      this.form.get("clusterId").disable();
      this.checkIfCountryExists(params);

    }
    this.checkCountrydisabled(this.form);
    
  }

  async checkIfSubClusterExists(params) {
    this.getUserCount();

    const exists = await this.getRegion("getSubCluster", "subCluster", params);
    if (exists) {
      this.form.get("subClusterId").enable();

      // this.disabledSubCluster = false;
      return;
    } else this.form.get("subClusterId").disable();
    // this.disabledSubCluster = true;
    this.checkIfCountryExists(params);
    this.checkCountrydisabled(this.form);
  }

  async checkIfCountryExists(params) {
    const exists = await this.getRegion("getCountry", "country", params);
    this.getUserCount();
    if (exists) this.form.get("countryId").enable();
    // this.disabledCountry = false;
    else this.form.get("countryId").disable();
    // this.disabledCountry = true;
    this.checkCountrydisabled(this.form);
  }

  checkCountrydisabled(form: FormGroup) {
    const marketValue = form.get("marketId").value;
    const clusterEnabled = form.get("clusterId").enabled;
    const clusterValue = form.get("clusterId").value;
    const subClusterEnabled = form.get("subClusterId").enabled;
    const subClusterValue = form.get("subClusterId").value;

    const marketEnabled = form.get("marketId").enabled;
    // if (marketValue) {
    //   if (!clusterDisabled) {
    //     if (clusterValue && !subClusterDisabled) {
    //       form.get("country").disable();
    //       console.log('country', form.get("country"));
    //       return true;
    //     }
    //   } else if (clusterDisabled) {
    //     form.get("country").enable();
    //     return false;
    //   }
    // }
  }

  onResetDropDown(control) {
    this.resetFields(control);
    // if (control == "company") {
    //   this.disabledCluster = true;
    //   this.disabledSubCluster = true;
    //   this.disabledCountry = true;
    // } else if(control == "market") {
    //   this.disabledCluster = false;
    //   this.disabledSubCluster = true;
    //   this.disabledCountry = true;
    // } else if(control == "cluster") {
    //   this.disabledCluster = false;
    //   this.disabledSubCluster = false;
    //   this.disabledCountry = true;
    // } else if(control == "subCluster") {
    //   this.disabledCluster = false;
    //   this.disabledSubCluster = false;
    //   this.disabledCountry = false;
    // }
  }
  onResetFilters() {
    Object.keys(this.locations).map((val) => {
      this.locations[val] = [];
    });
    Object.keys(this.form.value).map((val) => {
      this.form.get(val).setValue(null);
    });

    this.getLocation("getClientList", "company", {});

    this.disabledCluster = true;
    this.disabledSubCluster = true;
    this.disabledCountry = true;
    this.getUserCount();
  }
  resetFields(field) {
    const matFormNames = {
      company: "companyId",
      market: "marketId",
      cluster: "clusterId",
      subCluster: "subClusterId",
      country: "countryId",
      state: "stateId",
      city: "cityId",
      branch: "branchId",
      department: "departmentId",
      designation: "designationId",
      band: "bandId",
    };
    const resetFields = [
      "company",
      "market",
      "cluster",
      "subCluster",
      "country",
      "state",
      "city",
      "branch",
      "department",
      "designation",
      "band",
    ];
    let change = false;
    for (const key of resetFields) {
      if (key === field) {
        change = true;
        continue;
      }
      if (change) {
        this.isLoaded[key] = false;
        this.locations[key] = [];

        if (matFormNames[key]) this.resetField(matFormNames[key]);
      }
    }
  }
  resetField(name) {
    this.form.get(name).setValue(null);
  }
  async getCityName() {
    let cityName = null;
    // this.filters = { ...this.form.value };
    // delete this.filters.companyId;
    if (this.filters.cityId) {
      cityName = await this.getCityById(this.filters.cityId);
      // delete this.filters.cityId;
    }

    return cityName;


  }
  cityName : string | null = null;
  async getUserCount() {


    let cityName = null;

    
    
    this.filters = { ...this.form.value };

    if(this.filters.cityId) {
      cityName = await this.getCityName();
    }
    if(cityName) {
      this.filters.city = cityName;
    }


    console.log('this.filters', this.filters);
    
    Object.keys(this.filters).map((val) => {
      if (!this.filters[val]) delete this.filters[val];
    });
    console.log('this.filters', this.filters);
    
    this.userCount = (
      await this.os.asPromised(
        this.nss.getUserCount(this.clientId, { filters: this.filters }, "hr")
      )
    ).payload[0].userCount;
    // this.getCityName();
  }
  transformCompany(response: Array<any>) {
    const data = [];
    response.map((val) => {
      data.push({ id: val.id, name: val.companyname });
    });
    return data;
  }
  transformCountry(response: Array<any>) {
    const data = [];
    response.map((val) => {
      data.push({ id: val.country_id, name: val.country });
    });
    return data;
  }
  transformState(response: Array<any>) {
    const data = [];
    response.map((val) => {
      data.push({ id: val.id, name: val.value });
    });
    return data;
  }
  transformCity(response: Array<any>) {
    const data = [];
    response.map((val) => {
      data.push({ id: val.id, name: val.city_name });
    });
    return data;
  }
  async getCityById(id: number) {
    const response = await this.os.asPromised(this.nss.getCityById(id));
    return response.payload.cityName;
  }
  transformBranch(response: Array<any>) {
    const data = [];
    response.map((val) => {
      data.push({ id: val.loc_id, name: val.loc_desc });
    });
    return data;
  }
  transformDepartment(response: Array<any>) {
    const data = [];
    response.map((val) => {
      data.push({ id: val.id, name: val.department_name });
    });
    return data;
  }
  transformDesignation(response: Array<any>) {
    const data = [];
    console.log(response);

    response.map((val) => {
      data.push({ id: val.designation_id, name: val.designation_name });
    });
    return data;
  }
  transformBand(response: Array<any>) {
    const data = [];
    response.map((val) => {
      data.push({ id: val.id, name: val.band_desc });
    });
    return data;
  }
}
