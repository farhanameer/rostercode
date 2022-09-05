import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableService } from './observablefn.service';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  url = APIs.notificationUrl;

  constructor(private http: HttpClient, private os: ObservableService) { }

  getColors() {
    return this.http.get(`${this.url}/getColors`, {headers: this.os.headers()});
  }
}
