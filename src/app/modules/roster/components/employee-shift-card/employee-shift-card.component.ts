import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-shift-card',
  templateUrl: './employee-shift-card.component.html',
  styleUrls: ['./employee-shift-card.component.css']
})
export class EmployeeShiftCardComponent implements OnInit {

  @Input() data : any;
  @Output() itemDropped : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  drop(event){
    this.itemDropped.emit(event);
  }

}
