import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-avaliable-shift',
  templateUrl: './avaliable-shift.dialog.html',
  styleUrls: ['./avaliable-shift.dialog.scss']
})
export class AvaliableShiftDialog implements OnInit {

  constructor( public activeModal: NgbActiveModal ) { }
  

  ngOnInit(): void {
  }

}
