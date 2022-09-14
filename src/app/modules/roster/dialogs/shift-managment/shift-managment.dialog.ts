import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shift-managment',
  templateUrl: './shift-managment.dialog.html',
  styleUrls: ['./shift-managment.dialog.css']
})
export class ShiftManagmentDialog implements OnInit {
display:boolean;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
 

}
