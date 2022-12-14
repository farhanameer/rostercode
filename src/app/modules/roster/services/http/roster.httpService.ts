import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpHoursAdjustment {
  roster: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['rosterUrl'];
  }

  getHoursAdjustment(body) {
    return this.http.post(`${this.roster}/ApproveHours`, body);
  }
  getOverTimeAdjustment(body) {
    return this.http.post(`${this.roster}/ApprovedHoursToCpl&Payment`, body);
  }
  getLeaveTypes(){
    return this.http.get(`${this.roster}/GetLeaveTypes`);
  }
}
