import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { RosterService } from '../../services/data/rosterView.data.service';
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
  shifts: Array<any> = [];

  additionalShiftForm:FormGroup
  additionalHoursForm:FormGroup
  constructor(public activeModal: NgbActiveModal ,private customModal:ModalService, private fb: FormBuilder, private rosterService: RosterService) { }

  ngOnInit(): void {

    this.additionalShiftForm=this.fb.group({
      additionalShift:['']
    })

    this.getDefaultList({
      client_id:48,
      screen_role:'lm',
      glob_mkt_id:-1,
      region_id:-1,
      sub_region_id:-1,
      country_id:154,
      state_id:2723,
      city_id:-1,
      branch_id:-1,
      department_id:16,
      desg_id:-1,
      emp_id:-1,
    })

    this.additionalHoursForm=this.fb.group({
      additionalShiftHours:['']
    })
  }

  async getDefaultList(params) {
    const res = await this.rosterService.getDefaultList(params);
    this.shifts = res['data'].payload;
  }
  
 
}
