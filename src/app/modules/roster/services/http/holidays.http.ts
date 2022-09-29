import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HolidayHttpService {
  roster: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['workCalendarUrl'];
  }

  getHoliday(params = {}) {
    return this.http.get(`${this.roster}/Holiday`, { params });
  }
  addHoliday(body = {}) {
    return this.http.post(`${this.roster}/Holiday`, body);
  }
  updateHoliday(params = {}) {
    return this.http.put(`${this.roster}/Holiday`, { params });
  }
  deleteHoliday(params = {}) {
    return this.http.delete(`${this.roster}/Holiday`, { params });
  }
  punlicHoliday(params = {}) {
    return this.http.post(`${this.roster}/Holiday`, params);
  }
}
