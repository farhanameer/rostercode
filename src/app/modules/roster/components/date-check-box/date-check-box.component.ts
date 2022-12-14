import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { WeekendTypeComponent } from '../../dialogs/weekend-type/weekend-type.component';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ModalService } from '../../services/modal/modal.service';
import { RosterToastService } from '../../services/roster.toast.service';

@Component({
  selector: 'app-date-check-box',
  templateUrl: './date-check-box.component.html',
  styleUrls: ['./date-check-box.component.scss']
})
export class DateCheckBoxComponent implements OnInit, OnChanges {
  data : any = [];
  @Input() modelData : any = [];
  @Input() searchedValue = null;
  constructor( 
    public activeModal: NgbActiveModal,
       private customModal: ModalService , 
       private dataService : RosterService , 
       private appLocalStorage: AppLocalStorageService ,
       private tosterService : RosterToastService
   ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Date-Check-Box",this.searchedValue);
    if(!this.searchedValue || this.searchedValue == ''){
      this.getLMRosterView({
        client_id: this.appLocalStorage.getClientId(),
        start_date : this.modelData.dateRagne.start , 
        end_date : this.modelData.dateRagne.end,
        reporting_to_id: this.appLocalStorage.getUserId(),
      });
      return;
    }
    
    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.modelData.dateRagne.start , 
      end_date : this.modelData.dateRagne.end,
      reporting_to_id: this.appLocalStorage.getUserId(),
      search : this.searchedValue
    });
  }

  ngOnInit(): void {
    console.log('model Data' , this.modelData);
    if(this.searchedValue){
      this.getLMRosterView({
        client_id: this.appLocalStorage.getClientId(),
        start_date : this.modelData.dateRagne.start , 
        end_date : this.modelData.dateRagne.end,
        reporting_to_id: this.appLocalStorage.getUserId(),
        search : this.searchedValue
      });
    }
    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.modelData.dateRagne.start , 
      end_date : this.modelData.dateRagne.end,
      reporting_to_id: this.appLocalStorage.getUserId(),
    });
  }
open(employees , isSingle = false){
    console.log('emps' , employees);
    const rosterIds = [];
    if(!isSingle){
      employees.forEach(emp =>{
        rosterIds.push(emp.roster_id);
      })
    }else{
      rosterIds.push(employees.roster_id);
    }
    this.modelData.rosterIds = rosterIds;
    this.customModal.showFeaturedDialog(WeekendTypeComponent, "" , this.modelData);

  }


  async getLMRosterView(params) {
    params["reporting_to_id"] = await this.appLocalStorage.getLineManagerId();
    this.data = [];
    if(this.modelData.filters) {
      if(this.modelData.filters["employeeType"] !=undefined) {
        params['is_roster_employees'] = this.modelData.filters["employeeType"]
      }
      if(this.modelData.filters["reportingLevel"]) {
        params['reporting'] = this.modelData.filters["reportingLevel"]
      }

      if(this.modelData.filters["department"]) {
        params['department'] = this.modelData.filters["department"]
      }
      if(this.modelData.filters["employees"]) {
        params['employee_id'] = this.modelData.filters["employees"]
      }
      if(this.modelData.filters["shifts"]) {
        params['shift_id'] = this.modelData.filters["shifts"]
      }
    }
    const data = await this.dataService.getLMRosterView(params);

    if (!data['data']['status']) {
      this.tosterService.toast(data['data']['payload'] , 'error-toast');
      this.data = [];
      return;
    }

    const response = data['data']['payload'];
    const hash = {};
    const transformedData = [];
    this.data = [];
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
