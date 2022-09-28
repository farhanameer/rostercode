import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftRequestHttpService {
  roster: string = '';
  shiftAllocation: string = '';
  ShiftRequestAndSetup: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['rosterUrl'];
    this.shiftAllocation = APIs['shiftAllocationUrl'];
    this.ShiftRequestAndSetup = APIs['ShiftRequestAndSetupUrl'];
  }

  getDefaultList(params = {}) {
    return this.http.get(`${this.ShiftRequestAndSetup}/DefaultShift`, {params});
  }

  hrInsertShift(body = {}) {
    return this.http.post(`${this.ShiftRequestAndSetup}/CreateShift`, body);
  }

  lmInsertShift(body = {}) {
    return this.http.post(`${this.ShiftRequestAndSetup}/CreateShift`, body);
  }

  shiftById(body = {}) {
    return this.http.post(`${this.ShiftRequestAndSetup}/Shift`, body);
  }

  getShiftByDepartmentManager(params = {}) {
    return this.http.get(`${this.ShiftRequestAndSetup}/ShiftByDepartmentManager`, {params});
  }

  getShiftSetupDropDowns(params = {}) {
    return this.http.get(`${this.ShiftRequestAndSetup}/ShiftSetupDropDowns`, {params});
  }

  getShiftColors(params = {}) {
    return this.http.get(`${this.ShiftRequestAndSetup}/ShiftColors`, {params});
  }

  getShiftStatusColors(params = {}) {
    return this.http.get(`${this.ShiftRequestAndSetup}/ShiftStatusColors`, {params});
  }

  getShiftTypes(params = {}) {
    return this.http.get(`${this.ShiftRequestAndSetup}/ShiftTypes`, {params});
  }

  putDeleteDisapprovedById(params = {}){
    return this.http.put(`${this.ShiftRequestAndSetup}/Shift`, {params});
  }

  putUpdateShift(params = {}){
    return this.http.put(`${this.ShiftRequestAndSetup}/Shift`, {params});
  }
}
