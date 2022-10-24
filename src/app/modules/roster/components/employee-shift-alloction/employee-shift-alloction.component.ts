import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-shift-alloction',
  templateUrl: './employee-shift-alloction.component.html',
  styleUrls: ['./employee-shift-alloction.component.css'],
})
export class EmployeeShiftAlloctionComponent implements OnInit , OnChanges{


  @Input() resetFilters : Boolean = false;
  reset : Boolean = false;

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
  ngOnChanges(changes: SimpleChanges): void {
    this.reset = this.resetFilters;
  }
  

  ngOnInit(): void {
  }
}
