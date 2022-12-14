import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { HttpEmployeeShift } from '../http/http.dropdown';
import { RosterToastService } from '../roster.toast.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeShiftDataService {
  constructor(
    private httpService: HttpEmployeeShift,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService
  ) {}

  getEmployeeShift(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        params.client_id = this.appLocalStorage.getClientId();
        // params.screen_role = 'emp';

        this.httpService.getEmployeeShift(params).subscribe(
          (data) => {
            response.data = data['payload'];
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
            console.log(response);
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
