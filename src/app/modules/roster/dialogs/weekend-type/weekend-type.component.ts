import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RosterService } from '../../services/data/roster.dataService';

@Component({
  selector: 'app-weekend-type',
  templateUrl: './weekend-type.component.html',
  styleUrls: ['./weekend-type.component.scss']
})
export class WeekendTypeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal , 
    private dataService : RosterService) { }
  
  weekendTypes :any = [];
  @Input() modelData : any;
  ngOnInit(): void {
    this.getWeekendTypes();
    console.log('employee Data' , this.modelData);
  }
  async getWeekendTypes(){
    const result = await this.dataService.getLeaveTypes();
    console.log('result',result);
    console.log('result payload',result["data"]["payload"]);
    this.weekendTypes = result["data"]["payload"] || [];
    const array = [];
    this.weekendTypes.forEach(type =>{
      array.push({
        id : type , 
        name : type
      })
    });
    this.weekendTypes = array;
  }
  leaveTypeSelection(value){
    console.log('weekend Type' , value);
  }

}
