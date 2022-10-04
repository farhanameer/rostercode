import { Injectable } from '@angular/core';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { HttpHoursAdjustment } from '../http/roster.httpService';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor(
    private httpService: HttpHoursAdjustment,
    private appLocalStorage: AppLocalStorageService
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
            resolve(response);
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
  getOvertimeAdjustment(body) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getOverTimeAdjustment(body).subscribe(
          (data) => {
            response.data = data;
            response.message = 'success';
            response.status = true;
            resolve(response);
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
