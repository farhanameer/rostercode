import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal/modal.service';
import { AdditionalShiftComponent } from '../additional-shift/additional-shift.component';
import { ChangeShiftComponent } from '../change-shift/change-shift.component';

@Component({
  selector: 'app-employee-shift-managment',
  templateUrl: './employee-shift-managment.dialog.html',
  styleUrls: ['./employee-shift-managment.dialog.css']
})
export class EmployeeShiftManagmentDialog implements OnInit {

  constructor(public activeModal: NgbActiveModal ,private customModal:ModalService ) { }

  ngOnInit(): void {
  }
  openChangeShift() {
    this.customModal.showFeaturedDialog(ChangeShiftComponent, "");
this.activeModal.close(EmployeeShiftManagmentDialog)
  }
  openAdditionalShift(){
    this.customModal.showFeaturedDialog(AdditionalShiftComponent, "");
this.activeModal.close(EmployeeShiftManagmentDialog)
  }
}
