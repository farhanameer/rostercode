import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['./time-box.component.scss']
})
export class TimeBoxComponent implements OnInit {
  @Input() color:string
  @Input() label : any;
  @Input() form:FormGroup;
  @Input() control:string;
  @Input() disabled : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
