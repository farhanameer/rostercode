import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { RosterService } from '../../services/data/roster.dataService';
import { LinkCheckerService } from '../../services/linkChecker.service';

@Component({
  selector: 'app-overtime-adjustment',
  templateUrl: './overtime-adjustment.dialog.html',
  styleUrls: ['./overtime-adjustment.dialog.scss'],
})
export class OvertimeAdjustmentDialog implements OnInit {
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private appLocalStorage: AppLocalStorageService,
    private overTimeAdjustment: RosterService,
    public linkService : LinkCheckerService
  ) {}
  @Input() modelData: any;
  overTimeForm: FormGroup;
  // type: string = 'cpl';

  requiredIfValidator(predicate, customValue) {
    return (formControl) => {
      console.log('running erveytime');
      if (!formControl.parent) {
        console.log('returned nulify Values');
        return null;
      }
      if (predicate() == customValue) {
        console.log('returned required value', predicate());
        return Validators.required(formControl);
      }
      console.log('finally returned nulify values');
      return null;
    };
  }

  ngOnInit(): void {
    console.log('employee Data', this.modelData);
    this.overTimeForm = this.fb.group({
      overTime: [this.modelData.overtime, Validators.required],
      givenHours: [
        '',
        [
          this.requiredIfValidator(
            () => this.overTimeForm.get('type').value,
            'payment'
          ),
        ],
      ],
      tillDate: ['', Validators.required],
      type: ['cpl'],
      cpl: [
        '',
        [
          this.requiredIfValidator(
            () => this.overTimeForm.get('type').value,
            'cpl'
          ),
        ],
      ],
    });

    this.overTimeForm.get('type').valueChanges.subscribe((value) => {
      this.overTimeForm.get('cpl').updateValueAndValidity();
      this.overTimeForm.get('givenHours').updateValueAndValidity();
    });
    console.log(this.overTimeForm.value);
  }

  valueType: string = 'cpl';
  overtimeType(val: string) {
    this.valueType = val;

    // this.overTimeForm.get('type').setValue(val);
    setTimeout(() => {
      console.log(this.overTimeForm.value);
    }, 5000);
    // if(val == 'payment'){
    //   this.resetFormField('cpl')
    // }else if(val == 'cpl'){
    //   this.resetFormField('givenHours')
    // }
  }

  submit() {
    // console.log(this.overTimeForm.value);
    // let obj = {
    //   type: 'cpl',
    //   employee_id: this.modelData.employee_id,
    //   givenHours: this.overTimeForm.value.givenHours,
    //   givenCPL: this.overTimeForm.value.cpl,
    //   client_id: this.appLocalStorage.getClientId(),
    //   line_manager_id: this.appLocalStorage.getUserId(),
    // };
    // console.log('my obj', obj);
    this.HoursAdjustMent();
  }
  async HoursAdjustMent() {
    
    let obj = {
      type: this.valueType,
      employee_id: this.modelData.employee_id,
      givenHours: this.overTimeForm.value.givenHours,
      givenCPL: this.overTimeForm.value.cpl,
      client_id: this.appLocalStorage.getClientId(),
      line_manager_id:await this.appLocalStorage.getLineManagerId(),
      givenDate : moment(this.overTimeForm.value.tillDate).format('YYYY-MM-DD')
    };

    if (this.valueType == 'cpl') {
      delete obj.givenHours;
    }
    if (this.valueType == 'payment') {
      delete obj.givenCPL;
    }
    // console.log('my obj', obj);
    const result = await this.overTimeAdjustment.getOvertimeAdjustment(obj);
    if(!result["status"]) return;
    console.log('Overtime', result);
    this.activeModal.close(true);
  }

  get validateAForm(): any {
    return this.overTimeForm.controls;
  }
}
