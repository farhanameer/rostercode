import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shift-setup',
  templateUrl: './shift-setup.component.html',
  styleUrls: ['./shift-setup.component.css']
})
export class ShiftSetupComponent implements OnInit {
  shiftSetUpForm:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.shiftSetUpForm=this.fb.group({
      screen_role:[""],
      client_id:[""],
      color:[""],
      name:[""],
      time_in:[""],
      time_out:[""],
      mid_break_enable:[""],
      mid_break_time_in:[""],
      mid_break_time_out:[""],
      ext_mid_break_day_id:[""],
      ext_mid_break_time_in:[""],
      ext_mid_break_time_out:[""],
      consecutive_late:[""],
      late_arrival_tolerance:[""],
      attendance_tolerance:[""],
      revert_shift_id:[""],
      shift_revert_date_start:[""],
      shift_revert_date_end:[""],
      shift_type_id:[""]


    })
  }

}
