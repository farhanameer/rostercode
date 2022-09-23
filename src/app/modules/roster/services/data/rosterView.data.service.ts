import { CplAndOvertime } from './../../models/CplAndOvertime';
import { APIType } from './../../models/APIType';
import { PromiseAble } from './../../models/PromiseAble';
import { RosterViewHttpService } from '../http/rosterVIew.http.service';
import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor(
    private httpService: RosterViewHttpService,
    private appLocalStorage: AppLocalStorageService,
  ) {}

  getDefaultList(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {
          client_id:48,
          screen_role:'lm',
          glob_mkt_id:-1,
          region_id:-1,
          sub_region_id:-1,
          country_id:154,
          state_id:2723,
          city_id:-1,
          branch_id:-1,
          department_id:16,
          desg_id:-1,
          emp_id:-1,
        }

        this.httpService.getDefaultList(params).subscribe(
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

  getEmployeeList(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {
            "client_id" : 48,
            "username" : "waqas.nisar@people.com.pk",
            "dept_id" : 343,
            "department_id" : 16
        }

        this.httpService.getEmployeeList(params).subscribe(
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

  markWeekend(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {

        const params = {
          "roster_id":[
            345674
          ],
          "client_id": 48,
          "leave_type":"Holiday",
          "linemanager_id": 343        
        };

        this.httpService.markWeekend(body).subscribe(
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

  swapShift(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {

        const params = {
          "client_id" : 48,
          "linemanager_id" : 343,
          "shift_id": 3,
          "employee_id": 53130,
          "assigned_shift": 4,
          "assigned_roster_date" : "2022-12-01",
          "rosterDate" : "2022-12-01",
          "replaceWithEmployeeId": 53130          
        };

        this.httpService.swapShift(body).subscribe(
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

  assignAddtionalShift(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {

        const params = {
          "shift_id": 7,
          "employee_id": 17278,
          "rosterDate": "2022-12-01",
          "additional_shift_id": 5,
          "client_id" :this.appLocalStorage.getClientId(), 
          "linemanager_id" : this.appLocalStorage.getUserId(),           
        };

        this.httpService.assignAddtionalShift(body).subscribe(
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

  getCheckInOutView(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {


        params["client_id"] = this.appLocalStorage.getClientId();
        params["screen_role"] = "emp";
        params["employee_id"] = this.appLocalStorage.getUserId();
        this.httpService.getCheckInOutView(params).subscribe(
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

  getLMRosterView(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {
            "client_id" :this.appLocalStorage.getClientId(),
            "year_month" : '2022-Jul',
            "is_roster_employees" : 1 , 
            "reporting_to_id" : this.appLocalStorage.getUserId()
        }

        this.httpService.getLMRosterView(params).subscribe(
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

  listCplAndOvertime(body = {}) : Promise<PromiseAble<APIType<CplAndOvertime>>> {
    return new Promise((resolve, reject) => {
      const response : PromiseAble<APIType<CplAndOvertime>> = { data: null, status: false, message: null };
      try {

        const params = {
            "client_id" :this.appLocalStorage.getClientId(), 
             "linemanager_id" : this.appLocalStorage.getUserId(),
            "is_roster_emp" : 1   
        };

        this.httpService.listCplAndOvertime(body).subscribe(
          (data : APIType<CplAndOvertime>) => {
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
