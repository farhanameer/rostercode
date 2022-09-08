import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RosterCPLHttpService  {
  roster: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['rosterUrl'];
  }

  ListCplAndOvertime(body = {}) {
    return this.http.post(`${this.roster}/CplAndOvertime`, body);
  }
}
