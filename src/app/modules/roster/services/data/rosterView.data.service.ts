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

  getLMRosterView(year_month) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        const params = {
            "client_id" :this.appLocalStorage.getClientId(),
            "year_month" : year_month,
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

  ListCplAndOvertime() : Promise<PromiseAble<APIType<CplAndOvertime>>> {
    return new Promise((resolve, reject) => {
      const response : PromiseAble<APIType<CplAndOvertime>> = { data: null, status: false, message: null };
      try {

        const params = {
            "client_id" :this.appLocalStorage.getClientId(), 
             "linemanager_id" : this.appLocalStorage.getUserId(),
            "is_roster_emp" : 1   
        };

        this.httpService.ListCplAndOvertime(params).subscribe(
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
