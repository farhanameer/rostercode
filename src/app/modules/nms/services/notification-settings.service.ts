import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIs } from "src/environments/environment";
import { ObservableService } from "../util/observablefn.service";

@Injectable({
  providedIn: "root",
})
export class NotificationSettingsService {
  staticDataUrl: string = "";
  documentUrl: string = "";
  notificationUrl: string = "";

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private os: ObservableService) {
    this.staticDataUrl = APIs['staticData'];
    this.documentUrl = APIs['document'];
    this.notificationUrl = APIs['notificationUrl'];

    this.headers = this.os.headers();
  }

  getCityById(id) {
    const params = { id };
    return this.http.get(`${this.notificationUrl}/getCityName`, {
      headers: this.headers,
      params,
    });
  }

  getLocation(client_id, url, data) {
    const params = { client_id, ...data };
    console.log(params);

    return this.http.get(`${this.staticDataUrl}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  getRegion(client_id, url, data) {
    const params = { client_id, ...data };
    console.log(params);

    return this.http.get(`${this.documentUrl}/${url}`, {
      headers: this.headers,
      params,
    });
  }

  sendNotification(portal, clientId, filters, form, users, include) {
    const body = {
      clientId,
      ...filters,
      ...form,
      include,
      users
    };

    if (portal == "hr")
      return this.http.post(
        `${this.notificationUrl}/createNotification`,
        body,
        {
          headers: this.headers,
        }
      );
    else if (portal == "lm")
      return this.http.post(
        `${this.notificationUrl}/createNotificationLM`,
        body,
        {
          headers: this.headers,
        }
      );
  }

  getUserCount(clientId, filters, portal) {
    const body = { ...filters };
    body.clientId = clientId;
    if (portal == "hr")
      return this.http.post(`${this.notificationUrl}/getEmployeesCount`, body, {
        headers: this.headers,
      });

    if (portal == "lm")
      return this.http.post(
        `${this.notificationUrl}/getEmployeesCountLM`,
        body,
        {
          headers: this.headers,
        }
      );
  }

  getEmployees(clientId, filters, portal, pageNumber, pageSize, searchTerm) {
    const body: any = {
      clientId,
      pageNumber,
      pageSize,
      portal,
      searchTerm,
    };
    if (Object.keys(filters[Object.keys(filters)[0]]).length > 0)
      body[Object.keys(filters)[0]] = filters[Object.keys(filters)[0]];
    if (Object.entries(filters[Object.keys(filters)[0]]).length > 0)
      body[Object.keys(filters)[0]] = filters[Object.keys(filters)[0]];
    return this.http.post(`${this.notificationUrl}/getEmployees`, body, {
      headers: this.headers,
    });
  }
}
