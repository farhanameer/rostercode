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
  view:string="shift";
  shifts: Array<any> = [];
  employeesDropdown : any=[];
  employeesName : any=[];
  assignedEmployeeShift : any;
  selectedEmployeeId: any;

  additionalShiftForm:FormGroup
  additionalHoursForm:FormGroup
  constructor(public activeModal: NgbActiveModal ,
    private customModal:ModalService, 
    private fb: FormBuilder, 
    private shiftRequestDataService: ShiftRequestDataService,
    private rosterService: RosterService,
    private employeeroster: EmployeeRosterDataService) { }

  ngOnInit(): void {

    this.additionalShiftForm=this.fb.group({
      additionalShift:[''],
      employee_id:[''],
      additional_shift_id:['']
    })

    this.getDefaultList();
    this.getEmployeeList({
      "client_id" : 48,
      "username" : "waqas.nisar@people.com.pk",
      "dept_id" : 343,
      "department_id" : 16
  });
    

    this.additionalHoursForm=this.fb.group({
      additionalShiftHours:['']
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('submit value change' , this.additionalShifts);

    const params = {
      "employee_id" : this.additionalShiftForm.value.employee_id,
      "assigned_shift" : this.assignedShiftDefaultValue.id,
      "additionalShift" : this.additionalShiftForm.value.additionalShift
    }

    console.log("THESE ARE THE PARAMS",params);
    this.additionalShifts = false;
  }

  async getDefaultList() {
    const res = await this.shiftRequestDataService.getDefaultList();
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
}
