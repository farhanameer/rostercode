import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatMenuTrigger } from "@angular/material/menu";
import moment from "moment";
import { dateFormat } from "../../nms/util/date-format.enum";
import { CategoryModel } from "../models/category";
import { MainCategoryModel } from "../models/main-category";
import { UserDocumentModel } from "../models/user-document";
import { DocumentReportService } from "../services/document-report/document-report.service";
import { ToastService } from "../services/toast.service";
import { ObservableService } from "../util/observablefn.service";

@Component({
  selector: "app-document-report",
  templateUrl: "./document-report.component.html",
  styleUrls: ["./document-report.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentReportComponent implements OnInit {
  filter = {};
  disableInfinitScroll: Boolean = false;
  locations = {
    market: [],
    cluster: [],
    subCluster: [],
    country: [],
    state: [],
    city: [],
    branch: [],
    department: [],
    employeeType: [],
  };

  disabledCluster: boolean = true;
  disabledSubCluster: boolean = true;
  disabledCountry: boolean = true;

  totalRecords: number = 0;

  savedMainCategories: Array<MainCategoryModel> = [];
  savedSubCategories: CategoryModel = <CategoryModel>{};

  mainCategories: Array<MainCategoryModel> = [];
  subCategories: CategoryModel = <CategoryModel>{};

  userDocuments: Array<UserDocumentModel> = [];

  clientId: number;

  documentReportForm: FormGroup;
  pageNumber: number = 1;
  pageSize: number = 20;

  isReport: boolean = false;
  isLoaded: boolean = false;
  isSearched: boolean = false;
  isFilterLoaded = {
    market: false,
    cluster: false,
    subCluster: false,
    country: false,
    state: false,
    city: false,
    branch: false,
    department: false,
    employeeType: false,
  };

  @ViewChild(MatMenuTrigger, {static: false}) menu: MatMenuTrigger;

  constructor(
    private os: ObservableService,
    private documentReportService: DocumentReportService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.clientId = parseInt(localStorage.getItem('client_id'));
  }

  ngOnInit(): void {
    this.documentReportForm = this.fb.group({
      dateFrom: [""],
      dateTo: [""],
      marketId: [""],
      clusterId: [""],
      subClusterId: [""],
      countryId: [""],
      stateId: [""],
      city: [""],
      branchId: [""],
      departmentId: [""],
      employeeTypeId: [""],
    });

    this.getRegionForReport("getMarket", "market", {});
    this.getReportData({});
  }
  closeMenu(event) {
    console.log(this.documentReportForm);
    
    event.preventDefault();
    this.menu.closeMenu();
  }
  async downloadReport(filters) {
    try {
      for (const filter in filters)
        if (!filters[filter] || filters[filter] == "") delete filters[filter];

      if (filters["startDate"])
        filters["startDate"] = moment(filters["startDate"]).format(
          dateFormat
        );
      if (filters["endDate"])
        filters["endDate"] = moment(filters["endDate"]).format(dateFormat);

      this.documentReportService
        .downloadReport("getReport", filters, this.clientId)
        .subscribe(
          (response) => {
            const blob = new Blob([response]);
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `report.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          },
          (error) => {
            console.log(error);
          }
        );

      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  }

  async getLocationForReport(url, control, params) {
    this.isFilterLoaded[control] = false;
    const response = await this.os.asPromised(
      this.documentReportService.getLocationForReport(
        this.clientId,
        url,
        params
      )
    );
    if (response) this.isFilterLoaded[control] = true;
    this.locations[control] = response.data;
    this.disableInfinitScroll = false;
  }

  async getRegionForReport(url, control, params) {
    this.isFilterLoaded[control] = false;
    const response = await this.os.asPromised(
      this.documentReportService.getRegionForReport(this.clientId, url, params)
    );
    if (response) this.isFilterLoaded[control] = true;
    console.log(control, this.isFilterLoaded[control]);
    this.locations[control] = response.payload[control];
    this.disableInfinitScroll = false;
    console.log(this.isFilterLoaded);

    return this.locations[control].length > 0;
  }

  async checkIfClusterExists(params) {
    const exists = await this.getRegionForReport(
      "getCluster",
      "cluster",
      params
    );
    if (exists) {
      this.disabledCluster = false;
      return;
    } else this.disabledCluster = true;
    this.checkIfSubClusterExists(params);
  }

  async checkIfSubClusterExists(params) {
    const exists = await this.getRegionForReport(
      "getSubCluster",
      "subCluster",
      params
    );
    if (exists) {
      this.disabledSubCluster = false;
      return;
    } else this.disabledSubCluster = true;
    this.checkIfCountryExists(params);
  }

  async checkIfCountryExists(params) {
    const exists = await this.getRegionForReport(
      "getCountry",
      "country",
      params
    );
    if (exists) {
      this.disabledCountry = false;
      return;
    } else this.disabledCountry = true;
  }

  resetDropDown(control) {
    this.resetReportFields(control);
  }

  async getReportData(
    filters,
    pageSize = this.pageSize,
    pageNumber = this.pageNumber
  ) {
    let userDocuments: Array<UserDocumentModel> = [];
    try {
      for (const filter in filters) {
        if (!filters[filter] || filters[filter] == "") delete filters[filter];
      }

      if (filters["startDate"])
        filters["startDate"] = moment(filters["startDate"]).format(
          dateFormat
        );
      if (filters["endDate"])
        filters["endDate"] = moment(filters["endDate"]).format(dateFormat);
      

      
      const response = await this.os.asPromised(
        this.documentReportService.getReportData(
          "getReport",
          pageSize,
          pageNumber,
          filters,
          this.clientId
        )
      );
      userDocuments = response.payload.report.userDocuments;

      this.totalRecords = response.payload.totalRecords || 0;

      if (!userDocuments) {
        this.isLoaded = true;
        this.disableInfinitScroll = true;
        if (response.payload.pageNumber == 1) {
          this.isReport = false;
          this.userDocuments = [];
          this.toastService.toast("No report was found", "error-toast");
        } else {
          this.isReport = true;
        }
        return;
      } else {
        this.isReport = true;
        userDocuments.map((val) => {
          val.documents = val.documents.sort((a, b) => a.parentId - b.parentId);
          val.documents.map((val) => {
            val.sub = val.sub.sort((a, b) => a.id - b.id);
          });
        });

        if (Object.keys(response.payload.report).length == 0) {
          this.isLoaded = true;
          if (response.payload.pageNumber == 1) {
            this.userDocuments = [];
            this.toastService.toast("No report was found", "error-toast");
          }
          return;
        }

        this.manageHeadersDataChange(response.payload);
        if (this.userDocuments.length == 0) this.userDocuments = userDocuments;
        else if (response.payload.pageNumber == 1 && !userDocuments)
          this.userDocuments = [];
        else if (response.payload.pageNumber == 1)
          this.userDocuments = userDocuments;
        else if (response.payload.pageNumber > 1 && !userDocuments) {
          this.disableInfinitScroll = true;
        } else {
          this.userDocuments = this.userDocuments.concat(
            this.manageCellDataChange(userDocuments)
          );
        }
        this.isLoaded = true;
        // if (this.isSearched) this.resetFilters();
      }
    } catch (error) {
      console.log(error);
      this.isReport = false;
      this.userDocuments = [];
    }
  }

  manageHeadersDataChange(response) {
    if (response.pageNumber == 1) {
      if (response.report.mainCategories) {
        let mainCategories: Array<MainCategoryModel> = [];
        let isFound = false;

        (<CategoryModel>response.report.subCategories).sub.forEach((subCat) => {
          (<Array<MainCategoryModel>>response.report.mainCategories).every(
            (cat) => {
              if (subCat.parentId == cat.id) {
                isFound = true;
                cat.countColumn = subCat.sub.length;
                mainCategories.push(cat);
                return false;
              }
              return true;
            }
          );
        });
        mainCategories = mainCategories.sort((a, b) => a.id - b.id);
        this.savedMainCategories = [...mainCategories];
      }

      if (response.report.subCategories) {
        this.savedSubCategories.sub = [];
        this.savedSubCategories = response.report.subCategories;
        this.savedSubCategories.sub = this.savedSubCategories.sub.sort(
          (a, b) => a.parentId - b.parentId
        );
        this.savedSubCategories.sub.map((cat) => {
          cat.sub = cat.sub.sort((a, b) => a.id - b.id);
        });
        this.savedMainCategories.unshift({ id: 0, name: "", countColumn: 3 });
      }
    }
  }

  manageCellDataChange(userDocuments: Array<UserDocumentModel>) {
    const uDocuments: Array<UserDocumentModel> = userDocuments;
    userDocuments.map((uDocs, udIndex) => {
      this.savedSubCategories.sub.map((cat, catIndex) => {
        const isNotMainCat: boolean = uDocs.documents.every(
          (missingMainDocs, missingMainDocIndex) => {
            if (cat.parentId != missingMainDocs.parentId) return true;
            return false;
          }
        );
        if (isNotMainCat) {
          uDocs.documents.splice(catIndex, 0, {
            parentId: cat.parentId,
            sub: [...cat.sub],
          });
        }
        uDocs.documents.map((uDoc, uIndex) => {
          if (cat.parentId == uDoc.parentId) {
            cat.sub.map((subCat, subCatIndex) => {
              let isNotSubCat: boolean = uDoc.sub.every(
                (missingDocs, missingDocIndex) => {
                  if (subCat.id != missingDocs.id) return true;
                  return false;
                }
              );

              if (isNotSubCat) {
                uDoc.sub.splice(catIndex, 0, { id: subCat.id, value: "epmty" });
                uDoc.sub = uDoc.sub.sort((a, b) => a.id - b.id);
                console.log("uDocs", uDocs);
              }
            });
          }
        });
      });
    });
    console.log(uDocuments);

    return uDocuments;
  }

  getCellData(value) {
    if (value == "empty") return "";
    if (value == true) return "✔";
    if (value == false) return "×";
  }

  getDynamicHeight() {
    return `${50 * this.pageSize - 30}px`;
  }

  getDataOnScroll(filters) {
    if (this.disableInfinitScroll) return;
    
    this.pageNumber = this.pageNumber + 1;
    this.getReportData(filters, this.pageSize, this.pageNumber);
  }

  arrayDifference(leftValue, rightValue) {
    const isSameUser = (a, b) => a.id == b.id;
    const onlyInLeft = (left, right, compareFunction) => {
      return left.filter(
        (leftValue) =>
          !right.some((rightValue) => compareFunction(leftValue, rightValue))
      );
    };

    const onlyInA = onlyInLeft(leftValue, rightValue, isSameUser);
    const result = [...rightValue, ...onlyInA];
    console.log("array difference", result);
    return result;
  }

  resetReportFields(field) {
    const matFormNames = {
      market: "marketId",
      cluster: "clusterId",
      subCluster: "subClusterId",
      country: "countryId",
      state: "stateId",
      city: "city",
      branch: "branchId",
      department: "departmentId",
      employeeType: "employeeTypeId",
    };
    const resetFields = [
      "all",
      "market",
      "cluster",
      "subCluster",
      "country",
      "state",
      "city",
      "branch",
      "department",
      "employeeType",
    ];
    let change = false;
    for (let key of resetFields) {
      if (key === field) {
        change = true;

        continue;
      }
      if (change) {
        this.locations[key] = [];
        this.isFilterLoaded[key] = false;
        if (matFormNames[key]) this.resetReportMatSelect(matFormNames[key]);
      }
    }
  }

  resetReportMatSelect(name) {
    if (this.documentReportForm.get(name)) {
      this.documentReportForm.get(name).setValue(null);
      this.documentReportForm.get(name).setErrors(null);
    }
  }

  reset() {
    this.getReportData({});
    this.resetFilters();
  }

  resetFilters() {
    this.resetReportFields("all");
    this.documentReportForm.controls.dateFrom.setValue(null);
    this.documentReportForm.controls.dateFrom.setErrors(null);
    this.documentReportForm.controls.dateTo.setValue(null);
    this.documentReportForm.controls.dateTo.setErrors(null);
    this.disabledCluster = true;
    this.disabledSubCluster = true;
    this.disabledCountry = true;
    this.pageNumber = 1;
    this.getRegionForReport("getMarket", "market", {});
    this.isSearched = false;
  }
}
