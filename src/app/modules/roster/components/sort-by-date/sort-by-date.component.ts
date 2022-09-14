import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort-by-date',
  templateUrl: './sort-by-date.component.html',
  styleUrls: ['./sort-by-date.component.css']
})
export class SortByDateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
