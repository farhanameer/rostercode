import { RosterService } from './../../services/data/rosterView.data.service';
import { CplAndOvertime } from './../../models/CplAndOvertime';
import { Component, Input, OnInit } from '@angular/core';
import { SingleShiftDetailDialog } from '../../dialogs/single-shift-detail/single-shift-detail.dialog';
import { ModalService } from '../../services/modal/modal.service';
import { PromiseAble } from '../../models/PromiseAble';
import { APIType } from '../../models/APIType';
import { OvertimeAdjustmentDialog } from '../../dialogs/overtime-adjustment/overtime-adjustment.dialog';
import { ShiftManagmentDialog } from '../../dialogs/shift-managment/shift-managment.dialog';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css']
})
export class OverviewTableComponent implements OnInit {
  
  @Input() employee;

  cplEmployees: CplAndOvertime[];

  constructor(private dataService : RosterService,private customModal: ModalService) { }

  ngOnInit(): void {
    this.getListCplAndOvertime();
  }
  open(employee:any){
    this.customModal.showFeaturedDialog(SingleShiftDetailDialog, employee);
  }
  openOverView(){
    this.customModal.showFeaturedDialog(OvertimeAdjustmentDialog, "Red");
  }
  


  async getListCplAndOvertime(){
    const data = await (this.dataService.ListCplAndOvertime() as Promise<PromiseAble<APIType<CplAndOvertime>>>);
    if(Array.isArray(data.data.payload)){
      this.cplEmployees = data.data.payload;
    }
  }

}
