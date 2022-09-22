import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { ModalService } from '../../services/modal/modal.service';
import { AdditionalShiftComponent } from '../additional-shift/additional-shift.component';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal ,private customModal:ModalService ) { }

  ngOnInit(): void {
  }
  
}
