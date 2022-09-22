import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forEachChild } from 'typescript';
import { RosterService } from '../../services/data/rosterView.data.service';

@Component({
  selector: 'app-sort-by-date',
  templateUrl: './sort-by-date.component.html',
  styleUrls: ['./sort-by-date.component.css']
})
export class SortByDateComponent implements OnInit {


  @Input() dates:any;

  data : any = [
   
  ]

  constructor(public activeModal: NgbActiveModal , private dataService: RosterService) { }

  ngOnInit(): void {

    console.log('in popup' , this.dates);
    this.getLMRosterView();
  }



  async getLMRosterView(){
    const data = await this.dataService.getLMRosterView({
      'start_date' : this.dates.start , 
      'end_date' : this.dates.end
    });
    
    if(!data["data"]["status"]){
      console.log('error a gya');
      return;
    }

    
    const response = data["data"]["payload"];
    const hash = {};
    const transformedData = [];

    response.forEach(singleData =>{
        let employeeArray = [];
        const obj = {
          date : singleData.date , 
          employees : []
        };

        singleData.shifts.forEach(singleShift =>{
          employeeArray = [...employeeArray , ...singleShift.employees];
        });

        obj.employees = employeeArray;
        this.data.push(obj);
    });

    console.log('loopAble Data' , this.data);
  }

}
