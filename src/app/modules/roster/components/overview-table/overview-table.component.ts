import { RosterService } from './../../services/data/rosterView.data.service';
import { CplAndOvertime } from './../../models/CplAndOvertime';
import { Component, OnInit } from '@angular/core';
import { PromiseAble } from '../../models/PromiseAble';
import { APIType } from '../../models/APIType';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css']
})
export class OverviewTableComponent implements OnInit {

  cplEmployees: CplAndOvertime[];

  constructor(private dataService : RosterService) { }

  ngOnInit(): void {
    this.getListCplAndOvertime();
  }


  async getListCplAndOvertime(){
    const data = await (this.dataService.ListCplAndOvertime() as Promise<PromiseAble<APIType<CplAndOvertime>>>);
    if(Array.isArray(data.data.payload)){
      this.cplEmployees = data.data.payload;
    }
  }

}
