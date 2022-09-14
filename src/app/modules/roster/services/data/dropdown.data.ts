import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { HttpEmployeeShift } from '../http/http.dropdown';

@Injectable({
  providedIn: 'root',
})
export class EmployeeShiftDataService {
  constructor(
    private httpService: HttpEmployeeShift,
    private appLocalStorage: AppLocalStorageService
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
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }
}
