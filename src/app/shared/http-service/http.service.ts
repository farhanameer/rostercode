import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  getByParams(url: string, data: any): Observable<any> {
    return this.http.get(url, {
      params: data,
    });
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
