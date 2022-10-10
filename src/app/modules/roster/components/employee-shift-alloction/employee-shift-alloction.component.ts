import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-shift-alloction',
  templateUrl: './employee-shift-alloction.component.html',
  styleUrls: ['./employee-shift-alloction.component.css'],
})
export class EmployeeShiftAlloctionComponent implements OnInit {

  
  @Input() form: FormGroup;
  @Input() shifts : any;
  @Output() filterSelection : EventEmitter<any> = new EventEmitter();
  @Output() selectedShift : EventEmitter<any> = new EventEmitter();
  filtersChanged(filters){
    this.filterSelection.emit(filters)
  }

  shiftSelection(shift){
    this.selectedShift.emit(shift);
  }
  constructor() {}
  

  ngOnInit(): void {}
}
