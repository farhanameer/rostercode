
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIs } from "src/environments/environment";
import { ObservableService } from "../util/observablefn.service";



@Injectable({
  providedIn: "root",
})
export class EmployeeListService {

  document: string = "";

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private os: ObservableService) {
    this.document = APIs['document'];

    this.headers = this.os.headers();
    this.headers.append("content-type", "multipart/form-data");
  }

  getEmployeeList() {
    return this.http.get(`${this.document}/getEmployeeList`, {
      headers: this.headers,
    });
  }
}


