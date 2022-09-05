import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObservableService } from "../../util/observablefn.service";
import { APIs } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DocumentReportService {
  staticDataUrl: string = "";
  documentUrl: string = "";
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private os: ObservableService) {
    this.staticDataUrl = APIs['staticData'];
    this.documentUrl = APIs['document'];
    this.headers = this.os.headers();
  }

  getLocationForReport(client_id, url, data) {
    const params = { client_id, ...data };
    console.log(params);

    return this.http.get(`${this.staticDataUrl}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  getRegionForReport(client_id, url, data) {
    const params = { client_id, ...data };
    console.log(params);

    return this.http.get(`${this.documentUrl}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  getReportData(url, pageSize, pageNumber, filters, clientId) {
    const body = {
      clientId,
      pageSize,
      pageNumber,
      filters,
    };
    return this.http.post(`${this.documentUrl}/${url}`, body, {
      headers: this.headers,
    });
  }

  downloadReport(url, filters, clientId) {
    const body = {
      clientId,
      filters,
      isReport : true
    };
    return this.http.post(`${this.documentUrl}/${url}` , body, {
      headers: this.headers,
      responseType: "blob"
    });
  }
}
