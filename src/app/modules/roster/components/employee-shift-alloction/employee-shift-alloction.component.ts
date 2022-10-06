import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-shift-alloction',
  templateUrl: './employee-shift-alloction.component.html',
  styleUrls: ['./employee-shift-alloction.component.css'],
})
export class EmployeeShiftAlloctionComponent implements OnInit {
  constructor() {}
  @Input() form : any;
  ngOnInit(): void {}
}
