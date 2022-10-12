import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/modules/nms/services/toast.service';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { isThisTypeNode } from 'typescript';
import { HttpHoursAdjustment } from '../http/roster.httpService';
import { RosterToastService } from '../roster.toast.service';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor(
    private httpService: HttpHoursAdjustment,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService
  ) {}

  getHoursAdjustment(body) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getHoursAdjustment(body).subscribe(
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
  getOvertimeAdjustment(body) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getOverTimeAdjustment(body).subscribe(
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
