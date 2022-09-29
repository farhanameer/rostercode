import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      screen_role:["",Validators.required],
      client_id:["",Validators.required],
      color:["",Validators.required],
      name:["",Validators.required],
      time_in:["",Validators.required],
      time_out:["",Validators.required],
      mid_break_enable:["",Validators.required],
      mid_break_time_in:["",Validators.required],
      mid_break_time_out:["",Validators.required],
      ext_mid_break_day_id:["",Validators.required],
      ext_mid_break_time_in:["",Validators.required],
      ext_mid_break_time_out:["",Validators.required],
      consecutive_late:["",Validators.required],
      late_arrival_tolerance:["",Validators.required],
      attendance_tolerance:["",Validators.required],
      revert_shift_id:["",Validators.required],
      shift_revert_date_start:["",Validators.required],
      shift_revert_date_end:["",Validators.required],
      shift_type_id:["",Validators.required],
      glob_mkt_id:["",Validators.required],
      region_id:["",Validators.required],
      sub_region_id:["",Validators.required],
      country_id:["",Validators.required],
      state_id:["",Validators.required],
      city_id:["",Validators.required],
      branch_id:["",Validators.required],
      department_id:["",Validators.required],
      desg_id:["",Validators.required],
      emp_id:["",Validators.required],
      qrt_break:this.fb.array([])


    })
  }

  get qrt_break() : FormArray {
    return this.shiftSetUpForm.get("qrt_break") as FormArray
  }

  newqrtbreak(): FormGroup {
    return this.fb.group({
      qrt_break_title: ["",Validators.required],
      qrt_break_time_in: ["",Validators.required],
      qrt_break_time_out:["",Validators.required]
    })
  }

  get validateAForm(): any {
    return this.shiftSetUpForm.controls
  }

  submit(){
    console.warn(this.shiftSetUpForm.value)
  }

}
