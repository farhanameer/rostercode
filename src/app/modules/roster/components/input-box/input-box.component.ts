import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {

  @Input() form:FormGroup;
  @Input() control:string;
  @Input() label:string;
  @Input() width:string;

  constructor() { }

  ngOnInit(): void {
  }

}
