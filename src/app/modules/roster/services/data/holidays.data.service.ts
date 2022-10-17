import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { HolidayHttpService } from '../http/holidays.http';
import { RosterToastService } from '../roster.toast.service';

@Injectable({
  providedIn: 'root',
})
export class HolidayDataService {
  constructor(
    private httpService: HolidayHttpService,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService
  ) {}

  getWorkCalendarSetting(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        // params.client_id = this.appLocalStorage.getClientId();
        this.httpService.getWorkCalendarSetting(params).subscribe(
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

  workCalendarSetting(body) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        // params.client_id = this.appLocalStorage.getClientId();
        this.httpService.workCalendarSetting(body).subscribe(
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

  getWeekends(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        // params.client_id = this.appLocalStorage.getClientId();
        this.httpService.getWeekends(params).subscribe(
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

  addHoliday(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      params.client_id = this.appLocalStorage.getClientId();

      try {
        const body = {
          client_id: this.appLocalStorage.getClientId(),
          created_by: this.appLocalStorage.getUserId(),
        };
        let data = { ...body, ...params };
        this.httpService.addHoliday(data).subscribe(
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
            console.log('abhi responce aye ga na BEru', response);
          },
          (err) => {
            response.message = err.error.error;
            // console.log('add Holiday Error', err.error.error);
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
  updateHoliday(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const body = {
          client_id: 48,
          created_by: this.appLocalStorage.getUserId(),
        };
        let data = { ...body, ...params };
        this.httpService.updateHoliday(data).subscribe(
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
  deleteHoliday(params) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.deleteHoliday(params).subscribe(
          (data) => {
            response.data = null;
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
