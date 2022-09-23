import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weekend-type',
  templateUrl: './weekend-type.component.html',
  styleUrls: ['./weekend-type.component.css']
})
export class WeekendTypeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
