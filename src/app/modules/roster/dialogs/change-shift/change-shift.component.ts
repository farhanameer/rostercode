import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ModalService } from '../../services/modal/modal.service';
import { AdditionalShiftComponent } from '../additional-shift/additional-shift.component';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit {
  swipeShiftForm: FormGroup;
  shifts: Array<any> = [];
  employees: Array<any> = [];
  constructor(public activeModal: NgbActiveModal ,
    private customModal:ModalService, 
    private fb:FormBuilder, 
    private rosterService: RosterService,
    private shiftDataService: ShiftRequestDataService) { }

  ngOnInit(): void {

    this.swipeShiftForm=this.fb.group({
      employee_id:[''],
      assigned_shift:[''],
      assigned_roster_date:[''],
      replaceWithEmployeeId:[''],
      swipeShift:['']
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
    this.getEmployeeList({
      "client_id" : 48,
      "username" : "waqas.nisar@people.com.pk",
      "dept_id" : 343,
      "department_id" : 16
  })
  }

  async getDefaultList(params) {
    const res = await this.shiftDataService.getDefaultList(params);
    this.shifts = res['data'].payload;
  }
  async getEmployeeList(params) {
    const res = await this.rosterService.getEmployeeList(params);
    this.employees = res['data'].payload;
  }
}
