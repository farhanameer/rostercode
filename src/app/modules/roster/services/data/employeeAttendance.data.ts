import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { HttpEmployeeAttendance } from '../http/employeeAttendance.http.service';
import { RosterToastService } from '../roster.toast.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRosterDataService {
  constructor(
    private httpService: HttpEmployeeAttendance,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService
  ) {}

  getEmployeeRoster(params, replace = false) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        if (!replace) {
          params.client_id = this.appLocalStorage.getClientId();
          params.employee_id = this.appLocalStorage.getUserId();
          params.screen_role = 'emp';
        }

        this.httpService.getEmployeeRoster(params).subscribe(
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
