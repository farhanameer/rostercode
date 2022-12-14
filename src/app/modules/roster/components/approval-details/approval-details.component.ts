import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css']
})
export class ApprovalDetailsComponent implements OnInit {
  @Input() form;
  constructor() { }

  ngOnInit(): void {
    console.log('basically forms values',this.form.value);
  }

}
