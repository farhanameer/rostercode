import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort-by-employee',
  templateUrl: './sort-by-employee.component.html',
  styleUrls: ['./sort-by-employee.component.css']
})
export class SortByEmployeeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
