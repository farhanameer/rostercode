import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIs } from "src/environments/environment";
import { ObservableService } from "../../util/observablefn.service";

@Injectable({
  providedIn: "root",
})
export class PhysicalLocationSetupService {
  orgChartUrl: string = "";
  locationUrl: string = "";
  staticDataUrl: string = "";

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private os: ObservableService) {
    this.locationUrl = APIs['document'];
    this.staticDataUrl = APIs['staticData'];
    this.orgChartUrl = APIs['orgChart'];
    
    this.headers = this.os.headers();
  }

  getCountries(cId): Observable<any> {
    console.log('getCountries');
    
    const params = { client_id: cId };
    return this.http.get(`${this.staticDataUrl}/getCountry`, {
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
  getLocations(url, cId, data): Observable<any> {
    const params = { client_id: cId, ...data };
    console.log(params);
    
    return this.http.get(`${this.locationUrl}/${url}`, {
      headers: this.headers,
      params,
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
  getLocationsList(cId, filter, pageNumber, pageSize) {
    const body = {cId, pageNumber, pageSize}
    if(filter)
      body['filters'] = filter;
    console.log(body);
    
    return this.http.post(`${this.locationUrl}/getLocationList`, body, {
      headers: this.headers
    });
  }
  saveCompanyAddresses(url, formData): Observable<any> {
    
    return this.http.post(`${this.locationUrl}/${url}`, {data: formData}, {
      headers: this.headers,
    });
  }


  checkDependency(url , ids , key) : Observable<any>{
    return this.http.post(`${this.locationUrl}/${url}`, {ids , key}, {
      headers: this.headers,
    });
  }

  addAddress(formData) {
    return this.http.post(`${this.locationUrl}/locationList`, formData, {
      headers: this.headers,
    });
  }

  updateAddress(formData) {
    return this.http.post(`${this.locationUrl}/updatePhysicalLocationList`, formData, {
      headers: this.headers,
    });
  }

  editLocation(locationId) {
    return this.http.get(`${this.locationUrl}/locationListDetails/${locationId}`, {
      headers: this.headers,
    });
  }
  // createFloor(cId, buildingId, floorNumber): Observable<any> {
  //   const body = { cId, buildingId, floorNumber };
  //   return this.http.post(`${this.locationUrl}/floor`, body, {
  //     headers: this.headers,
  //   });
  // }
  // createBox(cId, floorId, boxNumber): Observable<any> {
  //   const body = { cId, floorId, boxNumber };
  //   return this.http.post(`${this.locationUrl}/box`, body, {
  //     headers: this.headers,
  //   });
  // }
  // createCabinet(cId, boxId, cabinetNumber): Observable<any> {
  //   const body = { cId, boxId, cabinetNumber };
  //   return this.http.post(`${this.locationUrl}/cabinet`, body, {
  //     headers: this.headers,
  //   });
  // }
  // createDrawer(cId, cabinetId, drawerNumber): Observable<any> {
  //   const body = { cId, cabinetId, drawerNumber };
  //   return this.http.post(`${this.locationUrl}/drawer`, body, {
  //     headers: this.headers,
  //   });
  // }
  // createFlap(cId, cabinetId, flapNumber): Observable<any> {
  //   const body = { cId, cabinetId, flapNumber };
  //   return this.http.post(`${this.locationUrl}/flap`, body, {
  //     headers: this.headers,
  //   });
  // }

  deletePhysicalLocation(url, ids: any): Observable<any> {
    const body = ids;
    return this.http.request("delete", `${this.locationUrl}/${url}`, {
      headers: this.headers, body,
    });
  }



  markLocationEnabled(url , key, ids: any): Observable<any> {
    const body = ids;
    return this.http.post(`${this.locationUrl}/${url}`, {ids , key}, {
      headers: this.headers,
    });
  }
}
