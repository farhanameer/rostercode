import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LinkCheckerService } from '../../services/linkChecker.service';
import { ModalService } from '../../services/modal/modal.service';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';
import moment from 'moment';

@Component({
  selector: 'app-shift-managment',
  templateUrl: './shift-managment.dialog.html',
  styleUrls: ['./shift-managment.dialog.css']
})
export class ShiftManagmentDialog implements OnInit {

  @Input() dates: any;
  valueType : string  = 'date';
  view:string="date";
  single: boolean = false;
  searchedValue;
  shiftsArray = [];
  time_in_footer;
  time_out_footer;
  loopAbleShifts

  constructor(public activeModal: NgbActiveModal,
    private customModel:ModalService,
    public linkService : LinkCheckerService) { }

  ngOnInit(): void {
    
    console.log('shift management dialog' , this.dates);
    
    if(this.dates.dateRagne.start == this.dates.dateRagne.end){
      this.single = true;
    }
    this.shiftsArray = this.dates.dateRagne.shifts
    console.log(this.shiftsArray);

    // this.time_in_footer = moment(this.shiftsArray[0].plan_shift_time_in).format("hh:mm");;
    // this.time_out_footer = moment(this.shiftsArray[0].plan_shift_time_out).format("hh:mm");

    
    let mapArray = [];
    this.shiftsArray.forEach(element => {
      const obj = {
        id : element.id,
        name : element.name,
        time_in_footer : moment(element.plan_shift_time_in).format("hh:mm"),
        time_out_footer : moment(element.plan_shift_time_out).format("hh:mm")
      }
      mapArray.push(obj);
    });
    this.loopAbleShifts = mapArray;
    console.log("Loop Able Shifts", this.loopAbleShifts);

  }
  open(){
    console.log('data range to be passed down' , this.dates.dateRange);
    this.customModel.showFeaturedDialog(EmployeeShiftManagmentDialog, "" , this.dates);
    this.activeModal.close(ShiftManagmentDialog);
  }
// ********* radio button function
  radioChange(val:string){
    this.view=val;
  }
  search(event){
    console.log(event);
    this.searchedValue = event;
  }
}
