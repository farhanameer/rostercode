import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-morning-job-shift',
  templateUrl: './morning-job-shift.dialog.html',
  styleUrls: ['./morning-job-shift.dialog.scss']
})
export class MorningJobShiftDialog implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
