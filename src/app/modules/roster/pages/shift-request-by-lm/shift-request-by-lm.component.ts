import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shift-request-by-lm',
  templateUrl: './shift-request-by-lm.component.html',
  styleUrls: ['./shift-request-by-lm.component.css']
})
export class ShiftRequestByLmComponent implements OnInit {
  screenRole : 'lm';
  shiftsArray: any;
  shiftTypeArray: any;
  shiftRequestLMform:FormGroup;
  shiftNameArray: any;
  filters : any;

  constructor(private appLocalStorage: AppLocalStorageService,
    private shiftRequest : ShiftRequestDataService,
    private fb:FormBuilder) { }

  ngOnInit(): void {

    this.screenRole = 'lm';
    this.getShiftList();
    this.getShiftTypes();

    this.shiftRequestLMform=this.fb.group({
      shift_id:["",Validators.required],
      shift_name:["",Validators.required],
      start_date:["",Validators.required],
      end_date:["",Validators.required],
      lm_comment:["",Validators.required]     
    })
  }

  get validateAForm(): any {
    return this.shiftRequestLMform.controls
  }

  filterChange($event){
    console.log('in job shift calendar',$event);
    this.filters = $event;
  }

  async submit(){
    // console.warn(this.shiftRequestLMform.value)
    const body = {
      "screen_role": "lm",
      "client_id" : this.appLocalStorage.getClientId(),
      "line_manager_id" : this.appLocalStorage.getUserId(),
      "shift_type_id": this.shiftRequestLMform.value.shift_id,
      "name": this.shiftRequestLMform.value.shift_name,
      "time_in": this.shiftRequestLMform.value.start_date,
      "time_out": this.shiftRequestLMform.value.end_date,
      "lm_request": 1,
      "lm_comment": this.shiftRequestLMform.value.lm_comment,
      "work_hours": 8,
      "hours_range": "daily",
      "glob_mkt_id": this.filters.marketId,
      "region_id": this.filters.clusterId,
      "sub_region_id": this.filters.subClusterId,
      "country_id": this.filters.countryId,
      "state_id": this.filters.stateId,
      "city_id": this.filters.cityId,
      "branch_id": this.filters.branchId, 
      "department_id": 16,
      "desg_id": -1,
      "emp_id": -1
    }
    await this.insertShift(body);
    await this.getShiftList();

    this.shiftTypeArray = [];
    this.getShiftTypes();

    this.resetForm();

  }

  resetForm(){
    console.log('form Cleared');
    this.shiftRequestLMform.markAsPristine();
    this.shiftRequestLMform.markAsUntouched();
    this.shiftRequestLMform.reset();
    console.log(this.shiftRequestLMform.value);
  }

  async insertShift(body){
    const data = await this.shiftRequest.lmInsertShift(body);
  }

  async getShiftList(){
    const data = await this.shiftRequest.getDefaultList(this.screenRole);
    let shifts = data["data"]["payload"];
    if(!Array.isArray(shifts)){
      console.log('error occured');
    }
    this.shiftsArray = shifts;

    const shiftName = [];
    shifts.forEach(shift => {
      shiftName.push({
        id: shift.shift_type_id,
        name: shift.name
      })
    });
    this.shiftNameArray = shiftName;
  }

  async getShiftTypes(){
    const data = await this.shiftRequest.getShiftTypes();
    let shifts = data["data"]["payload"];
    if(!Array.isArray(shifts)){
      console.log('error occured');
    }
    const mapShiftsArray = [];
    shifts.forEach(shift =>{
      mapShiftsArray.push({
        id : shift.shift_type_id , 
        name : shift.shift_type_name
      })
    });
    console.log(mapShiftsArray);
    this.shiftTypeArray = mapShiftsArray;
    
    console.log(this.shiftTypeArray);
  }
}
