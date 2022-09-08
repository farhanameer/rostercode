import { Component, OnInit } from '@angular/core';
import { RosterCPLDataService } from '../../services/data/rosterCPL.data.service';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css']
})
export class OverviewTableComponent implements OnInit {

  cplEmployees: [];

  constructor(private dataService : RosterCPLDataService) { }

  ngOnInit(): void {
    this.getListCplAndOvertime();
  }


  async getListCplAndOvertime(){
    const data = await this.dataService.ListCplAndOvertime();
    this.cplEmployees = data["data"]["payload"];

    
    console.log('data from backend', this.cplEmployees);
  }

}
