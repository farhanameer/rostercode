import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent implements OnInit {
  @Input() isdisabled: boolean;
  @Input() form: FormGroup;
  @Input() control: string;
  @Input() label: string;
  @Input() width: string;
  @Input() type: string;
  @Input() height : string;
  @Input() hideLabel : Boolean = false;
  @Input() placeHolder : string = ' '
  @Output() inputChanged : EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log('disabled value ' , this.isdisabled);
  }
  inputChange(event){
    this.inputChanged.emit(event.target.value);
  }
}
