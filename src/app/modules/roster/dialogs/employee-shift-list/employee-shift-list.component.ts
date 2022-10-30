import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-shift-list',
  templateUrl: './employee-shift-list.component.html',
  styleUrls: ['./employee-shift-list.component.css']
})
export class EmployeeShiftListComponent implements OnInit {

  constructor(  public activeModal: NgbActiveModal) { }
  @Input() top:any;
  @Input() bottom : any;
  @Input() left : any;
  @Input() show:boolean = false;
  @Input() employees : any;
  @Input() date : any;
  
  @Output() close : EventEmitter<any> = new EventEmitter();

  
  ngOnInit(): void {
  }

  closeModal(){
    console.log('event closing');
    this.close.emit();
  }

}
