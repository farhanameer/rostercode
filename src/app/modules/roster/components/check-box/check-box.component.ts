import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {
  @Input() label : string;
  @Input() form: FormGroup
  @Input() control: string
  constructor() { }

  ngOnInit(): void {
  }

}
