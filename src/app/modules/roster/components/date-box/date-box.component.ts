import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-box',
  templateUrl: './date-box.component.html',
  styleUrls: ['./date-box.component.css']
})
export class DateBoxComponent implements OnInit {

  @Input() form:FormGroup;
  @Input() control:string;
  @Input() label:string;

  constructor() { }

  ngOnInit(): void {
  }

}
