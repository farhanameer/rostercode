import { ShiftRequestHttpService } from './../http/shiftRequest.http';
import { CplAndOvertime } from './../../models/CplAndOvertime';
import { APIType } from './../../models/APIType';
import { PromiseAble } from './../../models/PromiseAble';
import { RosterViewHttpService } from '../http/rosterVIew.http.service';
import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShiftRequestDataService {
  constructor(
    private httpService: ShiftRequestHttpService,
    private appLocalStorage: AppLocalStorageService,
  ) {}

  putUpdateShift(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {}

        this.httpService.putUpdateShift(paramss).subscribe(
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

  putDeleteDisapprovedById(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {
            screen_role:"hr",
            client_id:48,
            shift_id:7,
            action:"approve"
        }

        this.httpService.putDeleteDisapprovedById(paramss).subscribe(
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

  getShiftTypes(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {}

        this.httpService.getShiftTypes(paramss).subscribe(
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

  getShiftStatusColors(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {}

        this.httpService.getShiftStatusColors(paramss).subscribe(
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

  getShiftColors(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {}

        this.httpService.getShiftColors(paramss).subscribe(
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

  getShiftSetupDropDowns(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {}

        this.httpService.getShiftSetupDropDowns(paramss).subscribe(
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

  getShiftByDepartmentManager(params = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const paramss = {
            client_id:48,
            line_manager_id:343
        }

        this.httpService.getShiftByDepartmentManager(paramss).subscribe(
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
    
  shiftById(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const body2 = {
          "client_id": 48,
          "shift_id": 7
        }

        this.httpService.shiftById(body2).subscribe(
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

  lmInsertShift(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {

        const body2 = {
          "screen_role": "lm",
          "line_manager_id": 343,
          "client_id": 48,
          "shift_type_id": 1,
          "name": "testing12334",
          "time_in": "01:00:00",
          "time_out": "11:00:00",
          "lm_request": 1,
          "lm_comment": "test",
          "work_hours": 8,
          "hours_range": "daily",
          "glob_mkt_id": -1,
          "region_id": -1,
          "sub_region_id": -1,
          "country_id": 154,
          "state_id": 2723,
          "city_id": -1,
          "branch_id": -1,
          "department_id": 16,
          "desg_id": -1,
          "emp_id": -1
      }
        this.httpService.lmInsertShift(body2).subscribe(
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

  hrInsertShift(body = {}) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {

        const body2 = {
          "screen_role": "hr",
          "client_id": 48,
          "color": "#f2ab01",
          "name": "Salman Butt testing",
          "time_in": "09:00:00",
          "time_out": "17:30:00",
          "mid_break_enable": 0,
          "mid_break_time_in": "13:00:00",
          "mid_break_time_out": "14:00:00",
          "ext_mid_break_day_id": "5",
          "ext_mid_break_time_in": "12:00:00",
          "ext_mid_break_time_out": "14:00:00",
          "consecutive_late": 5,
          "late_arrival_tolerance": 2,
          "attendance_tolerance": 3,
          "revert_shift_id": 0,
          "shift_revert_date_start": "2022-09-01",
          "shift_revert_date_end": "2022-09-03",
          "shift_type_id": 1,
          "glob_mkt_id": 1,
          "region_id": 2,
          "sub_region_id": 4,
          "country_id": 154,
          "state_id": 2723,
          "city_id": 31276,
          "branch_id": 22,
          "department_id": 16,
          "desg_id": -1,
          "emp_id": -1,
          "qrt_break": [
              {
                  "qrt_break_title": "Waleed Bhai",
                  "qrt_break_time_in": "15:00:00",
                  "qrt_break_time_out": "15:00:00"
              }
          ]
      };
        this.httpService.hrInsertShift(body2).subscribe(
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

        this.httpService.getDefaultList(paramss).subscribe(
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