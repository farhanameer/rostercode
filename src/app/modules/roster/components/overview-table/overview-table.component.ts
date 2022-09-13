import { Component, OnInit } from '@angular/core';
import { SingleShiftDetailDialog } from '../../dialogs/single-shift-detail/single-shift-detail.dialog';
import { RosterCPLDataService } from '../../services/data/rosterCPL.data.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css']
})
export class OverviewTableComponent implements OnInit {

  cplEmployees: [];

  constructor(private dataService : RosterCPLDataService,private customModal: ModalService) { }

  ngOnInit(): void {
    this.getListCplAndOvertime();
  }
  open(){
    this.customModal.showFeaturedDialog(SingleShiftDetailDialog, "Red");
  }


  async getListCplAndOvertime(){
    const data = await this.dataService.ListCplAndOvertime();
    this.cplEmployees = data["data"]["payload"];

    
    console.log('data from backend', this.cplEmployees);
  }

}
