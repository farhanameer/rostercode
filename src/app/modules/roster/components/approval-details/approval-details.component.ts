import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css']
})
export class ApprovalDetailsComponent implements OnInit ,OnChanges {
  @Input() form;
  @Input() isUpdating : any;
  @Input() colors: any;
  hr_color :any;
  lm_color :any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('basically forms values',this.form.value);
    if(this.form.value.lm_request == 1){
      this.lm_color = this.colors['1'];
      this.form.get('lm_request').setValue('Requested');
    }
    if(this.form.value.hr_status == 0){
      this.form.get('hr_status').setValue('Pending');
      this.hr_color = this.colors['0'];
    }
    if(this.form.value.hr_status == 2){
      this.form.get('hr_status').setValue('Approved');
      this.hr_color = this.colors['2'];
      console.log('hr color ere' , this.hr_color)
    }
    if(this.form.value.hr_status == 3){
      this.form.get('hr_status').setValue('Disapproved');
      this.hr_color = this.colors['3'];
    }
    console.log('colors' , this.colors);
    
  }

  ngOnInit(): void {
    console.log('basically forms values',this.form.value);
  }

  

}
