import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventForm:FormGroup
  constructor(public activeModal: NgbActiveModal, private fb:FormBuilder){}

  ngOnInit(): void {

    this.eventForm=this.fb.group({
      name:["",Validators.required],
      fromDate:["",Validators.required],
      toDate:["",Validators.required]
    })
  }
 


  get validateAForm(): any {
    return this.eventForm.controls
  }

  submit(){
    console.warn(this.eventForm.value)

  }

 

}
