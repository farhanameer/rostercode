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

  getWeekends(params = {}) {
    return this.http.get(`${this.roster}/weekends`, { params });
  }
  workCalendarSetting(body = {}) {
    return this.http.post(`${this.roster}/work-calendar-settings`, body);
  }
  getWorkCalendarSetting(params = {}) {
    return this.http.get(`${this.roster}/work-calendar-settings`, { params });
  }
  getHoliday(params = {}) {
    return this.http.get(`${this.roster}/Holiday`, { params });
  }
  addHoliday(body = {}) {
    return this.http.post(`${this.roster}/Holiday`, body);
  }
  updateHoliday(body = {}) {
    let uri = `Holiday?id=${body["id"]}`
    return this.http.put(`${this.roster}/${uri}`, body);
  }
  deleteHoliday(params = {}) {
    return this.http.delete(`${this.roster}/Holiday`, { params });
  }
  publicHoliday(params = {}) {
    return this.http.post(`${this.roster}/Holiday`, params);
  }
  getPublicHoliday(params = {}) {
    return this.http.get(`${this.roster}/PublicHoliday`, { params });
  }
}
