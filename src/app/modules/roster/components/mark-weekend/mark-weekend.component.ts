import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-weekend',
  templateUrl: './mark-weekend.component.html',
  styleUrls: ['./mark-weekend.component.css']
})
export class MarkWeekendComponent implements OnInit {
  view:string="date";
  valueType:string="date";
@Input() modelData:any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('modelData', this.modelData);
  }
  radioChange(val:string){
    this.view=val
  }
}
