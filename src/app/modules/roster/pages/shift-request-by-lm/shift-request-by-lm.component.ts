import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn } from '@angular/forms';
export interface BooleanFn {
  (): boolean;
}

@Component({
  selector: 'app-shift-request-by-lm',
  templateUrl: './shift-request-by-lm.component.html',
  styleUrls: ['./shift-request-by-lm.component.css']
})
export class ShiftRequestByLmComponent implements OnInit {
  weekDaysArray = [
    {
      id : -1,
      name : 'All'
    },
    {
      id: 0,
      name: 'Sunday',
    },
    {
      id: 1,
      name: 'Monday',
    },
    {
      id: 2,
      name: 'Tuesday',
    },
    {
      id: 3,
      name: 'Wednesday',
    },
    {
      id: 4,
      name: 'Thursday',
    },
    {
      id: 5,
      name: 'Friday',
    },
    {
      id: 6,
      name: 'Saturday',
    },
  ];
  screenRole : 'lm';
  shiftsArray: any;
  shiftTypeArray: any;
  shiftRequestLMform:FormGroup;
  shiftNameArray: any;
  filters : any;
  shiftNameClick: boolean = false;
  isShiftExtended: boolean = false;
  shiftColorArray: any;
  shiftColorCopiedArray: any;
  shiftTypeCopiedArray: any;
  isUpdating: boolean = false;
  updateAbleShiftId: any;
  isQrtBreak: boolean = false;

  constructor(private appLocalStorage: AppLocalStorageService,
    private shiftRequest : ShiftRequestDataService,
    private fb:FormBuilder) { }


    dropDownDefaultValues = {
      shiftType: {},
      shiftColor: {},
      day : {},
      revert : {}
    };

  ngOnInit(): void {

    this.screenRole = 'lm';
    this.getShiftList();
    this.getShiftTypes();

    this.shiftRequestLMform=this.fb.group({
      shift_id:["",Validators.required],
      shift_name:["",Validators.required],
      start_date:["",Validators.required],
      end_date:["",Validators.required],
      lm_comment:["",Validators.required],
      ext_mid_break_day_id : [''],
      ext_mid_break_time_in : [''],
      ext_mid_break_time_out : [''],
      Tolerance: [''],
      consecutive_late: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftRequestLMform.get('Tolerance').value
          ),
        ],
      ],
      late_arrival_tolerance: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftRequestLMform.get('Tolerance').value
          ),
        ],
      ],
      attendance_tolerance: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftRequestLMform.get('Tolerance').value
          ),
        ],
      ],
      specific_period : [''],
      shift_revert_date_start : [''],
      shift_revert_date_end : [''],
      revert_shift_id : [''],
      qrt_break: this.fb.array([]),
      hr_comment: [''],
      hr_date : [''],
      hr_status : [''],
      lm_date : [''],
      lm_request : [''],
    })

    this.newqrtbreak();
  }

  get validateAForm(): any {
    return this.shiftRequestLMform.controls
  }

  filterChange($event){
    console.log('in job shift calendar',$event);
    this.filters = $event;
  }

  get qrt_break(): FormArray {
    return this.shiftRequestLMform.get('qrt_break') as FormArray;
  }

  newqrtbreak() {
    const qrtForm = this.fb.group({
      qrt_break_title: ['', Validators.required],
      qrt_break_time_in: ['', Validators.required],
      qrt_break_time_out: ['', Validators.required],
    });

    this.qrt_break.push(qrtForm);
  }

  pushOrDeleteFromArray(flag, index) {
    if (flag == 'plus') {
      this.newqrtbreak();
      return;
    }
    this.qrt_break.removeAt(index);
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
      "department_id": this.filters.departmentId,
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

  resetDropDown() {
    this.shiftColorArray = [];
    this.shiftTypeArray = [];
    this.dropDownDefaultValues.shiftColor = {};
    this.dropDownDefaultValues.shiftType = {};
    setTimeout(() => {
      this.shiftColorArray = this.shiftColorCopiedArray;
      this.shiftTypeArray = this.shiftTypeCopiedArray;
    }, 200);
  }

  async getSingleShift(id) {
    console.log('single Shift Id', id);
    const payload = {
      client_id: this.appLocalStorage.getClientId(),
      shift_id: id,
    };
    const response = await this.shiftRequest.shiftById(payload);

    // this.shiftSetUpForm.reset(this.shiftSetUpForm.value);
    console.log('response', response);
    if (!response['status']) {
      console.log('error we got');
      console.log(response);
      return;
    }
    const shiftData = response['data']['payload'];
    console.log('shift data', shiftData[0]);
    const shift = shiftData[0];
    // this.testform.patchValue({
    //   "testcontrol": testdata.id,
    //   "desc": "testdata value"
    // });

    shift.shift_name = shift['name'];
    if(shift['time_in'] && shift['time_out']){
      shift.start_date = this.changeTimeFormate(
        shift['time_in']
      );
      shift.end_date = shift.start_date = this.changeTimeFormate(
        shift['time_out']
      );
    }
    
    delete shift['name'];
    delete shift['time_in'];
    delete shift['time_out'];
    
    
    if (shift.ext_mid_break_time_in && shift.ext_mid_break_time_out) {
      shift.ext_mid_break_time_in = this.changeTimeFormate(
        shift.ext_mid_break_time_in
      );
      shift.ext_mid_break_time_out = this.changeTimeFormate(
        shift.ext_mid_break_time_out
      );
    }
    if (shift.mid_break_time_in && shift.mid_break_time_out) {
      shift.mid_break_time_in = this.changeTimeFormate(shift.mid_break_time_in);
      shift.mid_break_time_out = this.changeTimeFormate(
        shift.mid_break_time_out
      );
    }
    if (shift.time_in && shift.time_out) {
      shift.time_in = this.changeTimeFormate(shift.time_in);
      shift.time_out = this.changeTimeFormate(shift.time_out);
    }
    if (shift.qrt_break) {
      shift.qrt_break.forEach((qrt) => {
        qrt.qrt_break_time_in = this.changeTimeFormate(qrt.qrt_break_time_in);
        qrt.qrt_break_time_out = this.changeTimeFormate(qrt.qrt_break_time_out);
      });
    }
    this.populateDefaultDropDownValues(shift);

    this.shiftRequestLMform.patchValue(shift);
    this.onShiftExtendedChecked(id);
    
    this.onQrtChecked(id);
    this.shiftNameClick = true;
    this.isUpdating = true;
    this.updateAbleShiftId = id;
  }

  searchInArray(array, key = null, value) {
    let foundValue = null;
    array.every((entry) => {
      if (key && entry[key] == value) {
        foundValue = entry;
        return false;
      }
      if (entry == value) {
        foundValue = {
          id: entry,
          name: entry,
        };
        return false;
      }
      return true;
    });
    return foundValue;
  }

  changeTimeFormate(value) {
    if (value) {
      const array = value.split(':');
      return `${array[0]}:${array[1]}`;
    }
    return null;
  }
  shiftQrtExtendedValidator(predicate: BooleanFn): ValidatorFn {
    console.log(predicate);
    return (formControl) => {
      if (!formControl.parent) {
        return null;
      }
      let error = null;
      console.log('predicate value', predicate());
      if (predicate()) {
        console.log('predication');
        return Validators.required(formControl);
      }
      return error;
    };
  }
  onShiftExtendedChecked(event){
    console.log('event',event);
    this.isShiftExtended = !this.isShiftExtended; 
  }

  populateDefaultDropDownValues(shift) {
    if (shift.shift_type_id) {
      this.dropDownDefaultValues.shiftType = this.searchInArray(
        this.shiftTypeArray,
        'id',
        shift.shift_type_id
      );
    }
    if (shift.color) {
      this.dropDownDefaultValues.shiftColor = this.searchInArray(
        this.shiftColorCopiedArray || [],
        'id',
        shift.color
      );
    }
    if(shift.ext_mid_break_day_id){
      
      this.dropDownDefaultValues.day = this.searchInArray(
        this.weekDaysArray , 
        'id',
        shift.ext_mid_break_day_id
      );
    
    }
    if(shift.revert_shift_id){    
      this.dropDownDefaultValues.revert = this.searchInArray(
        this.shiftsArray , 
        'id',
        shift.revert_shift_id
      );
    }
    console.log('default values set', this.dropDownDefaultValues.shiftColor);
  }

  onQrtChecked(val: any) {
    console.log('onQrtChecked', val);
    this.isQrtBreak = !this.isQrtBreak;
    // if (val) {
    //   this.shiftSetUpForm.controls['consecutive_late'].enable();
    //   this.shiftSetUpForm.controls['late_arrival_tolerance'].enable();
    //   this.shiftSetUpForm.controls['attendance_tolerance'].enable();
    // } else {
    //   this.shiftSetUpForm.controls['consecutive_late'].disable();
    //   this.shiftSetUpForm.controls['late_arrival_tolerance'].disable();
    //   this.shiftSetUpForm.controls['attendance_tolerance'].disable();
    // }
    console.log(val);
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
    this.shiftTypeCopiedArray = [...this.shiftTypeArray];
    console.log(this.shiftTypeArray);
  }
}
