import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shift-request',
  templateUrl: './shift-request.component.html',
  styleUrls: ['./shift-request.component.css']
})
export class ShiftRequestComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  shiftRequestForm=this.fb.group({
    shiftType:["",Validators.required],
    shiftName:["",Validators.required],
    from:["",Validators.required],
    comments:["",Validators.required]
  })


  submit(form:FormGroup){
    console.warn(form)
  }

  get validateAForm(): any {
    return this.shiftRequestForm.controls
  }

}
