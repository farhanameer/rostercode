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
  constructor(
    private shiftRequestService: ShiftRequestDataService,
    private fb: FormBuilder,
    private appLocalStorage: AppLocalStorageService
  ) {}

  shiftTypeArray: any;
  shiftColorArray: any;

  shiftTypeCopiedArray: any;
  shiftColorCopiedArray: any;

  shiftArray: any;
  filters: any;
  weekDaysArray = [
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

  dropDownDefaultValues = {
    shiftType: {},
    shiftColor: {},
  };
  ngOnInit(): void {
    this.shiftSetUpForm = this.fb.group({
      screen_role: [''],
      client_id: [''],
      color: ['', Validators.required],
      name: ['', Validators.required],
      time_in: [null, Validators.required],
      time_out: ['', Validators.required],
      mid_break_enable: [''],
      mid_break_time_in: ['', Validators.required],
      mid_break_time_out: ['', Validators.required],
      ext_mid_break_day_id: ['', Validators.required],
      ext_mid_break_time_in: ['', Validators.required],
      ext_mid_break_time_out: ['', Validators.required],
      Tolerance: [''],
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
      specific_period: [''],
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

    // debugger;
    this.getShiftTypes();
    this.getShiftColors();
    this.getShifts();
    // this.getShift
  }
  shiftExtendedValidator(
    predicate: BooleanFn,
    validator: ValidatorFn,
    errorNamespace?: string
  ): ValidatorFn {
    console.log(predicate);
    // debugger;
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
    // debugger;
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
    // debugger;
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
        id: color,
        name: color,
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

  get validateAForm(): any {
    return this.shiftSetUpForm.controls;
  }

  async submit() {
    console.log(this.shiftSetUpForm.value);

    return;

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
    body.desg_id = this.filters.departmentId;
    body.ext_mid_break_time_in = `${body.ext_mid_break_time_in}:00`;
    body.ext_mid_break_time_out = `${body.ext_mid_break_time_out}:00`;
    body.time_in = `${body.time_in}:00`;
    body.time_out = `${body.time_out}:00`;
    body.qrt_break.forEach((br) => {
      br.qrt_break_time_in = `${br.qrt_break_time_in}:00`;
      br.qrt_break_time_out = `${br.qrt_break_time_out}:00`;
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

    // confused Entries
    //body.ext_mid_break_day_id = "5";
    body.mid_break_enable = 0;
    body.department_id = 16; //desig_id emp_id = -1 by default
    body.emp_id = -1;

    const response = await this.shiftRequestService.hrInsertShift(body);
    this.shiftSetUpForm.reset(this.shiftSetUpForm.value);
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

  isUpdating: boolean = false;
  updateAbleShiftId: any;
  async getSingleShift(id) {
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
    if (shift.qrt_break) {
      shift.qrt_break.forEach((qrt) => {
        qrt.qrt_break_time_in = this.changeTimeFormate(qrt.qrt_break_time_in);
        qrt.qrt_break_time_out = this.changeTimeFormate(qrt.qrt_break_time_out);
      });
    }
    this.populateDefaultDropDownValues(shift);

    this.shiftSetUpForm.patchValue(shift);
    this.isUpdating = true;
    this.updateAbleShiftId = id;
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
    console.log('default values set', this.dropDownDefaultValues.shiftColor);
  }

  changeTimeFormate(value) {
    if (value) {
      const array = value.split(':');
      return `${array[0]}:${array[1]}`;
    }
    return null;
  }

  async approve() {
    const params = {
      screen_role: 'hr',
      client_id: this.appLocalStorage.getClientId(),
      shift_id: this.updateAbleShiftId,
      action: 'approve',
    };
    const response = await this.shiftRequestService.putDeleteDisapprovedById(
      params
    );
    console.log(response);
    this.resetForm();
  }
  async disApprove() {
    const params = {
      screen_role: 'hr',
      client_id: this.appLocalStorage.getClientId(),
      shift_id: this.updateAbleShiftId,
      action: 'disapprove',
    };
    const response = await this.shiftRequestService.putDeleteDisapprovedById(
      params
    );
    console.log(response);
    this.resetForm();
  }
  cancel() {
    this.resetForm();
  }
}
