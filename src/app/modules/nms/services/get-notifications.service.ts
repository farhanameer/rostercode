import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIs } from "src/environments/environment";
import { ObservableService } from "../util/observablefn.service";

@Injectable({
  providedIn: "root",
})
export class GetNotificationsService {
  notificationUrl: string = "";

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private os: ObservableService) {
    this.notificationUrl = APIs['notificationUrl'];
    this.headers = this.os.headers();
  }

  getNotificationsHistory(clientId, filters, pageNumber, pageSize) {
    const body = {
      clientId,
      filters,
      pageNumber,
      pageSize,
    };
    return this.http.post(`${this.notificationUrl}/getAllNotifications`, body, {
      headers: this.headers,
    });
  }

  getSingleNotificationHistory(clientId, id) {
    const params = { clientId, id };

    return this.http.get(`${this.notificationUrl}/getSingleNotification`, {
      headers: this.headers,
      params,
    });
  }

  getUserNotifications(pageNumber, pageSize) {
    const body = { pageNumber, pageSize };
    return this.http.post(`${this.notificationUrl}/getUserNotifications`, body, {
      headers: this.headers,
    });
  }

  getSingleUserNotification(id) {
    const params = { id };

    return this.http.get(`${this.notificationUrl}/singleNotification`, {
      headers: this.headers,
      params,
    });
  }

  getUnreadNotificationCount() {
    return this.http.get(`${this.notificationUrl}/unreadCount`, {
      headers: this.headers,
    });
  }
}
