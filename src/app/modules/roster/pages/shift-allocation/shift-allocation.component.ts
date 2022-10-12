import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShiftRequestDataService } from '../../services/data/shiftRequest.data';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { RosterService } from '../../services/data/rosterView.data.service';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';

@Component({
  selector: 'app-shift-allocation',
  templateUrl: './shift-allocation.component.html',
  styleUrls: ['./shift-allocation.component.css']
})
export class ShiftAllocationComponent implements OnInit {

  constructor(private fb:FormBuilder , private shiftRequestService : ShiftRequestDataService , 
    private rosterViewService : RosterService , private appLocalStorage : AppLocalStorageService) { }

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
  }
  async getShifts(){
    const shifts = await this.shiftRequestService.getDefaultList('lm' , this.filters);
    console.log('shift request being get' , shifts);

    if(!shifts["status"]) return; //posible error message
    if(!shifts["data"]["status"]) return; //posible error message
    this.shiftsArray = shifts["data"]["payload"];
  }
  shiftSelected(shift){
    console.log('selected shift data in shift allocation',shift);
  }
  async getEmployees(){
    const employee = await this.rosterViewService.getEmployeeList({
      client_id : this.appLocalStorage.getClientId(),
      dept_id : this.appLocalStorage.getUserId()
    });

    console.log('employees' , employee);
    if(!employee["status"]) return; //possible error;
    this.employees = employee["data"]["payload"];
  }
  creatShiftEmployees:any = [];
  shiftAllocationForm=this.fb.group({
    shift_id:["",Validators.required],
    start_date:["",Validators.required],
    end_date:["",Validators.required],
    set_default:["",Validators.required]
  })

  uploadForm=this.fb.group({
    attachment:["",Validators.required]
  })


  submit(){
    console.warn(this.shiftAllocationForm.value)
  }


  get validateAForm(): any {
    return this.shiftAllocationForm.controls
  }

  get validateForm(): any {
    return this.uploadForm.controls
  }
  drop(event){
    console.log(event.previousContainer.data);

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
}
