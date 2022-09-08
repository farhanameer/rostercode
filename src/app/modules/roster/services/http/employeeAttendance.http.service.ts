import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpEmployeeAttendance {
  roster: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['rosterUrl'];
  }

  getEmployeeRoster(params = {}) {
    return this.http.get(`${this.roster}/GetEmpRoster`, { params });
  }
}
