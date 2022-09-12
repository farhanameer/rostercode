// import { CplAndOvertime } from './../../models/CplAndOvertime';
// import { APIType } from './../../models/APIType';
// import { PromiseAble } from './../../models/PromiseAble';
// import { Injectable } from '@angular/core';
// import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
// import { HttpEmployeeAttendance } from '../http/employeeAttendance.http.service';
// import { RosterCPLHttpService } from '../http/rosterCPL.http.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class RosterCPLDataService {
//   constructor(
//     private httpService: RosterCPLHttpService,
//     private appLocalStorage: AppLocalStorageService
//   ) {}

//   ListCplAndOvertime() : Promise<PromiseAble<APIType<CplAndOvertime>>> {
//     return new Promise((resolve, reject) => {
//       const response : PromiseAble<APIType<CplAndOvertime>> = { data: null, status: false, message: null };
//       try {

//         const params = {
//             "client_id" :this.appLocalStorage.getClientId(), 
//              "linemanager_id" : this.appLocalStorage.getUserId(),
//             "is_roster_emp" : 1   
//         };

//         this.httpService.ListCplAndOvertime(params).subscribe(
//           (data : APIType<CplAndOvertime>) => {
//             response.data = data;
//             response.message = 'success';
//             response.status = true;
//             resolve(response);
//           },
//           (err) => {
//             response.message = err;
//             resolve(response);
//           }
//         );
//       } catch (error) {
//         response.message = error;
//         resolve(response);
//       }
//     });
//   }
// }
