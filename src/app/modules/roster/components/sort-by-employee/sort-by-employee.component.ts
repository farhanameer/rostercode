import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { anyChanged } from '@progress/kendo-angular-common';
import { inArray } from 'jquery';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { RosterService } from '../../services/data/rosterView.data.service';

@Component({
  selector: 'app-sort-by-employee',
  templateUrl: './sort-by-employee.component.html',
  styleUrls: ['./sort-by-employee.component.css']
})
export class SortByEmployeeComponent implements OnInit {
  @Input() dates;
  constructor(public activeModal: NgbActiveModal,
    private dataService: RosterService,
    private appLocalStorage: AppLocalStorageService) { }

  ngOnInit(): void {
    
    console.log('dates we got' , this.dates);

    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.dates.start , 
      end_date : this.dates.end,
      is_roster_employees: 1,
      reporting_to_id: this.appLocalStorage.getUserId(),
      sortByEmployee : 'ASC'
    });
  }


  data = [];
  async getLMRosterView(params) {


    const data = await this.dataService.getLMRosterView(params);

    if (!data['data']['status']) {
      return;
    }


    if(!Array.isArray(data['data']['payload'])){
      console.log('error');
      return;
    }

    const response = data['data']['payload'];


    console.log('response we got',response);

    this.data = response[0].employees;


    
    
    // response.forEach((singleData) => {
    //   let employeeArray = [];
    //   const obj = {
    //     date: singleData.date,
    //     employees: [],
    //   };

    //   singleData.shifts.forEach((singleShift) => {
    //     employeeArray = [...employeeArray, ...singleShift.employees];
    //   });

    //   obj.employees = employeeArray;
    //   this.data.push(obj);
    // });

    console.log('loopAble Data', this.data);
  }

}
