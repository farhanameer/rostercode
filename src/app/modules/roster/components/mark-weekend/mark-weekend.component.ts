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
single: boolean = false;
searchedValue: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('modelData', this.modelData);
    if(this.modelData.dateRagne.start == this.modelData.dateRagne.end){
      this.single = true;
    }
  }
  radioChange(val:string){
    this.view=val
  }
  search(event){
    console.log(event);
    this.searchedValue = event;
  }
}
