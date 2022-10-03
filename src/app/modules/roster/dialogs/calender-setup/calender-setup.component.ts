import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calender-setup',
  templateUrl: './calender-setup.component.html',
  styleUrls: ['./calender-setup.component.css']
})
export class CalenderSetupComponent implements OnInit {
  workCalenderSetupForm:FormGroup
  constructor(private fb:FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.workCalenderSetupForm=this.fb.group({
      periodStartYear:["",Validators.required],
      periodEndYear:["",Validators.required],
      weekend:["",Validators.required],
      halfDay:["",Validators.required],
      from:["",Validators.required],
      to:["",Validators.required]


    })
  }

  get validateAForm(): any {
    return this.workCalenderSetupForm.controls
  }

  submit(){
    console.warn(this.workCalenderSetupForm.value)
  }

}
