import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { EmployeeRosterDataService } from './../../services/data/employeeAttendance.data';
import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkWeekendComponent } from '../../components/mark-weekend/mark-weekend.component';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ModalService } from '../../services/modal/modal.service';
import { AdditionalShiftComponent } from '../additional-shift/additional-shift.component';
import { EmployeeShiftManagmentDialog } from '../employee-shift-managment/employee-shift-managment.dialog';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit, OnChanges {
  @Input() submitBtn : any;
  swipeShiftForm: FormGroup;
  shifts: Array<any> = [];
  employees: Array<any> = [];
  employeesDropdown : any=[];
  employeesName : any=[];
  swipeDropdown : any=[];
  assignedEmployeeShift : any;
  replaceWith: any;
  swipeDropdownValue: any;
  selectedEmployeeId: any;
  constructor(public activeModal: NgbActiveModal ,
    private customModal:ModalService, 
    private fb:FormBuilder, 
    private rosterService: RosterService,
    private shiftDataService: ShiftRequestDataService,
    private employeeroster: EmployeeRosterDataService,
    private shiftByDepartmentManager : ShiftRequestDataService,
    private appLocalStorage: AppLocalStorageService) { }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('submit value change' , this.submitBtn);

    const params = {
      "client_id" : this.appLocalStorage.getClientId(),
      "linemanager_id" : this.appLocalStorage.getUserId(),
      "shift_id" : this.swipeShiftForm.value.swipeShift,
      "employee_id" : this.swipeShiftForm.value.employee_id,
      "assigned_shift" : this.assignedShiftDefaultValue.name,
      "assigned_roster_date" : this.swipeShiftForm.value.assigned_roster_date,
      "replaceWithEmployeeId" : this.swipeShiftForm.value.replaceWithEmployeeId
    }

    console.log(params);
    
    this.submitBtn = false;
  }

  ngOnInit(): void {

    this.swipeShiftForm=this.fb.group({
      employee_id:[''],
      assigned_shift:[''],
      assigned_roster_date:[''],
      replaceWithEmployeeId:[''],
      swipeShift:['']
    })
    this.getDefaultList();
    this.getEmployeeList({
      "client_id" : 48,
      "username" : "waqas.nisar@people.com.pk",
      "dept_id" : 343,
      "department_id" : 16
  })
  }

  async getDefaultList() {
    const params = {
      client_id: this.appLocalStorage.getClientId(),
      line_manager_id: this.appLocalStorage.getUserId(),
    }
    const res = await this.shiftByDepartmentManager.getShiftByDepartmentManager(params);
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
      id : this.assignedEmployeeShift.id , 
      name : `${this.assignedEmployeeShift.shift_name} (${this.assignedEmployeeShift.actual_shift_time_in}-${this.assignedEmployeeShift.actual_shift_time_out})`
    });

    this.assignedShiftDefaultValue = {
      id : this.assignedEmployeeShift.id , 
      name : `${this.assignedEmployeeShift.shift_name} (${this.assignedEmployeeShift.actual_shift_time_in}-${this.assignedEmployeeShift.actual_shift_time_out})`
    };

  }

  selectionChanged($event){
    this.selectedEmployeeId = $event.value
    console.log('selected value' , $event);
    const params = {
      "screen_role" : "emp",
      "client_id" : 48,
      "employee_id" : $event.value,
      "custom_date" : "2022-07-18"
    }
    this.getAssignedShift(params , true);
  }

  replaceWithSelection($event){
    console.log($event.value)
    this.replaceWith = $event.value;

  }

  onSelectionSwipeDropdown($event){
    this.swipeDropdownValue = $event.value;
  }
}
