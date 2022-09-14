import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpEmployeeShift {
  roster: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['workCalendarUrl'];
  }

  getEmployeeShift(params = {}) {
    return this.http.get(`${this.roster}/ShiftList`, { params });
  }
}
