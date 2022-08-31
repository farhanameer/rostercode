import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    overTime:[''],
    tillDate:[''],
    adjustOvertimeIn:this.fb.group({
      addCPL:[''],
      paymentForOvertime:[''],
      cpl:[''],
      payForHours:['']
    })
  })


  submit(form:FormGroup){
    console.warn(form)
  }


  get validateAForm(): any {
    return this.overTimeForm.controls
  }


}
