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
  employeesName : any=[];
  swipeDropdown : any=[];
  assignedEmployeeShift : any;
  replaceWith: any;
  swipeDropdownValue: any;
  selectedEmployeeId: any;
  assignedRosterDate: any;
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
    console.log('modelData', this.modelData);
    this.swipeShiftForm=this.fb.group({
      employee_id:["",Validators.required],
      assigned_shift:["",Validators.required],
      assigned_roster_date:["",Validators.required],
      replaceWithEmployeeId:[null],
      swipeShift:["",Validators.required]
    })
    this.getDefaultList();
    this.getEmployeeList({
      "client_id" : this.appLocalStorage.getClientId(),
      "dept_id" : this.appLocalStorage.getUserId(),
  })
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
    const params = {
      "screen_role" : "emp",
      "client_id" : this.appLocalStorage.getClientId(),
      "employee_id" : $event.value,
      "custom_date" : this.modelData.dateRagne.start 
    }
    this.getAssignedShift(params , true);
  }

  get validateAForm(): any {
    return this.swipeShiftForm.controls;
  }
  submit(){
    console.warn(this.swipeShiftForm.value)
  }


}
