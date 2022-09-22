import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RosterViewHttpService {
  roster: string = '';
  shiftAllocation: string = '';
  ShiftRequestAndSetup: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['rosterUrl'];
    this.shiftAllocation = APIs['shiftAllocationUrl'];
    this.ShiftRequestAndSetup = APIs['ShiftRequestAndSetupUrl'];
  }

  getLMRosterView(params = {}) {
    return this.http.get(`${this.roster}/GetLmRoster`, { params });
  }

  listCplAndOvertime(body = {}) {
    return this.http.post(`${this.roster}/CplAndOvertime`, body);
  }

  getCheckInOutView(params = {}) {
    return this.http.get(`${this.roster}/GetEmpRoster`, { params });
  }
  
  assignAddtionalShift(body = {}) {
    return this.http.post(`${this.roster}/AssignAdditionalShift`, body);
  }

  swapShift(body = {}) {
    return this.http.post(`${this.roster}/SwapShift`, body);
  }

  markWeekend(body = {}) {
    return this.http.post(`${this.roster}/MarkWeekend`, body);
  }

  getEmployeeList(params = {}) {
    return this.http.get(`${this.shiftAllocation}/EmployeeList`, {params});
  }

  getDefaultList(params = {}) {
    return this.http.get(`${this.ShiftRequestAndSetup}/DefaultShift`, {params});
  }
}
