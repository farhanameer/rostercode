import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-overtime-adjustment',
  templateUrl: './overtime-adjustment.dialog.html',
  styleUrls: ['./overtime-adjustment.dialog.css']
})
export class OvertimeAdjustmentDialog implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  overTimeForm=this.fb.group({
    overTime:["",Validators.required],
    tillDate:["",Validators.required],
    adjustOvertimeIn:this.fb.group({
      addCPL:["",Validators.required],
      paymentForOvertime:["",Validators.required],
      cpl:["",Validators.required],
      payForHours:["",Validators.required]
    })
  })


  submit(form:FormGroup){
    console.warn(form)
  }


  get validateAForm(): any {
    return this.overTimeForm.controls
  }


}
