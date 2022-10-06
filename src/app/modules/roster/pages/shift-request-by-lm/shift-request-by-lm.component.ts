import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shift-request-by-lm',
  templateUrl: './shift-request-by-lm.component.html',
  styleUrls: ['./shift-request-by-lm.component.css']
})
export class ShiftRequestByLmComponent implements OnInit {
  shiftRequestLMform:FormGroup
  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
    this.shiftRequestLMform=this.fb.group({
      shift_id:["",Validators.required],
      shift_name:["",Validators.required],
      start_date:["",Validators.required],
      end_date:["",Validators.required],
      lm_comment:["",Validators.required]
      

    })
  }

  get validateAForm(): any {
    return this.shiftRequestLMform.controls
  }

  submit(){
    console.warn(this.shiftRequestLMform.value)
  }

}
