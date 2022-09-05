import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponse } from "../models/response.interface";
import { SessionExpireService } from "../services/session-expire.service";
import { ToastService } from "../services/toast.service";

@Injectable({
  providedIn: "root",
})
export class ObservableService {
  constructor(
    private toastService: ToastService,
    private se: SessionExpireService
  ) {}

  asPromised(fn: Observable<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      fn.subscribe(
        (res: IResponse) => {
          resolve(res);
        },
        ({ error }) => {
          this.toastService.toast(error.message, "error-toast");

          if (!navigator.onLine)
            this.toastService.toast("Internet connection lost", "error-toast");
          reject(error);
        }
      );
    });
  }

  asSubscribed(fn: Observable<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      fn.subscribe(
        (res: IResponse) => {
          resolve(res);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  }

  headers() {
    let token = JSON.parse(localStorage.getItem("token_nda"));
    if (!token) token = "generaltoken";
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", token);
    headers = headers.append("portal", localStorage.getItem("link"));
    return headers;
  }

  getClientId() {
    let clientId = localStorage.getItem("client_id");
    if (!clientId) return 0;
    return Number(clientId);
  }

  getPortal() {
    let portal = localStorage.getItem("link") || "emportal";
    return portal;
  }
}
