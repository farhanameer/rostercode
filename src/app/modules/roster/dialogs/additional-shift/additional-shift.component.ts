import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal/modal.service';
import { ChangeShiftComponent } from '../change-shift/change-shift.component';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';

@Component({
  selector: 'app-additional-shift',
  templateUrl: './additional-shift.component.html',
  styleUrls: ['./additional-shift.component.css']
})
export class AdditionalShiftComponent implements OnInit {

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
