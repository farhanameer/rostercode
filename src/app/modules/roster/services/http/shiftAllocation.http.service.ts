import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftAllocationHttpService {
  roster: string = '';
  shiftAllocation: string = '';
  ShiftRequestAndSetup: string = '';
  constructor(private http: HttpClient) {
    this.roster = APIs['rosterUrl'];
    this.shiftAllocation = APIs['shiftAllocationUrl'];
  }

  

  createShift(body = {}) {
    return this.http.post(`${this.shiftAllocation}/CreateShift`, body);
  }

  
}
