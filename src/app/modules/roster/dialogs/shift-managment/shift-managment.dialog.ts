import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal/modal.service';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';

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



  constructor(public activeModal: NgbActiveModal,
    private customModel:ModalService) { }

  ngOnInit(): void {
    console.log('shift management' , this.dates);
    if(this.dates.dateRagne.start == this.dates.dateRagne.end){
      this.single = true;
    }

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
}
