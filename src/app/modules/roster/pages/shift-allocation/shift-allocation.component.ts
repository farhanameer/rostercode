import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shift-allocation',
  templateUrl: './shift-allocation.component.html',
  styleUrls: ['./shift-allocation.component.css']
})
export class ShiftAllocationComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  shiftAllocationForm=this.fb.group({
    shiftName:["",Validators.required],
    shiftPeriodStartDate:["",Validators.required],
    shiftPeriodEndDate:["",Validators.required],
    setAsDefualt:["",Validators.required]
  })

  uploadForm=this.fb.group({
    attachment:["",Validators.required]
  })


  submit(){
    console.warn(this.shiftAllocationForm.value)
  }


  get validateAForm(): any {
    return this.shiftAllocationForm.controls
  }

  get validateForm(): any {
    return this.uploadForm.controls
  }


}
