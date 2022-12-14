import { SearchService } from './../../services/data/searchService.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-morning-job-shift',
  templateUrl: './morning-job-shift.dialog.html',
  styleUrls: ['./morning-job-shift.dialog.scss']
})
export class MorningJobShiftDialog implements OnInit {

  constructor(public activeModal: NgbActiveModal, private searchService : SearchService) { }
  @Input() modelData : any;
  masterEmployees = [];
  ngOnInit(): void {
    console.log("Model Data",this.modelData);
    this.masterEmployees = [...this.modelData.employees];
  }
  
  search(value){
    console.log('searching values' , value);
    const res = this.searchService.search(this.masterEmployees, value, 'name');
    this.modelData.employees = res['searchedArray']; 
    if(this.modelData.employees.length==0 && value == ''){
      this.modelData.employees = this.masterEmployees;
    }   
  }
}

