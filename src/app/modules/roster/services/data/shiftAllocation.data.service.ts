
import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { RosterToastService } from '../roster.toast.service';
import { ShiftAllocationHttpService } from '../http/shiftAllocation.http.service';

@Injectable({
  providedIn: 'root',
})
export class ShiftAllocationDataService {
  constructor(
    private httpService: ShiftAllocationHttpService,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService
  ) {}

  createShift(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const userPayload = {
            "client_id" : this.appLocalStorage.getClientId(),
            "dept_id" : this.appLocalStorage.getUserId()
        }
        params = {...params , ...userPayload};
        this.httpService.createShift(params).subscribe(
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
            } else{
                this.toastService.toast('shift allocated successfully', 'success-toast');
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
