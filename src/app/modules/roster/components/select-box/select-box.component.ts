import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectBoxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: Array<any> = [];
  @Input() label: string;
  @Input() control: string;
  @Input() disabled: boolean;
  @Input() isLoaded: boolean;

  @Output() onResetDropDown = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() onClick = new EventEmitter();

  locData = {};
  searchedFilter:string = '';

  constructor() {}

  ngOnInit(): void {
    // this.form.get(this.control).setValue(-1);
  }

  ngOnChanges(change: SimpleChange) {
    console.log(this.data);
  }

  get validation() {
    return this.form.controls;
  }
  onRestrictSpace(event) {
    this.searchedFilter = this.locData['name'];
    this.getSelectData();
  }
  getSelectData() {
    console.log('getSelectData');
    
    this.onResetDropDown.emit();
    this.selectionChange.emit();
  }

  onClickSelect() {
    this.onClick.emit();
  }

}
