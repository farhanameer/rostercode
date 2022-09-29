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

  display:boolean;



  constructor(public activeModal: NgbActiveModal,
    private customModel:ModalService) { }

  ngOnInit(): void {
    console.log('data was first got' , this.dates);
  }
  open(){
    this.customModel.showFeaturedDialog(EmployeeShiftManagmentDialog, "");
    this.activeModal.close(ShiftManagmentDialog);
  }

}
