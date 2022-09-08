import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-roster-cpl',
  templateUrl: './roster-cpl.component.html',
  styleUrls: ['./roster-cpl.component.css']
})
export class RosterCplComponent implements OnInit {

  @Input() shifts = {};

  constructor() { }

  ngOnInit(): void {
  }

  onClick(object){
    console.log(object);
    
  }

}
