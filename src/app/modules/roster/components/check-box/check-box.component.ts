import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent implements OnInit {
  @Input() label: string;
  @Input() form: FormGroup;
  @Input() control: string;
  @Input() color: string;
  @Input() checked: Boolean = false;
  @Output() selectionChanged = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    console.log('checkboxform', this.form);
    console.log('checkboxcontrol', this.control);
  }

  selectionChange(checkedValue) {
    this.form?.get(this.control).setValue(checkedValue.checked);
    this.selectionChanged.emit(checkedValue.checked);
    console.log(checkedValue.checked);
  }
}
