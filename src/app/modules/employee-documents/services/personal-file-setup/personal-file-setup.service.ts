import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { APIs } from "src/environments/environment";
import { ObservableService } from "../../util/observablefn.service";

@Injectable({
  providedIn: "root",
})
export class PersonalFileSetupService {
  orgChartUrl: string = "";
  locationUrl: string = "";
  staticDataUrl: string = "";
  documentCategories: string = "";

  headers: HttpHeaders = new HttpHeaders();

  triggerCategoryField: any = {};
  cbContext: any = {};

  categoryFieldsCache = {};

  categoryFields = new Subject();

  documentsCb : any= {};



  constructor(private http: HttpClient, private os: ObservableService) {
    this.documentCategories = APIs['documentCategories'];
    this.locationUrl = APIs['document'];
    this.staticDataUrl = APIs['staticData'];
    this.orgChartUrl = APIs['orgChart'];
    this.headers = this.os.headers();
  }


  subscribeDocumentCB(callBack , context){
    this.documentsCb = {
      context : context,
      cb : callBack
    }
  }
  triggerDocumentRemove(values){
    this.documentsCb.cb(values , this.documentsCb.context);
  }
  getLocation(url, cId): Observable<any> {
    const params = { client_id: cId };
    return this.http.get(`${this.staticDataUrl}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  getStates(cId, countryId): Observable<any> {
    const params = { client_id: cId, country_id: countryId };
    return this.http.get(`${this.staticDataUrl}/getStatesByCountry`, {
      headers: this.headers,
      params,
    });
  }

  getCities(cId, stateId): Observable<any> {
    const params = { client_id: cId, state_id: stateId };
    return this.http.get(`${this.staticDataUrl}/getCityByState`, {
      headers: this.headers,
      params,
    });
  }

  getBranches(cId, cityId): Observable<any> {
    let body = { cityId };
    return this.http.post(`${this.orgChartUrl}/cities_branches`, body, {
      headers: this.headers,
    });
  }

  getBuildings(cId, branchId): Observable<any> {
    const params = { client_id: cId, branchId };
    return this.http.get(`${this.locationUrl}/building`, {
      headers: this.headers,
      params,
    });
  }
  getFloors(cId, buildingId): Observable<any> {
    const params = { client_id: cId, buildingId };
    return this.http.get(`${this.locationUrl}/floor`, {
      headers: this.headers,
      params,
    });
  }
  getBoxes(cId, floorId): Observable<any> {
    const params = { client_id: cId, floorId };
    return this.http.get(`${this.locationUrl}/box`, {
      headers: this.headers,
      params,
    });
  }
  getCabinets(cId, boxId): Observable<any> {
    const params = { client_id: cId, boxId };
    return this.http.get(`${this.locationUrl}/cabinet`, {
      headers: this.headers,
      params,
    });
  }
  getDrawers(cId, cabinetId): Observable<any> {
    const params = { client_id: cId, cabinetId };
    return this.http.get(`${this.locationUrl}/drawer`, {
      headers: this.headers,
      params,
    });
  }
  getFlaps(cId, cabinetId): Observable<any> {
    const params = { client_id: cId, cabinetId };
    return this.http.get(`${this.locationUrl}/flap`, {
      headers: this.headers,
      params,
    });
  }

  createLocation(url, formData): Observable<any> {
    return this.http.post(`${this.locationUrl}/${url}`, formData, {
      headers: this.headers,
    });
  }

  deletePhysicalLocation(url, ids: any): Observable<any> {
    const body = ids;
    return this.http.request("delete", `${this.locationUrl}/${url}`, {
      headers: this.headers,
      body,
    });
  }

  getCategories(cId) {

    


    let body = { cId };
    return this.http.post(
      `${this.documentCategories}/getDocumentCatFields`,
      body,
      {
        headers: this.headers,
      }
    );
  }
  createDocumentCategory(cId, fieldId, name) {
    let body = { cId, name };
    return this.http.post(
      `${this.documentCategories}/${fieldId}/fields`,
      body,
      {
        headers: this.headers,
      }
    );
  }
  getStaticData(url, cId) {
    const params = {
      client_id: cId,
    };
    return this.http.get(`${this.staticDataUrl}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  getPersonalFilesDetails(clientId, filters, pageNumber, pageSize) {
    const body = {
      clientId,
      filters,
      pageNumber,
      pageSize,
    };

    return this.http.post(
      `${this.documentCategories}/getPersonalFileSetup`,
      body,
      { headers: this.headers }
    );
  }
  deleteCategoryField(id) {
    return this.http.delete(
      `${this.documentCategories}/deleteCategoryField/${id}`
    );
  }

  configureCategoriesFields(body) {
    return this.http.post(
      `${this.documentCategories}/configureCategoryField`,
      body,
      { headers: this.headers }
    );
  }

  updateCategoriesFieldsConfigurations(body) {
    return this.http.post(
      `${this.documentCategories}/updateCategoryFieldsConfiguration`,
      body,
      { headers: this.headers }
    );
  }

  addDocumentCategoriesBulk(categoryId, body) {
    return this.http.post(
      `${this.documentCategories}/${categoryId}/addFields`,
      body,
      { headers: this.headers }
    );
  }

  editPersonalFiles(personalFilesId): Observable<any> {
    return this.http.get(
      `${this.documentCategories}/personalFileSetupDetails/${personalFilesId}`,
      {
        headers: this.headers,
      }
    );
  }

  changeStatus(cId, status, fileId) {
    const body = { cId, status, fileId };
    return this.http.post(`${this.documentCategories}/changeStatus`, body, {
      headers: this.headers,
    });
  }

  removeCategoryField(id: number, categoryId: number) {
    this.triggerCategoryField[categoryId](
      id,
      categoryId,
      this.cbContext[categoryId]
    );
  }
  subscribe(cb: Function, currentContext, categoryId) {
    this.triggerCategoryField[categoryId] = cb;
    this.cbContext[categoryId] = currentContext;
  }

  getCategoryFieldsApi(body) {
    return this.http.post(
      `${this.documentCategories}/getDocumentCategories`,
      body,
      {
        headers: this.headers,
      }
    );
  }

  async getCategoryFields(body, newApiCall = false) {
    const response = { success: true, data: [] };
    if (this.categoryFields[body.categoryId] && !newApiCall) {
      response.data = this.categoryFields[body.categoryId];
      const array = [];
      response.data.forEach(cat =>{
        if(cat.id != 0){
          array.push(cat);
        }
      });
      response.data = array;
      return response;
    }
    const result = await this.os.asPromised(this.getCategoryFieldsApi(body));
    if (!result.status) {
      response.success = false;
      response.data = [];
      return response;
    }
    response.success = true;
    response.data = result.payload;

    this.categoryFields[body.categoryId] = result.payload;
    return response;
  }
}
