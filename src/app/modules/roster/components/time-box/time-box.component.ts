import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['./time-box.component.scss']
})
export class TimeBoxComponent implements OnInit {

  @Input() label : any;

  constructor() { }

  ngOnInit(): void {
  }

}
