import { forEachChild } from 'typescript';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { EmployeeRosterDataService } from './../../services/data/employeeAttendance.data';
import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ModalService } from '../../services/modal/modal.service';
import { ChangeShiftComponent } from '../change-shift/change-shift.component';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';
import { ShiftManagmentDialog } from '../shift-managment/shift-managment.dialog';

@Component({
  selector: 'app-additional-shift',
  templateUrl: './additional-shift.component.html',
  styleUrls: ['./additional-shift.component.css']
})
export class AdditionalShiftComponent implements OnInit, OnChanges {
  @Input() additionalShifts : any;
  @Input() modelData:any;
  valueType:string="shift";
  view:string="shift";
  shifts: Array<any> = [];
  employeesDropdown : any=[];
  employeesName : any=[];
  assignedEmployeeShift : any;
  selectedEmployeeId: any;
  screenRole = 'lm';
  additionalShiftForm:FormGroup
  additionalHoursForm:FormGroup
  constructor(public activeModal: NgbActiveModal ,
    private customModal:ModalService, 
    private fb: FormBuilder, 
    private shiftRequestDataService: ShiftRequestDataService,
    private rosterService: RosterService,
    private employeeroster: EmployeeRosterDataService,
    private appLocalStorage : AppLocalStorageService) { }

  ngOnInit(): void {
    console.log('modelData', this.modelData);
    this.additionalShiftForm=this.fb.group({
      additionalShift:[''],
      employee_id:[''],
      additional_shift_id:[null]
    })

    this.getDefaultEmployeesAndShifts(this.modelData);
    // this.getDefaultList();
  //   this.getEmployeeList({
  //     "client_id" : this.appLocalStorage.getClientId(),
  //     "dept_id" : this.appLocalStorage.getUserId(),
  // });
    

    this.additionalHoursForm=this.fb.group({
      additionalShiftHours:[null]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.additionalShifts==true){
      console.log('submit value change' , this.additionalShifts);

      const body = {
        "client_id" : this.appLocalStorage.getClientId(),
        "linemanager_id" : this.appLocalStorage.getUserId(),
        "shift_id" : this.assignedShiftDefaultValue.id,
        "employee_id" : this.additionalShiftForm.value.employee_id,
        "rosterDate" : this.assignedEmployeeShift.start,
        "additional_shift_id" : null || this.additionalShiftForm.value.additionalShift, 
        "additionalHours" : null || this.additionalHoursForm.value.additionalShiftHours
      }
      
      if(body.additional_shift_id){
        delete body.additionalHours
      } else if(!body.additional_shift_id){
        delete body.additional_shift_id
      }
      console.log("THESE ARE THE PARAMS",body);
      this.assignShift(body);

      this.additionalShifts = false;
    }
    
  }
  employees = [];
  
  getDefaultEmployeesAndShifts(modelData){
    this.employees = this.modelData.dateRagne.employees;
    const shifts = this.modelData.dateRagne.shifts;
    const employeesArray = [];
    const shiftsArray = [];
    this.employees.forEach(employee => {
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
    this.shifts = [];
    this.shifts = shiftsArray;
  }

  async assignShift(body){
    const res = await this.rosterService.assignAddtionalShift(body);
  }

  async getDefaultList() {
    const res = await this.shiftRequestDataService.getDefaultList(this.screenRole);
    this.shifts = res['data'].payload;
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
    console.log('selected value' , $event);
    const employees = this.modelData.dateRagne.employees;
    const getShifts = this.modelData.dateRagne.shifts;
    console.log("Get Shifts", getShifts);
    const shiftsArray = [];
    let foundEmployee;
    employees.forEach(employee =>{ 
      
        if(employee.emp_id == $event.value){
          foundEmployee = employee;
          this.employeesName = [
            {
              id : employee.shift_id,
              name : employee.shift_name
            }
          ];
          this.assignedShiftDefaultValue = {
            id : employee.shift_id,
            name : employee.shift_name
          }
          return;
        }
        
    });

    getShifts.forEach(s =>{
      if(s.id !=foundEmployee.shift_id){
        shiftsArray.push(s);
      }
    });
    console.log("Shifts Array", shiftsArray);
    this.shifts = [];
    setTimeout(() => {
      this.shifts = shiftsArray;
    }, 100);
    
    // shifts.forEach(shift=>{

    // })
    
    // const params = {
    //   "screen_role" : "emp",
    //   "client_id" : this.appLocalStorage.getClientId(),
    //   "employee_id" : $event.value,
    //   "custom_date" : this.modelData.dateRagne.start 
    // }
    // this.getAssignedShift(params , true);
  }
  // ***radio button function
 
  radioChange(val: string) {
    this.view = val;
  }
}
