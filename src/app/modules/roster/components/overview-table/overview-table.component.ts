import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { RosterService } from './../../services/data/rosterView.data.service';
import { CplAndOvertime } from './../../models/CplAndOvertime';
import { Component, Input, OnInit } from '@angular/core';
import { SingleShiftDetailDialog } from '../../dialogs/single-shift-detail/single-shift-detail.dialog';
import { ModalService } from '../../services/modal/modal.service';
import { PromiseAble } from '../../models/PromiseAble';
import { APIType } from '../../models/APIType';
import { OvertimeAdjustmentDialog } from '../../dialogs/overtime-adjustment/overtime-adjustment.dialog';
import { OvertimeHoursAdjusmentDialog } from '../../dialogs/overtime-hours-adjusment/overtime-hours-adjusment.dialog';
import { EmployeeShiftDataService } from '../../services/data/dropdown.data';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css'],
})
export class OverviewTableComponent implements OnInit {
  
  cplEmployees: CplAndOvertime[];
  employeeShift = [];
  constructor(
    private dataService: RosterService,
    private customModal: ModalService,
    private appLocalStorage: AppLocalStorageService
  ) {}

  ngOnInit(): void {
    this.getListCplAndOvertime();
    // debugger;
  }
  open(employee:any){
    this.customModal.showFeaturedDialog(SingleShiftDetailDialog, employee);
  }
  openOverView() {
    this.customModal.showFeaturedDialog(OvertimeAdjustmentDialog, '');
  }
  openHours() {
    this.customModal.showFeaturedDialog(OvertimeHoursAdjusmentDialog, '');
  }

  async getListCplAndOvertime() {
    const data = await (this.dataService.listCplAndOvertime({
      "client_id" :this.appLocalStorage.getClientId(), 
       "linemanager_id" : this.appLocalStorage.getUserId(),
      "is_roster_emp" : 1   
  }) as Promise<
      PromiseAble<APIType<CplAndOvertime>>
    >);
    if (Array.isArray(data.data.payload)) {
      this.cplEmployees = data.data.payload;
    }
  }
}
