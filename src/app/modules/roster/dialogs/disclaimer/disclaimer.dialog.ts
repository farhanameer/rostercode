import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.dialog.html',
  styleUrls: ['./disclaimer.dialog.scss']
})
export class DisclaimerDialog implements OnInit {

  constructor(  public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  disableSubmit : boolean = false;
  acceptance(event){
    console.log(event);
    this.disableSubmit = event;
  }
  doNotShowDialouge(event){
    console.log(event);
  }

}
