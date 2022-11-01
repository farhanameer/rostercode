import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftAllocationHttpService {
  roster: string = '';
  shiftAllocation: string = '';
  ShiftRequestAndSetup: string = '';
  constructor(private http: HttpClient , private appLocalStorage : AppLocalStorageService) {
    this.roster = APIs['rosterUrl'];
    this.shiftAllocation = APIs['shiftAllocationUrl'];
  }

  

  createShift(body = {}) {
    return this.http.post(`${this.shiftAllocation}/CreateShift`, body);
  }

  createShiftFile(file) {
    let formData = new FormData();
    formData.append('shift_allocation' , file);
    formData.append('client_id' , this.appLocalStorage.getClientId())
    formData.append('dept_id' , this.appLocalStorage.getUserId());
    return this.http.post(`${this.shiftAllocation}/CreateShiftInFile`, formData);
  }

  
}
