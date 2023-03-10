import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import moment from 'moment';

export interface BooleanFn {
  (): boolean;
}
@Component({
  selector: 'app-shift-setup',
  templateUrl: './shift-setup.component.html',
  styleUrls: ['./shift-setup.component.scss'],
})
export class ShiftSetupComponent implements OnInit {
  isShiftExtended: boolean = false;
  isQrtBreak: boolean = false;
  shiftNameClick: boolean = false;

  constructor(
    private shiftRequestService: ShiftRequestDataService,
    private fb: FormBuilder,
    private appLocalStorage: AppLocalStorageService,
  ) {}

  shiftTypeArray: any;
  shiftColorArray: any;

  shiftTypeCopiedArray: any;
  shiftColorCopiedArray: any;

  shiftArray: any;
  filters: any;
  weekDaysArray = [
    {
      id: 1,
      name: 'Sunday',
    },
    {
      id: 2,
      name: 'Monday',
    },
    {
      id: 3,
      name: 'Tuesday',
    },
    {
      id: 4,
      name: 'Wednesday',
    },
    {
      id: 5,
      name: 'Thursday',
    },
    {
      id: 6,
      name: 'Friday',
    },
    {
      id: 7,
      name: 'Saturday',
    },
  ];
  copiedWeekDays = [];
  dropDownDefaultValues = {
    shiftType: {},
    shiftColor: {},
    day : {},
    revert : {}
  };

  colors : any;
  ngOnInit(): void {
    this.shiftSetUpForm = this.fb.group({
      screen_role: [''],
      client_id: [''],
      color: ['', Validators.required],
      name: ['', Validators.required],
      time_in: [null, Validators.required],
      time_out: ['', Validators.required],
      mid_break_enable: [0],
      mid_break_time_in: [''],
      mid_break_time_out: [''],
      ext_mid_break_day_id: [''],
      ext_mid_break_time_in: [''],
      ext_mid_break_time_out: [''],
      is_roster: [0],
      is_default: [0],
      Tolerance: [false],
      consecutive_late: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftSetUpForm.get('Tolerance').value
          ),
        ],
      ],
      late_arrival_tolerance: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftSetUpForm.get('Tolerance').value
          ),
        ],
      ],
      attendance_tolerance: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftSetUpForm.get('Tolerance').value
          ),
        ],
      ],
      specific_period: [false],
      revert_shift_id: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftSetUpForm.get('specific_period').value
          ),
        ],
      ],
      shift_revert_date_start: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftSetUpForm.get('specific_period').value
          ),
        ],
      ],
      shift_revert_date_end: [
        null,
        [
          this.shiftQrtExtendedValidator(
            () => this.shiftSetUpForm.get('specific_period').value
          ),
        ],
      ],
      shift_type_id: ['', Validators.required],
      glob_mkt_id: [''],
      region_id: [''],
      sub_region_id: [''],
      country_id: [''],
      state_id: [''],
      city_id: [''],
      branch_id: [''],
      department_id: [''],
      desg_id: [''],
      emp_id: [''],
      qrt_break: this.fb.array([]),
      hr_comment: ['', Validators.required],
      hr_date : [''],
      hr_status : [''],
      lm_comment : [''],
      lm_date : [''],
      lm_request : ['']
    });
    this.shiftSetUpForm
      .get('specific_period')
      .valueChanges.subscribe((value) => {
        console.log('checking');
        this.shiftSetUpForm
          .get('shift_revert_date_start')
          .updateValueAndValidity();
        this.shiftSetUpForm
          .get('shift_revert_date_end')
          .updateValueAndValidity();
        this.shiftSetUpForm.get('revert_shift_id').updateValueAndValidity();
      });
    this.shiftSetUpForm.get('Tolerance').valueChanges.subscribe((value) => {
      this.shiftSetUpForm.get('consecutive_late').updateValueAndValidity(value);
      this.shiftSetUpForm
        .get('late_arrival_tolerance')
        .updateValueAndValidity(value);
      this.shiftSetUpForm
        .get('attendance_tolerance')
        .updateValueAndValidity(value);
    });

    this.newqrtbreak();
    this.getShiftTypes();
    this.getShiftColors();
    this.getShifts();
    this.colors = {
      0 : null , 
      1 : null , 
      2 : null,
      3: null
    }

    this.shiftStatusColor();
    // this.getShift
  }
  
  async shiftStatusColor(){
    const res = await this.shiftRequestService.getShiftStatusColors();
    let allColors = res['data'].payload;
    console.log(allColors);

    allColors.forEach(cls =>{
      if(cls.approved) {
        this.colors[2] = cls.approved;
      }else if(cls.pending){
        this.colors[0] = cls.pending;
      }
      else if(cls.disapproved){
        this.colors[3] = cls.disapproved;
      }else if(cls.lmrequest){
        this.colors[1] = cls.lmrequest;
      }
    });
    console.log(this.colors);
  }
  
  shiftExtendedValidator(
    predicate: BooleanFn,
    validator: ValidatorFn,
    errorNamespace?: string
  ): ValidatorFn {
    console.log(predicate);
    return (formControl) => {
      if (!formControl.parent) {
        return null;
      }
      let error = null;
      if (predicate()) {
        error = validator(formControl);
      }
      if (errorNamespace && error) {
        const customError = {};
        customError[errorNamespace] = error;
        error = customError;
      }
      return error;
    };
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

  onShiftExtendedChecked(val: any) {
    console.log('onShiftExtendedChecked', val);
    this.isShiftExtended = !this.isShiftExtended;
    // if (val) {
    //   this.shiftSetUpForm.controls['revert_shift_id'].enable();
    //   this.shiftSetUpForm.controls['shift_revert_date_start'].enable();
    //   this.shiftSetUpForm.controls['shift_revert_date_end'].enable();
    // } else {
    //   this.shiftSetUpForm.controls['revert_shift_id'].disable();
    //   this.shiftSetUpForm.controls['shift_revert_date_start'].disable();
    //   this.shiftSetUpForm.controls['shift_revert_date_end'].disable();
    // }
    console.log(val);
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
  filtersChanged(filters) {
    console.log('filters Value', filters);
    this.filters = filters;
  }

  screenRole = 'hr';

  async getShifts() {
    const data = await this.shiftRequestService.getDefaultList(this.screenRole);
    if (!data['status']) return; // posibile error
    let shifts = data['data']['payload'];
    this.shiftArray = shifts;
    console.log('shift Array', this.shiftArray);
  }

  async getShiftTypes() {
    const data = await this.shiftRequestService.getShiftTypes();
    let shifts = data['data']['payload'];
    if (!Array.isArray(shifts)) {
      console.log('error occured');
    }
    const shiftsArray = [];
    shifts.forEach((shift) => {
      shiftsArray.push({
        id: shift.shift_type_id,
        name: shift.shift_type_name,
      });
    });
    console.log(shiftsArray);
    this.shiftTypeArray = shiftsArray;
    this.shiftTypeCopiedArray = [...this.shiftTypeArray];
    console.log(this.shiftTypeArray);
  }

  async getShiftColors() {
    const data = await this.shiftRequestService.getShiftColors();
    
    let colors = data['data']['payload'];
    if (!Array.isArray(colors)) {
      console.log('error occured');
    }
    const colorsArray = [];
    colors.forEach((color) => {
      let obj = {
        id: color.color,
        name: color.name,
      };
      colorsArray.push(obj);
    });
    console.log(colorsArray);
    this.shiftColorArray = colorsArray;
    this.shiftColorCopiedArray = [...this.shiftColorArray];
    console.log(this.shiftColorArray);
  }
  shiftSetUpForm: FormGroup;

  get qrt_break(): FormArray {
    return this.shiftSetUpForm.get('qrt_break') as FormArray;
  }

  newqrtbreak() {
    const qrtForm = this.fb.group({
      qrt_break_title: [''],
      qrt_break_time_in: [''],
      qrt_break_time_out: [''],
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

  get validateAForm(): any {
    return this.shiftSetUpForm.controls;
  }

  generalSelection:boolean = false;
  checkBoxSelection(eventValue){
    this.generalSelection = eventValue;

    this.shiftSetUpForm.get('is_roster').setValue(0);
    console.log(this.generalSelection);
  }
  async submit() {
    console.log(this.shiftSetUpForm.value);

    

    if (this.isUpdating) {
      console.log(this.shiftSetUpForm.value);
      return;
    }
    const body = {
      ...this.shiftSetUpForm.value,
    };
    body.screen_role = 'hr';
    body.client_id = this.appLocalStorage.getClientId();
    body.glob_mkt_id = this.filters.marketId;
    body.region_id = this.filters.clusterId;
    body.sub_region_id = this.filters.subClusterId;
    body.country_id = this.filters.countryId;
    body.state_id = this.filters.stateId;
    body.city_id = this.filters.cityId;
    body.branch_id = this.filters.branchId;
    body.department_id = this.filters.departmentId;
    body.ext_mid_break_time_in = `${body.ext_mid_break_time_in}:00`;
    body.ext_mid_break_time_out = `${body.ext_mid_break_time_out}:00`;
    body.desg_id = -1;
    body.time_in = `${body.time_in}:00`;
    body.time_out = `${body.time_out}:00`;
    body.qrt_break.forEach((br) => {

      br.qrt_break_time_in = `${br.qrt_break_time_in}:00`
      br.qrt_break_time_out = `${br.qrt_break_time_out}:00`;

      // let lengh = br.qrt_break_time_in.split(':');
      // if(lengh.length ==2){
      //   ;
      // }
      // lengh = br.qrt_break_time_out.split(':');
      // if(lengh.length ==2){
      //   br.qrt_break_time_in = `${br.qrt_break_time_in}:00`;
      // }
      
    });
    body.consecutive_late = Number(body.consecutive_late);
    body.late_arrival_tolerance = Number(body.late_arrival_tolerance);
    body.attendance_tolerance = Number(body.attendance_tolerance);
    body.revert_shift_id = 0;
    if (body.shift_revert_date_start) {
      body.shift_revert_date_start = moment(
        body.shift_revert_date_start
      ).format('YYYY-MM-DD');
    }
    if (body.shift_revert_date_end) {
      body.shift_revert_date_end = moment(body.shift_revert_date_end).format(
        'YYYY-MM-DD'
      );
    }

    body.mid_break_time_in = `${body.mid_break_time_in}:00`;
    body.mid_break_time_out = `${body.mid_break_time_out}:00`;

    if(body.is_roster){
      body.is_roster = 1;
    }else{
      body.is_roster = 0;
    }

    // confused Entries
    //body.ext_mid_break_day_id = "5";
    body.mid_break_enable = 0;
    //body.department_id = 16; //desig_id emp_id = -1 by default
    body.emp_id = -1;


    delete body.lm_request;
    delete body.lm_date;
    delete body.lm_comment;
    delete body.hr_status;
    delete body.hr_date;
    delete body.Tolerance;
    delete body.specific_period;
    const response = await this.shiftRequestService.hrInsertShift(body);
    if(!response["status"]) return;
    this.getShifts();
    this.resetForm();
    console.log('response', response);
  }

  resetArray(array, newArray) {
    array = [];
    setTimeout(() => {
      array = newArray;
    }, 200);
  }
  resetForm() {
    console.log('form Cleared');
    this.shiftSetUpForm.markAsPristine();
    this.shiftSetUpForm.markAsUntouched();
    this.shiftSetUpForm.reset();
    console.log(this.shiftSetUpForm.value);
    this.resetDropDown();
    this.isUpdating = false;
    this.defaultFilters = {
      glob_mkt_id : null , 
      region_id : null , 
      sub_region_id : null,
      country_id : null , 
      state_id : null , 
      city_id  : null , 
      branch_id : null , 
      department_id : null
    }

    this.isDisabled = false;
    
  }
  resetFilters = false;
  resetDropDown() {
    this.shiftColorArray = [];
    this.shiftTypeArray = [];
    this.dropDownDefaultValues.shiftColor = {};
    this.dropDownDefaultValues.shiftType = {};
    this.dropDownDefaultValues.day = {};
    this.copiedWeekDays = [...this.weekDaysArray];
    this.weekDaysArray = [];
    setTimeout(() => {
      this.shiftColorArray = this.shiftColorCopiedArray;
      this.shiftTypeArray = this.shiftTypeCopiedArray;
      this.weekDaysArray = [...this.copiedWeekDays]
    }, 200);
    this.resetFilters = !this.resetFilters;
  }

  isUpdating: boolean = false;
  updateAbleShiftId: any;
  defaultFilters : any=null;
  shiftId: any;
  isDisabled : boolean = false;
  proll_table_id : any = 0;
  async getSingleShift(id) {
    this.shiftId = id;
    console.log('single Shift Id', id);

    const payload = {
      client_id: this.appLocalStorage.getClientId(),
      shift_id: id,
    };
    const response = await this.shiftRequestService.shiftById(payload);

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

    if(shift.hr_status !=0){
      this.isDisabled = true;
    }

    this.proll_table_id = shift.proll_filter_table_id;
    if(shift.hr_status != 0 ){
      this.isDisabled = true;
    }else{
      this.isDisabled = false;
    }
    // this.testform.patchValue({
    //   "testcontrol": testdata.id,
    //   "desc": "testdata value"
    // });


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
    let counter = 0;

    if (shift.qrt_break) {
      shift.qrt_break.forEach((qrt) => {
        if(counter !=0){
          this.newqrtbreak();
        }
        qrt.qrt_break_time_in = this.changeTimeFormate(qrt.qrt_break_time_in);
        qrt.qrt_break_time_out = this.changeTimeFormate(qrt.qrt_break_time_out);
        counter = counter + 1;
      });
    }

    if(shift.specific_period == '0'){
      shift.specific_period = false;
    }
    this.onShiftExtendedChecked(id);
    this.populateDefaultDropDownValues(shift);


    if(shift.shift_revert_date_start || shift.shift_revert_date_end || shift.revert_shift_id !=0){
      shift.specific_period = true;
    }
    if(shift.consecutive_late || shift.late_arrival_tolerance || shift.attendance_tolerance){
      shift.Tolerance = true;
    }
    this.shiftSetUpForm.patchValue(shift);

    this.isUpdating = true;
    console.log('shifts Data',shift);
    
    // this.shiftNameClick = true;
    this.isUpdating = true;
    this.updateAbleShiftId = id;
    this.defaultFilters = {
      glob_mkt_id : shift.glob_mkt_id , 
      region_id : shift.region_id , 
      sub_region_id : shift.sub_region_id,
      country_id : shift.country_id , 
      state_id : shift.state_id , 
      city_id  : shift.city_id , 
      branch_id : shift.branch_id , 
      department_id : shift.department_id
    }
  }

  update() {
    console.log(this.shiftSetUpForm.value);
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
  populateDefaultDropDownValues(shift) {
    if (shift.shift_type_id) {
      this.dropDownDefaultValues.shiftType = this.searchInArray(
        this.shiftTypeCopiedArray,
        'id',
        shift.shift_type_id
      );
    }
    if (shift.color) {
      this.dropDownDefaultValues.shiftColor = this.searchInArray(
        this.shiftColorCopiedArray,
        'id',
        shift.color
      );
    }
    if(shift.ext_mid_break_day_id != null){
      console.log('here we have ' , shift.ext_mid_break_day_id);
      this.dropDownDefaultValues.day = this.searchInArray(
        this.weekDaysArray , 
        'id',
        Number(shift.ext_mid_break_day_id) + 1
      );
    
    }
    if(shift.revert_shift_id){    
      this.dropDownDefaultValues.revert = this.searchInArray(
        this.shiftArray , 
        'id',
        shift.revert_shift_id
      );
    }
    console.log('default values set', this.dropDownDefaultValues);
  }

  changeTimeFormate(value) {
    if (value) {
      const array = value.split(':');
      return `${array[0]}:${array[1]}`;
    }
    return null;
  }

  async approve() {
    const qrtBreaks = [];
    const values = this.shiftSetUpForm.value;
    values.qrt_break.forEach(br =>{
      br.qrt_break_time_in = `${br.qrt_break_time_in}:00`;
      br.qrt_break_time_out = `${br.qrt_break_time_out}:00`;
      // let lengh = br.qrt_break_time_in.split(':');
      // if(lengh.length ==2){
      //   br.qrt_break_time_in = `${br.qrt_break_time_in}:00`;
      // }
      // lengh = br.qrt_break_time_out.split(':');
      // if(lengh.length ==2){
      //   br.qrt_break_time_in = `${br.qrt_break_time_out}:00`;
      // }
      // br.qrt_break_time_out = `${br.qrt_break_time_out}:00`;
      qrtBreaks.push(br);
    })

    let shift_revert_date_start = this.shiftSetUpForm.get('shift_revert_date_start').value
    if(shift_revert_date_start){
      shift_revert_date_start = moment(shift_revert_date_start).format('YYYY-MM-DD');
    }

    let shift_revert_date_end = this.shiftSetUpForm.get('shift_revert_date_end').value
    if(shift_revert_date_end){
      shift_revert_date_end = moment(shift_revert_date_end).format('YYYY-MM-DD');
    }
    
           
    const body = {
      "client_id": this.appLocalStorage.getClientId(),
      "shift_id": this.shiftId,
      "proll_filter_table_id": this.proll_table_id,
      "hr_status": 2,
      "color": this.shiftSetUpForm.get('color').value,
      "name": this.shiftSetUpForm.get('name').value,
      "time_in": `${this.shiftSetUpForm.get('time_in').value}:00`,
      "time_out": `${this.shiftSetUpForm.get('time_out').value}:00`,
      "mid_break_enable": this.shiftSetUpForm.get('mid_break_enable').value,
      "mid_break_time_in": `${this.shiftSetUpForm.get('mid_break_time_in').value}:00`, 
      "mid_break_time_out": `${this.shiftSetUpForm.get('mid_break_time_out').value}:00`,
      "ext_mid_break_day_id": this.shiftSetUpForm.get('ext_mid_break_day_id').value - 1,
      "ext_mid_break_time_in": `${this.shiftSetUpForm.get('ext_mid_break_time_in').value}:00`,
      "ext_mid_break_time_out": `${this.shiftSetUpForm.get('ext_mid_break_time_out').value}:00`,
      "is_roster": this.shiftSetUpForm.get('is_roster').value ? 1 : 0,
      "consecutive_late": this.shiftSetUpForm.get('consecutive_late').value,
      "late_arrival_tolerance": this.shiftSetUpForm.get('late_arrival_tolerance').value,
      "attendance_tolerance": this.shiftSetUpForm.get('attendance_tolerance').value ? 1 : 0,
      "revert_shift_id": this.shiftSetUpForm.get('revert_shift_id').value,
      "shift_revert_date_start": shift_revert_date_start, 
      "shift_revert_date_end": shift_revert_date_end,
      "shift_type_id": this.shiftSetUpForm.get('shift_type_id').value,
      "glob_mkt_id": this.filters.marketId,
      "region_id": this.filters.clusterId,
      "sub_region_id": this.filters.subClusterId,
      "country_id": this.filters.countryId,
      "state_id": this.filters.stateId,
      "city_id": this.filters.cityId,
      "branch_id": this.filters.branchId,
      "department_id": this.filters.departmentId,
      "desg_id": -1,
      "emp_id": -1, 
      "qrt_break": values.qrt_break,
      "specific_period" : this.shiftSetUpForm.get('specific_period').value ? 1 : 0,
      hr_comment: this.shiftSetUpForm.get('hr_comment').value
    }
    const res = await this.shiftRequestService.putUpdateShift(body);
    if(!res["status"]) return;

    if(this.isDisabled){
      this.getShifts();
      this.resetForm();
      this.shiftNameClick = false;
      return;
    }
    const params = {
      screen_role: 'hr',
      client_id: this.appLocalStorage.getClientId(),
      shift_id: this.updateAbleShiftId,
      action: 'approve',
      hr_comment: this.shiftSetUpForm.get('hr_comment').value
    };
    const response = await this.shiftRequestService.putDeleteDisapprovedById(
      params
    );
    console.log(response);
    if(!response["status"]) return;
    this.getShifts();
    this.resetForm();
    this.shiftNameClick = false;
  }
  async disApprove() {
    const params = {
      screen_role: 'hr',
      client_id: this.appLocalStorage.getClientId(),
      shift_id: this.updateAbleShiftId,
      action: 'disapprove',
      hr_comment: this.shiftSetUpForm.get('hr_comment').value
    };
    const response = await this.shiftRequestService.putDeleteDisapprovedById(
      params
    );
    console.log(response);
    if(!response["status"]) return;
    this.resetForm();
    this.shiftNameClick = false;
  }
  cancel() {
    this.resetForm();
    this.shiftNameClick = false;
    this.isUpdating = false;
    this.defaultFilters = {
      glob_mkt_id : null , 
      region_id : null , 
      sub_region_id : null,
      country_id : null , 
      state_id : null , 
      city_id  : null , 
      branch_id : null , 
      department_id : null
    }
  }
}
