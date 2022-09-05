import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-overtime-hours-adjusment',
  templateUrl: './overtime-hours-adjusment.dialog.html',
  styleUrls: ['./overtime-hours-adjusment.dialog.css']
})
export class OvertimeHoursAdjusmentDialog implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  overTimeHoursAdjustment=this.fb.group({
    overtimeHours:["",Validators.required],
    approvedHours:["",Validators.required],
    comments:["",Validators.required]
  })

  submit(form:FormGroup){
    console.warn(form)
  }

  get validateAForm(): any {
    return this.overTimeHoursAdjustment.controls
  }

}
