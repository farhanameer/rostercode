import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { EmployeeRosterDataService } from './../../services/data/employeeAttendance.data';
import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ModalService } from '../../services/modal/modal.service';
import { AdditionalShiftComponent } from '../additional-shift/additional-shift.component';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';
import { tick } from '@angular/core/testing';
import moment from 'moment';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit, OnChanges {
  @Input() submitBtn : any;
  @Input() modelData:any;
  swipeShiftForm: FormGroup;
  shifts: Array<any> = [];
  employees: Array<any> = [];
  employeesDropdown : any=[];
  replaceWithDropdown: any = [];
  employeesName : any=[];
  swipeDropdown : any=[];
  assignedEmployeeShift : any;
  replaceWith: any;
  swipeDropdownValue: any;
  selectedEmployeeId: any;
  assignedRosterDate: any;
  customDate;
  constructor(public activeModal: NgbActiveModal ,
    private customModal:ModalService, 
    private fb:FormBuilder, 
    private rosterService: RosterService,
    private shiftDataService: ShiftRequestDataService,
    private employeeroster: EmployeeRosterDataService,
    private shiftByDepartmentManager : ShiftRequestDataService,
    private appLocalStorage: AppLocalStorageService,
    private shiftRequest: ShiftRequestDataService) { }
  
  
  ngOnChanges(changes: SimpleChanges): void {

    if(this.submitBtn == true){
      console.log('submit value change' , this.submitBtn);

      this.swipeShiftForm.value.assigned_roster_date = moment(this.swipeShiftForm.value.assigned_roster_date).format('YYYY-MM-DD');
      const body = {
        "client_id" : this.appLocalStorage.getClientId(),
        "linemanager_id" : this.appLocalStorage.getUserId(),
        "shift_id" : this.swipeShiftForm.value.swipeShift,
        "employee_id" : this.swipeShiftForm.value.employee_id,
        "assigned_shift" : this.assignedShiftDefaultValue.id,
        "assigned_roster_date" : this.assignedEmployeeShift.start,
        "replaceWithEmployeeId" : null || this.swipeShiftForm.value.replaceWithEmployeeId,
        "rosterDate": this.swipeShiftForm.value.assigned_roster_date
      }
          
      this.submitBtn = false;
      if(body.replaceWithEmployeeId){
        delete body.shift_id
      } else if(!body.replaceWithEmployeeId){
        delete body.replaceWithEmployeeId
      }
      console.log(body); 

      this.swapShift(body);
    }
    
  }

  ngOnInit(): void {
    console.log('modelData of Change Shift', this.modelData);


    this.customDate = this.modelData.dateRagne.start;
    this.swipeShiftForm=this.fb.group({
      employee_id:["",Validators.required],
      assigned_shift:["",Validators.required],
      assigned_roster_date:[this.modelData.dateRagne.start,Validators.required],
      replaceWithEmployeeId:[null],
      swipeShift:["",Validators.required]
    })
    // this.getDefaultList();
    this.getDefaultEmployeesAndShifts(this.modelData);
    
    
    
    
  //   this.getEmployeeList({
  //     "client_id" : this.appLocalStorage.getClientId(),
  //     "dept_id" : this.appLocalStorage.getUserId(),
  // })
  }

  getDefaultEmployeesAndShifts(modelData){
    const employees = this.modelData.dateRagne.employees;
    const shifts = this.modelData.dateRagne.shifts;
    
    const employeesArray = [];
    const shiftsArray = [];
    employees.forEach(employee => {
      employeesArray.push({
        id : employee.emp_id , 
        name : employee.emp_name
      });
    });
    console.log(employeesArray);
    this.employeesDropdown = employeesArray;
    shifts.forEach(shift => {
      shiftsArray.push({
        id : shift.id, 
        name : shift.name,
        color : shift.color
      });
    });
    console.log(shiftsArray);
    this.swipeDropdown = [];
    this.swipeDropdown = shiftsArray;
  }

  async swapShift(body){
    const res = await this.rosterService.swapShift(body);
    
  }
  screenRole = "lm";
  async getDefaultList() {
    const params = {
      client_id: this.appLocalStorage.getClientId(),
      line_manager_id: this.appLocalStorage.getUserId(),
    }
    const res = await this.shiftRequest.getDefaultList(this.screenRole);
    let swipeData = res['data'].payload;
    //this.shifts = res['data'].payload;

    if(!Array.isArray(swipeData)){
      console.log('error occured');
    }
    const swipeDataArray = [];
    swipeData.forEach(swipe =>{
      swipeDataArray.push({
        id : swipe.id , 
        name : swipe.name
      })
    });
    console.log(swipeDataArray);
    this.swipeDropdown = swipeDataArray;
  }
  async getEmployeeList(params) {
    const res = await this.rosterService.getEmployeeList(params);
    let employees = res['data'].payload;
    if(!Array.isArray(employees)){
      console.log('error occured');
    }
    const employeesArray = [];
    employees.forEach(employee =>{
      employeesArray.push({
        id : employee.emp_id , 
        name : employee.name
      })
    });
    console.log(employeesArray);
    this.employeesDropdown = employeesArray;

  }

  assignedShiftDefaultValue = {
    id: 0,
    name: ''
  };

  async getAssignedShift(params, replace){
    
    const res = await this.employeeroster.getEmployeeRoster(params, replace);
    this.assignedEmployeeShift = res['data']['payload']['data'][0];
    
    this.employeesName.push({
      id : this.assignedEmployeeShift.shift_id , 
      name : `${this.assignedEmployeeShift.shift_name} (${this.assignedEmployeeShift.actual_shift_time_in}-${this.assignedEmployeeShift.actual_shift_time_out})`
    });

    this.assignedShiftDefaultValue = {
      id : this.assignedEmployeeShift.shift_id , 
      name : `${this.assignedEmployeeShift.shift_name} (${this.assignedEmployeeShift.actual_shift_time_in}-${this.assignedEmployeeShift.actual_shift_time_out})`
    };

  }

  selectionChanged($event){
    this.selectedEmployeeId = $event.value
    console.log('selected value' , $event);
    
    const employees = this.modelData.dateRagne.employees;
    const shiftsArray = [];
    const replaceWithArray = [];

    employees.forEach(employee =>{    
      if(employee.emp_id == $event.value){
        const obj = {
          id : employee.shift_id,
          name : employee.shift_name
        }
        this.assignedShiftDefaultValue = {
          id : employee.shift_id,
          name : employee.shift_name
        }
        shiftsArray.push(obj);
        return;
      }

      replaceWithArray.push({
        id : employee.emp_id , 
        name : employee.emp_name
      });
    });
    this.employeesName = shiftsArray;

    if(this.modelData.dateRagne.start != this.customDate){
      return;
    }
    this.replaceWithDropdown = [];
    setTimeout(() => {
      this.replaceWithDropdown = replaceWithArray;
    }, 100);

    
    const params = {
      "screen_role" : "emp",
      "client_id" : this.appLocalStorage.getClientId(),
      "employee_id" : $event.value,
      "custom_date" : this.modelData.dateRagne.start 
    }
    // this.getAssignedShift(params , true);
  }

  async dateChanged(event){
    this.customDate = event;
    console.log(event);
    const body = {
      client_id : this.appLocalStorage.getClientId(),
      reporting_to_id : this.appLocalStorage.getUserId(),
      custom_date : event
    }
    const res = await this.rosterService.getLMRosterView(body);
    console.log("Response",res);
    const payload = res["data"]["payload"];
    
    let replaceWithArray = [];
    let shiftDataArray = [];
    payload.forEach(entry => {
      replaceWithArray.push({
        id : entry.id,
        name : entry.emp_name
      });
      shiftDataArray.push({
        id : entry.shift_id,
        name : entry.shift_name,
        color : entry.shift_color
      });
    });
    this.replaceWithDropdown = [];
    
    this.swipeDropdown = [];
    // this.replaceWithDropdown = replaceWithArray;
    setTimeout(() => {
      this.replaceWithDropdown = replaceWithArray;
      if(this.customDate == this.modelData.dateRagne.start){
        this.getDefaultEmployeesAndShifts(this.modelData);
        return;
      }
      this.swipeDropdown = shiftDataArray;
    }, 100);
  }

  get validateAForm(): any {
    return this.swipeShiftForm.controls;
  }
  submit(){
    console.warn(this.swipeShiftForm.value)
  }


}
