import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { forEachChild } from 'typescript';
import { RosterService } from '../../services/data/rosterView.data.service';

@Component({
  selector: 'app-sort-by-date',
  templateUrl: './sort-by-date.component.html',
  styleUrls: ['./sort-by-date.component.css'],
})
export class SortByDateComponent implements OnInit, OnChanges {
  @Input() dates: any;
  @Input() searchedValue = null;

  data: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private dataService: RosterService,
    private appLocalStorage: AppLocalStorageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Sort By Date",this.searchedValue);
    if(!this.searchedValue || this.searchedValue == ''){
      this.getLMRosterView({
        client_id: this.appLocalStorage.getClientId(),
        start_date : this.dates.dateRagne.start , 
        end_date : this.dates.dateRagne.end,
        reporting_to_id: this.appLocalStorage.getUserId(),
      });
      return;
    }
    
    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.dates.dateRagne.start , 
      end_date : this.dates.dateRagne.end,
      reporting_to_id: this.appLocalStorage.getUserId(),
      search : this.searchedValue
    });
  }

  ngOnInit(): void {
    console.log('in popup', this.dates);
    if(this.searchedValue){
      this.getLMRosterView({
        client_id: this.appLocalStorage.getClientId(),
        start_date : this.dates.dateRagne.start , 
        end_date : this.dates.dateRagne.end,
        reporting_to_id: this.appLocalStorage.getUserId(),
        search : this.searchedValue
      });
    }
    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.dates.dateRagne.start , 
      end_date : this.dates.dateRagne.end,
      reporting_to_id: this.appLocalStorage.getUserId(),
    });
  }

  async getLMRosterView(params) {

    let body = params;
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

    const response = data['data']['payload'];
    const hash = {};
    const transformedData = [];

    response.forEach((singleData) => {
      let employeeArray = [];
      const obj = {
        date: singleData.date,
        employees: [],
      };

      singleData.shifts.forEach((singleShift) => {
        employeeArray = [...employeeArray, ...singleShift.employees];
      });

      obj.employees = employeeArray;
      this.data.push(obj);
    });

    console.log('loopAble Data', this.data);
  }
}
