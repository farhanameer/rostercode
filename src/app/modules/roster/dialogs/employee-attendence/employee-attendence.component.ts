import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-attendence',
  templateUrl: './employee-attendence.component.html',
  styleUrls: ['./employee-attendence.component.css']
})
export class EmployeeAttendenceComponent implements OnInit {

  constructor(private fb:FormBuilder,public activeModal: NgbActiveModal) { }
  shiftSetUpForm: FormGroup;
  ngOnInit(): void {
    // this.shiftSetUpForm = this.fb.group({
      
    //   color: ['', Validators.required],
    //   name: ['', Validators.required],
    //   time_in: ['', Validators.required],
    //   time_out: ['', Validators.required],
    // })

}
fileChange(e){

}
}