import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class SortByEmployeeComponent implements OnInit, OnChanges {
  @Input() dates;
  @Input() searchedValue = null;
  constructor(public activeModal: NgbActiveModal,
    private dataService: RosterService,
    private appLocalStorage: AppLocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Sort by Employee",this.searchedValue);
    if(!this.searchedValue || this.searchedValue == ''){
      this.getLMRosterView({
        client_id: this.appLocalStorage.getClientId(),
        start_date : this.dates.dateRagne.start , 
        end_date : this.dates.dateRagne.end,
        reporting_to_id: this.appLocalStorage.getUserId(),
        sortByEmployee : 'ASC'
      });
      return;
    }
    
    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.dates.dateRagne.start , 
      end_date : this.dates.dateRagne.end,
      reporting_to_id: this.appLocalStorage.getUserId(),
      search : this.searchedValue,
      sortByEmployee : 'ASC'
    });
  }

  ngOnInit(): void {
    
    console.log('dates we got' , this.dates);
    if(this.searchedValue){
      this.getLMRosterView({
        client_id: this.appLocalStorage.getClientId(),
        start_date : this.dates.dateRagne.start , 
        end_date : this.dates.dateRagne.end,
        reporting_to_id: this.appLocalStorage.getUserId(),
        sortByEmployee : 'ASC',
        search : this.searchedValue
      });
      return;
    }

    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.dates.dateRagne.start , 
      end_date : this.dates.dateRagne.end,
      reporting_to_id: this.appLocalStorage.getUserId(),
      sortByEmployee : 'ASC'
    });
  }


  data = [];
  async getLMRosterView(params) {
    params["reporting_to_id"] = await this.appLocalStorage.getLineManagerId();
    if(this.dates.filters) {
      if(this.dates.filters["employeeType"] !=undefined) {
        params['is_roster_employees'] = this.dates.filters["employeeType"]
      }
      if(this.dates.filters["reportingLevel"]) {
        params['reporting'] = this.dates.filters["reportingLevel"]
      }

      if(this.dates.filters["department"]) {
        params['department'] = this.dates.filters["department"]
      }
      if(this.dates.filters["employees"]) {
        params['employee_id'] = this.dates.filters["employees"]
      }
      if(this.dates.filters["shifts"]) {
        params['shift_id'] = this.dates.filters["shifts"]
      }
    }

    const data = await this.dataService.getLMRosterView(params);
    this.data = [];

    if (!data['data']['status']) {
      this.data = [];
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
