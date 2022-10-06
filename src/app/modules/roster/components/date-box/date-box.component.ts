import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  

  constructor() { }

  ngOnInit(): void {
  }
}
