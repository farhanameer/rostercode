import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-shift-list',
  templateUrl: './employee-shift-list.component.html',
  styleUrls: ['./employee-shift-list.component.css']
})
export class EmployeeShiftListComponent implements OnInit {

  constructor(  public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
