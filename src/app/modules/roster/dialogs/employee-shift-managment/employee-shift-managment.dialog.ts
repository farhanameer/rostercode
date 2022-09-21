import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-shift-managment',
  templateUrl: './employee-shift-managment.dialog.html',
  styleUrls: ['./employee-shift-managment.dialog.css']
})
export class EmployeeShiftManagmentDialog implements OnInit {

  constructor(public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

}
