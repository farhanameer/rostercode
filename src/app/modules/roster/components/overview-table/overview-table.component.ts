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

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css'],
})
export class OverviewTableComponent implements OnInit, OnChanges {
  
  cplEmployees: CplAndOvertime[];
  employeeShift = [];
  @Input() search;
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

  }

  ngOnInit(): void {
    this.getListCplAndOvertime();
  }

  
  open(employee:any){
    this.customModal.showFeaturedDialog(SingleShiftDetailDialog, employee);
  }
  openOverView(employee) {
    this.customModal.showFeaturedDialog(OvertimeAdjustmentDialog, '' , employee);
  }
  openHours(employee) {
    this.customModal.showFeaturedDialog(OvertimeHoursAdjusmentDialog, '',employee);
  }

  async getListCplAndOvertime() {
    const data = await (this.dataService.listCplAndOvertime({
      "client_id" :this.appLocalStorage.getClientId(), 
       "linemanager_id" :await this.appLocalStorage.getLineManagerId(),
      "is_roster_emp" : 1   
  }) as Promise<
      PromiseAble<APIType<CplAndOvertime>>
    >);
    if (data.data && Array.isArray(data.data.payload)) {
      this.cplEmployees = data.data.payload;
      this.masterArray = [...this.cplEmployees];
    }
  }
}
