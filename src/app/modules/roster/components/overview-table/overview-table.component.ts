import { logging } from 'protractor';
import { SearchService } from './../../services/data/searchService.service';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { RosterService } from './../../services/data/rosterView.data.service';
import { CplAndOvertime } from './../../models/CplAndOvertime';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SingleShiftDetailDialog } from '../../dialogs/single-shift-detail/single-shift-detail.dialog';
import { ModalService } from '../../services/modal/modal.service';
import { PromiseAble } from '../../models/PromiseAble';
import { APIType } from '../../models/APIType';
import { OvertimeAdjustmentDialog } from '../../dialogs/overtime-adjustment/overtime-adjustment.dialog';
import { OvertimeHoursAdjusmentDialog } from '../../dialogs/overtime-hours-adjusment/overtime-hours-adjusment.dialog';
import { EmployeeShiftDataService } from '../../services/data/dropdown.data';
import { THRESHOLD_DIFF } from '@progress/kendo-angular-popup/dist/es2015/services/scrollable.service';
import moment from 'moment';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css'],
})
export class OverviewTableComponent implements OnInit, OnChanges {
  
  cplEmployees: CplAndOvertime[];
  employeeShift = [];
  @Input() search;
  @Input() date;

  constructor(
    private dataService: RosterService,
    private customModal: ModalService,
    private appLocalStorage: AppLocalStorageService,
    private searchService: SearchService
  ) {}
  masterArray = [];
  ngOnChanges(changes: SimpleChanges): void {
    
    const restul = this.searchService.search(this.masterArray, this.search, 'name');
    
    if(restul.searchedArray.length == 0 && this.search == ''){
      this.cplEmployees = [...this.masterArray];
      return;
    }
    this.cplEmployees = restul.searchedArray;
    if(this.date && this.currentDate != this.date){
      this.getListCplAndOvertime();
      this.currentDate = this.date;
    }
  }
  //this.year_month = moment(this.currentDate).format('YYYY')+'-'+moment(this.currentDate).format('MM');
  year_month;
  currentDate;
  ngOnInit(): void {
    // this.getListCplAndOvertime();
  }


  
  open(employee:any){
    const ref = this.customModal.showFeaturedDialog(SingleShiftDetailDialog, employee);
    ref.closed.subscribe(event =>{
      if(event){
        this.getListCplAndOvertime();
      }
    });
  }
  openOverView(employee) {
    const ref = this.customModal.showFeaturedDialog(OvertimeAdjustmentDialog, '' , employee);
    ref.closed.subscribe(event =>{
      if(event){
        this.getListCplAndOvertime();
      }
    });
  }
  openHours(employee) {
    const ref = this.customModal.showFeaturedDialog(OvertimeHoursAdjusmentDialog, '',employee);
    ref.closed.subscribe(event =>{
      if(event){
        this.getListCplAndOvertime();
      }
    });
  }

  async getListCplAndOvertime() {
    const data = await (this.dataService.listCplAndOvertime({
      "client_id" :this.appLocalStorage.getClientId(), 
       "linemanager_id" :await this.appLocalStorage.getLineManagerId(),
      "is_roster_emp" : 1 , 
      "year_month" : this.currentDate
  }) as Promise<
      PromiseAble<APIType<CplAndOvertime>>
    >);
    if (data.data && Array.isArray(data.data.payload)) {
      this.cplEmployees = data.data.payload;
      this.masterArray = [...this.cplEmployees];
    }
  }
}
