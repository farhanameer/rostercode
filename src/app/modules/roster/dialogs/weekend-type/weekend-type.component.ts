import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RosterService as RosterViewService} from '../../services/data/rosterView.data.service';
import { RosterService } from '../../services/data/roster.dataService';

@Component({
  selector: 'app-weekend-type',
  templateUrl: './weekend-type.component.html',
  styleUrls: ['./weekend-type.component.scss']
})
export class WeekendTypeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal , 
    private dataService : RosterService,
    private appLocalStorage: AppLocalStorageService,
    private rosterViewDataService: RosterViewService) { }
  
  weekendTypes :any = [];
  roster_id : any;
  markWeekendBody = {};
  @Input() modelData : any;
  isSelected: boolean = false;
  ngOnInit(): void {
    this.getWeekendTypes();
    console.log('employee Data' , this.modelData);
    this.roster_id = this.modelData.rosterIds;
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
    this.isSelected = true;
    console.log('weekend Type' , value);
    this.postMArkWeekend(value);
  }
  async postMArkWeekend(value){
    this.markWeekendBody = {
      roster_id : this.roster_id,
      client_id : this.appLocalStorage.getClientId(),
      leave_type : value.value,
      linemanager_id : await this.appLocalStorage.getLineManagerId()
    }
  }

  async onSubmit(){
    const res = await this.rosterViewDataService.markWeekend(this.markWeekendBody);
    if(res['status']==true){
      this.activeModal.close('Close click')
    }
  }

}
