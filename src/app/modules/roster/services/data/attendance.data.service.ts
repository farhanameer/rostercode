import { AttendanceHttpService } from './../http/attendance.http.service';
import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { HttpEmployeeAttendance } from '../http/employeeAttendance.http.service';
import { RosterToastService } from '../roster.toast.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceDataService {
  constructor(
    private httpService: AttendanceHttpService,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService
  ) {}

  updateAttendance(body) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        
        this.httpService.postUpdateAttendance(body).subscribe(
          (data) => {
            response.data = data;
            response.message = 'success';
            response.status = true;
            if (
              data['payload'] &&
              !Array.isArray(data['payload']) &&
              typeof data['payload'] == 'string'
            ) {
              this.toastService.toast(data['payload'], 'success-toast');
            }
            resolve(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
        resolve(response);
      }
    });
  }
}
