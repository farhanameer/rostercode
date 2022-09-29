import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit, OnChanges {
  @Input() form:FormGroup;
  @Input() control:string;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.form)
  }


  get controlErrors(){
    return this.form?.get(this.control).errors;
  }

  ngOnInit(): void {
  }

}
