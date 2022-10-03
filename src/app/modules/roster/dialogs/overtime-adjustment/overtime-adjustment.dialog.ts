import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal/modal.service';
import { OvertimeHoursAdjusmentDialog } from '../overtime-hours-adjusment/overtime-hours-adjusment.dialog';

@Component({
  selector: 'app-overtime-adjustment',
  templateUrl: './overtime-adjustment.dialog.html',
  styleUrls: ['./overtime-adjustment.dialog.css']
})
export class OvertimeAdjustmentDialog implements OnInit {

  constructor(private fb:FormBuilder,public activeModal: NgbActiveModal) { }
  @Input() modelData : any;
  ngOnInit(): void {
    console.log('employee Data',this.modelData);
  }

  overTimeForm=this.fb.group({
    overTime:["",Validators.required],
    givenHours:["",Validators.required],
    tillDate:["",Validators.required],
    adjustOvertimeIn:this.fb.group({
      addCPL:["",Validators.required],
      paymentForOvertime:["",Validators.required],
      cpl:["",Validators.required],
      payForHours:["",Validators.required]
    })
  })
  

  submit(){
    console.warn(this.overTimeForm.value)
  }


  get validateAForm(): any {
    return this.overTimeForm.controls
  }


}
