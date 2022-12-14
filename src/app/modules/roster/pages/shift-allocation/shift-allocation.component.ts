import { SearchService } from './../../services/data/searchService.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShiftRequestDataService } from '../../services/data/shiftRequest.data';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { RosterService } from '../../services/data/rosterView.data.service';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { ShiftAllocationDataService } from '../../services/data/shiftAllocation.data.service';
import moment from 'moment';

@Component({
  selector: 'app-shift-allocation',
  templateUrl: './shift-allocation.component.html',
  styleUrls: ['./shift-allocation.component.css']
})
export class ShiftAllocationComponent implements OnInit {

  constructor(private fb:FormBuilder , private shiftRequestService : ShiftRequestDataService , 
    private rosterViewService : RosterService , private appLocalStorage : AppLocalStorageService , 
    private shiftAllocationService : ShiftAllocationDataService,
    private searchService : SearchService) { }

  searchedValue: any;
  reset = false;
  filters : any = {
    glob_mkt_id : -1 , 
    region_id : -1,
    sub_region_id : -1,
    country_id : -1,
    state_id : -1,
    city_id : -1,
    branch_id : -1
  };
  ngOnInit(): void {
    this.getShifts();
    this.getEmployees();
  }

  shiftsArray=[];
  filtersChanged(selectedFilters){
    console.log('in shift allocation screen',selectedFilters);
    this.filters.glob_mkt_id = selectedFilters.marketId;
    this.filters.region_id = selectedFilters.clusterId;
    this.filters.sub_region_id = selectedFilters.subClusterId;
    this.filters.country_id = selectedFilters.countryId;
    this.filters.state_id = selectedFilters.stateId;
    this.filters.city_id = selectedFilters.cityId;
    this.filters.branch_id = selectedFilters.branchId;
    this.getShifts();
  }
  removeDefaultFiltersVallues(){
    let locationFilters = null;
    for (const key in this.filters) {
      if(this.filters[key]==-1){
        delete this.filters[key]
      }
    }
    if(Object.entries(this.filters).length == 0){
      return null;
    }
    locationFilters = {...this.filters};
    return locationFilters;
  }
  copiedShiftsArray = [];
  async getShifts(){

    const shifts = await this.shiftRequestService.getDefaultList('lm' , this.removeDefaultFiltersVallues());
    console.log('shift request being get' , shifts);

    if(!shifts["status"]) return; //posible error message
    if(!shifts["data"]["status"]) return; //posible error message
    this.shiftsArray = shifts["data"]["payload"];
    this.copiedShiftsArray = [...this.shiftsArray];
  }
  shiftSelected(shift){
    console.log('selected shift data in shift allocation',shift);
    let shifts = [];
    this.copiedShiftsArray.forEach(sh =>{
      if(sh.id == shift.value){
        shifts.push(sh);
      }
    });

    let creatShiftEmps = [];
    this.creatShiftEmployees.forEach(shi =>{
      if(shi.shift_id == shift.value){
        creatShiftEmps.push(shi);
      }
    });

    this.creatShiftEmployees = creatShiftEmps;
    console.log(this.creatShiftEmployees);
    this.shiftsArray = shifts;
    console.log(this.shiftsArray);
  }
  masterEmployees = [];
  async getEmployees(){
    const employee = await this.rosterViewService.getEmployeeList({
      client_id : this.appLocalStorage.getClientId(),
      dept_id : this.appLocalStorage.getUserId()
    });

    console.log('employees' , employee);
    if(!employee["status"]) return; //possible error;
    this.employees = employee["data"]["payload"];
    this.masterEmployees = [...this.employees];
  }
  creatShiftEmployees:any = [];
  shiftAllocationForm=this.fb.group({
    shift_id:[""],
    start_date:["",Validators.required],
    end_date:["",Validators.required],
    set_default:[false,Validators.required]
  })

  uploadForm=this.fb.group({
    attachment:["",Validators.required]
  })


  async submit(){
    const body = this.shiftAllocationForm.value;
    delete body.shift_id;
    console.log(body);
    if(body.set_default) {
      body.set_default = 1;
    }else{
      body.set_default = 0;
    }
    body.start_date = moment(body.start_date).format('YYYY-MM-DD');
    body.end_date = moment(body.end_date).format('YYYY-MM-DD');
    body.shifts = this.creatShiftEmployees;
    const result = await this.shiftAllocationService.createShift(body);
    if(!result["status"]){
      return;
    }
    this.resetForm();
  }


  resetForm() {
    console.log('form Cleared');
    this.shiftAllocationForm.markAsPristine();
    this.shiftAllocationForm.markAsUntouched();
    this.shiftAllocationForm.reset();
    console.log(this.shiftAllocationForm.value);
    this.resetDropDown();
    this.reset = !this.reset;
  }

  resetDropDown() {
    this.shiftsArray = [];
    setTimeout(() => {
      this.shiftsArray = this.copiedShiftsArray;
    }, 200);
  }

  get validateAForm(): any {
    return this.shiftAllocationForm.controls
  }

  get validateForm(): any {
    return this.uploadForm.controls
  }
  drop(event){
    console.log('event',event.previousContainer.data);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
    }
    this.employees = [...this.masterEmployees];
    
  }
  employees = [
    
  ]

  searchAndDeleteIfExists(array , searchValue , key){
    let newArray = [];
    array.forEach(emp =>{
      if(emp[key] != searchValue){
        newArray.push(emp)
      }
    });
    return newArray;
  }
  employeeChange(data){
    this.employees = [...this.masterEmployees];
    console.log('data after being changed' , data);
    console.log('before removal',this.creatShiftEmployees);
    this.creatShiftEmployees = this.searchAndDeleteIfExists(this.creatShiftEmployees , data.shift_id , 'shift_id');
    console.log('after removal of shift if possible',this.creatShiftEmployees);
    data.shift_allocation_emp_list.forEach(emp =>{
      this.creatShiftEmployees.forEach(singleEmployee =>{
        singleEmployee.shift_allocation_emp_list = this.searchAndDeleteIfExists(singleEmployee.shift_allocation_emp_list , emp.emp_id , 'emp_id');
      });
    });
    this.creatShiftEmployees.push(data);

    console.log('data after a long time',this.creatShiftEmployees);
    

  }
  search(value){
    console.log('searching values' , value);
    const res = this.searchService.search(this.masterEmployees, value, 'name');
    this.employees = res['searchedArray']; 
    if(this.employees.length==0 && value == ''){
      this.employees = this.masterEmployees;
    }
  }
}
