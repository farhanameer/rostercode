import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-overtime-hours-adjusment',
  templateUrl: './overtime-hours-adjusment.dialog.html',
  styleUrls: ['./overtime-hours-adjusment.dialog.css']
})
export class OvertimeHoursAdjusmentDialog implements OnInit {

  constructor(private fb:FormBuilder,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  overTimeHoursAdjustmentForm=this.fb.group({
    hours:["",Validators.required],
    toApproveHours:["",Validators.required],
    note:["",Validators.required]
  })

  submit(form:FormGroup){
    console.warn(form)
  }

  get validateAForm(): any {
    return this.overTimeHoursAdjustmentForm.controls
  }

}
