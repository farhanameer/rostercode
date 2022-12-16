import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceHttpService {
  roster: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['rosterAttendance'];
  }

  postUpdateAttendance(body = {}) {
    return this.http.post(`${this.roster}/UpdateAttendance`, body);
  }
}
