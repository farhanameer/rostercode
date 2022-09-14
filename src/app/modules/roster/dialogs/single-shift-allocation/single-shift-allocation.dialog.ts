import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-shift-allocation',
  templateUrl: './single-shift-allocation.dialog.html',
  styleUrls: ['./single-shift-allocation.dialog.css']
})
export class SingleShiftAllocationDialog implements OnInit {

  @Input() data:any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
