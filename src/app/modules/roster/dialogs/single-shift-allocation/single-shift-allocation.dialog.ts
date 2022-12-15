import { EmployeeRosterDataService } from './../../services/data/employeeAttendance.data';
import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { RosterService } from './../../services/data/rosterView.data.service';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeShiftDataService } from '../../services/data/dropdown.data';
import moment from 'moment';

@Component({
  selector: 'app-single-shift-allocation',
  templateUrl: './single-shift-allocation.dialog.html',
  styleUrls: ['./single-shift-allocation.dialog.css']
})
export class SingleShiftAllocationDialog implements OnInit {

  singleShiftForm: FormGroup;
  submitted : boolean = false;
  shiftsArray: any;
  shiftNameArray: any;
  screenRole = 'lm';
  alreadyAllocatedShift: any;
  @Input() data;

  shiftAllocate :any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private employeeShiftDataService: EmployeeShiftDataService,
    private employeeroster: EmployeeRosterDataService,
    private fb: FormBuilder,
    private appLocalStorage : AppLocalStorageService,
    private rosterService : RosterService,
    private shiftRequest: ShiftRequestDataService
  ) { }

  ngOnInit(): void {
    this.getShiftDropdown()
    this.singleShiftForm=this.fb.group({
      date:["",Validators.required],
      allocateShift:["",Validators.required]
    })
  }
  allocatedShift : any;
  async changeDate(){
    this.singleShiftForm.value.date = moment(this.singleShiftForm.value.date).format("YYYY-MM-DD");
    const params = {
      "screen_role" : "emp",
      "client_id" : this.appLocalStorage.getClientId(),
      "employee_id" : this.data.employee_id,
      "custom_date" : this.singleShiftForm.value.date
    }
    // const params = {
    //   "screen_role" : "emp",
    //   "client_id" : 48,
    //   "employee_id" : "17278",
    //   "custom_date" : "2022-07-18"
    // }
    let replace = true;
    const res = await this.employeeroster.getEmployeeRoster(params, replace);
    if(res['data']['payload']['data'].length !== 0){
      this.alreadyAllocatedShift = res['data']['payload']['data'][0].shift_name;

      this.allocatedShift = res['data']['payload']['data'][0];
      this.filterShiftsArray(this.allocatedShift.shift_id);
    }else{
      console.log("Error")
    }
  }




  masterShiftsArray = [];
  filterShiftsArray(shiftId){
    const shifts = [];
    this.masterShiftsArray.forEach(shift =>{
      if(shift.id !=shiftId){
        shifts.push(shift);
      }
    });

    this.shiftNameArray = shifts;
  }
  async getShiftDropdown() {
    // this.shiftAllocate = <Array<any>>(await this.shiftRequest.getDefaultList(this.screenRole));
    const data = await this.shiftRequest.getDefaultList(this.screenRole);
    let shifts = data["data"]["payload"];
    if(!Array.isArray(shifts)){
      console.log('error occured');
    }
    this.shiftsArray = shifts;

    const shiftName = [];
    shifts.forEach(shift => {
      shiftName.push({
        id: shift.id,
        name: shift.name
      })
    });
    this.shiftNameArray = shiftName;
    this.masterShiftsArray = [...this.shiftNameArray];
  }


  get validateAForm(): any {
    return this.singleShiftForm.controls
  }

  async submit(){

    this.singleShiftForm.value.date = moment(this.singleShiftForm.value.date).format("YYYY-MM-DD");

    const body = {
      "client_id" : this.appLocalStorage.getClientId(),
      "linemanager_id" : await this.appLocalStorage.getLineManagerId(),
      "shift_id" : this.allocatedShift.shift_id,
      "employee_id" : this.data.employee_id,
      "rosterDate" : this.singleShiftForm.value.date,
      "additional_shift_id" : this.singleShiftForm.value.allocateShift
    }

    console.log(this.singleShiftForm.value);
    this.assignShift(body);
  }

  async assignShift(body){
    const res = await this.rosterService.assignAddtionalShift(body);
    if(res["status"]){
      this.activeModal.close(true);
    }
  }  

}
