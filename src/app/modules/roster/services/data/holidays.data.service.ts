import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { HolidayHttpService } from '../http/holidays.http';

@Injectable({
  providedIn: 'root',
})
export class HolidayDataService {
  constructor(
    private httpService: HolidayHttpService,
    private appLocalStorage: AppLocalStorageService
  ) {}

  getHoliday(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        // params.client_id = this.appLocalStorage.getClientId();
        this.httpService.getHoliday(params).subscribe(
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
  addHoliday(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      params.client_id = this.appLocalStorage.getClientId();

      try {
        const body = {
          client_id: 48,
          line_manager_id: this.appLocalStorage.getUserId(),
        };
        let data = {...body , ...params}
        this.httpService.addHoliday(data).subscribe(
          (data) => {
            response.data = data['payload'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log('BEru', response);
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
  updateHoliday(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.updateHoliday(params).subscribe(
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
  deleteHoliday(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.deleteHoliday(params).subscribe(
          (data) => {
            response.data = null;
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
