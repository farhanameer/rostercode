import { SearchService } from './../../services/data/searchService.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-shift-list',
  templateUrl: './employee-shift-list.component.html',
  styleUrls: ['./employee-shift-list.component.css']
})
export class EmployeeShiftListComponent implements OnInit, OnChanges {

  constructor(  public activeModal: NgbActiveModal,private searchService: SearchService) { }
  
  @Input() top:any;
  @Input() bottom : any;
  @Input() left : any;
  @Input() show:boolean = false;
  @Input() employees : any;
  @Input() date : any;
  @Input() color : any;
  searchedValue;
  masterArray = [];
  
  @Output() close : EventEmitter<any> = new EventEmitter();

  
  ngOnInit(): void {
    console.log("Employees",this.employees);
    this.masterArray = [...this.employees];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Employees",this.employees);
    console.log("Master Array",this.masterArray);
    this.masterArray = [...this.employees];
  }

  closeModal(){
    console.log('event closing');
    this.close.emit();
  }

  search(event: any){
    console.log(event);

    const result = this.searchService.search(this.masterArray, event, 'emp_name');



      if(result.searchedArray.length == 0 && event == ''){
        this.employees = [...this.masterArray];
        return;
      }

      this.employees = result.searchedArray;
  }

}
