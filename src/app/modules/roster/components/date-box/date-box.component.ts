import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-date-box',
  templateUrl: './date-box.component.html',
  styleUrls: ['./date-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateBoxComponent implements OnInit {

  @Input() form:FormGroup;
  @Input() control:string;
  @Input() label:string;
  @Input() width : string;
  @Input() height : string;
  @Input() hideLabel : Boolean = false;
  @Input() disabled : Boolean = false;

  @Output() dateChanged : EventEmitter<any> = new EventEmitter()
  

  constructor() { }

  ngOnInit(): void {
  }

  dateChange(date){
    const selectedDate = moment(date.value).format('YYYY-MM-DD')
    console.log('selected date' , selectedDate);
    this.dateChanged.emit(selectedDate);
  }
}
