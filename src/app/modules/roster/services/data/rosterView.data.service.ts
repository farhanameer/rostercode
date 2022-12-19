import { CplAndOvertime } from './../../models/CplAndOvertime';
import { APIType } from './../../models/APIType';
import { PromiseAble } from './../../models/PromiseAble';
import { RosterViewHttpService } from '../http/rosterVIew.http.service';
import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { RosterToastService } from '../roster.toast.service';
import { LinkCheckerService } from '../linkChecker.service';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor(
    private httpService: RosterViewHttpService,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService,
    private linkService : LinkCheckerService
  ) {}

  getEmployeeList(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {
          client_id: 48,
          username: 'waqas.nisar@people.com.pk',
          dept_id: 343,
          department_id: 16,
        };

        this.httpService.getEmployeeList(params).subscribe(
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

  markWeekend(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const params = {
          roster_id: [345674],
          client_id: 48,
          leave_type: 'Holiday',
          linemanager_id: 343,
        };

        this.httpService.markWeekend(body).subscribe(
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

  swapShift(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const params = {
          client_id: 48,
          linemanager_id: 343,
          shift_id: 3,
          employee_id: 53130,
          assigned_shift: 4,
          assigned_roster_date: '2022-12-01',
          rosterDate: '2022-12-01',
          replaceWithEmployeeId: 53130,
        };

        this.httpService.swapShift(body).subscribe(
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

  assignAddtionalShift(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const params = {
          shift_id: 7,
          employee_id: 17278,
          rosterDate: '2022-12-01',
          additional_shift_id: 5,
          client_id: this.appLocalStorage.getClientId(),
          linemanager_id: this.appLocalStorage.getUserId(),
        };

        this.httpService.assignAddtionalShift(body).subscribe(
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

  getCheckInOutView(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        params['client_id'] = this.appLocalStorage.getClientId();
        params['screen_role'] = 'emp';
        params['employee_id'] = this.appLocalStorage.getUserId();
        this.httpService.getCheckInOutView(params).subscribe(
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

  getLMRosterView(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {
          client_id: this.appLocalStorage.getClientId(),
          year_month: '2022-Jul',
          is_roster_employees: 1,
          reporting_to_id: this.appLocalStorage.getUserId(),
        };

        if(this.linkService.isLineManagerPortal()){
          this.httpService.getLMRosterView(params).subscribe(
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
        }else{
          delete params['reporting_to_id'];
          this.httpService.getHRRosterView(params).subscribe(
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
        }
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
        resolve(response);
      }
    });
  }

  listCplAndOvertime(body = {}): Promise<PromiseAble<APIType<CplAndOvertime>>> {
    return new Promise((resolve, reject) => {
      const response: PromiseAble<APIType<CplAndOvertime>> = {
        data: null,
        status: false,
        message: null,
      };
      try {
        const params = {
          client_id: this.appLocalStorage.getClientId(),
          linemanager_id: this.appLocalStorage.getUserId(),
          is_roster_emp: 1,
        };
        if(!this.linkService.isLineManagerPortal()){
          delete body['linemanager_id'];
        }
        this.httpService.listCplAndOvertime(body).subscribe(
          (data: APIType<CplAndOvertime>) => {
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
