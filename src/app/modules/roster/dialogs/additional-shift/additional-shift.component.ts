import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { ModalService } from '../../services/modal/modal.service';
import { ChangeShiftComponent } from '../change-shift/change-shift.component';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';
import { ShiftManagmentDialog } from '../shift-managment/shift-managment.dialog';

@Component({
  selector: 'app-additional-shift',
  templateUrl: './additional-shift.component.html',
  styleUrls: ['./additional-shift.component.css']
})
export class AdditionalShiftComponent implements OnInit {
  view:string="shift";
  additionalShiftForm:FormGroup
  constructor(public activeModal: NgbActiveModal ,private customModal:ModalService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.additionalShiftForm=this.fb.group({
      additionalShift:['']
    })
  }
  
 
}
