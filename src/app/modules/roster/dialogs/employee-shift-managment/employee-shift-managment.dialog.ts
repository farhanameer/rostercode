import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { ModalService } from '../../services/modal/modal.service';
import { AdditionalShiftComponent } from '../additional-shift/additional-shift.component';
import { ChangeShiftComponent } from '../change-shift/change-shift.component';

@Component({
  selector: 'app-employee-shift-managment',
  templateUrl: './employee-shift-managment.dialog.html',
  styleUrls: ['./employee-shift-managment.dialog.css']
})
export class EmployeeShiftManagmentDialog implements OnInit {

@Input() modelData : any;
valueType:string="weekend";
view:string="weekend";
// change:string;
// additional:string;
// weekend:string;
submitted : boolean = false;
single: boolean = false;
shiftsArray = [];

  constructor(public activeModal: NgbActiveModal ,private customModal:ModalService ) { }

  ngOnInit(): void {
    console.log('model Data we got' , this.modelData);
    if(this.modelData.dateRagne.start == this.modelData.dateRagne.end){
      this.single = false;
    }
    this.shiftsArray = this.modelData.dateRagne.shifts;
  }

  openChangeShift() {
    this.customModal.showFeaturedDialog(ChangeShiftComponent, "");
    this.activeModal.close(EmployeeShiftManagmentDialog)
  }
  openAdditionalShift(){
    this.customModal.showFeaturedDialog(AdditionalShiftComponent, "");
    this.activeModal.close(EmployeeShiftManagmentDialog)
  }
  openMark(){
    this.customModal.showFeaturedDialog(EmployeeShiftManagmentDialog, "");
  }
  submit(){
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 200);
  }

 

radioChange(val: string) {
    this.view = val;
  }


}
