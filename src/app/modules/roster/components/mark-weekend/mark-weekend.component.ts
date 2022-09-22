import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-weekend',
  templateUrl: './mark-weekend.component.html',
  styleUrls: ['./mark-weekend.component.css']
})
export class MarkWeekendComponent implements OnInit {
  view:string="default";
default:string;
date:string;
employee:string;
change:string;
additional:string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
