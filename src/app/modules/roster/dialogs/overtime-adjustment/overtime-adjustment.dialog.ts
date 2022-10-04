import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { RosterService } from '../../services/data/roster.dataService';
import { ModalService } from '../../services/modal/modal.service';
import { OvertimeHoursAdjusmentDialog } from '../overtime-hours-adjusment/overtime-hours-adjusment.dialog';

@Component({
  selector: 'app-overtime-adjustment',
  templateUrl: './overtime-adjustment.dialog.html',
  styleUrls: ['./overtime-adjustment.dialog.css'],
})
export class OvertimeAdjustmentDialog implements OnInit {
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private appLocalStorage: AppLocalStorageService,
    private hoursAdjustment: RosterService
  ) {}
  @Input() modelData: any;
  overTimeForm: FormGroup;
  type: string = 'cpl';
  ngOnInit(): void {
    console.log('employee Data', this.modelData);
    this.overTimeForm = this.fb.group({
      overTime: [this.modelData.overtime, Validators.required],
      givenHours: ['', Validators.required],
      tillDate: ['', Validators.required],
      addCPL: ['', Validators.required],
      paymentForOvertime: ['', Validators.required],
      cpl: ['', Validators.required],
      payForHours: ['', Validators.required],
    });
    console.log(this.overTimeForm.value);
  }
  overtimeType(val: string) {
    this.type = val;
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
    this.HoursAdjustMentTest();
  }
  async HoursAdjustMentTest() {
    let obj = {
      type: 'cpl',
      employee_id: this.modelData.employee_id,
      givenHours: this.overTimeForm.value.givenHours,
      givenCPL: this.overTimeForm.value.cpl,
      client_id: this.appLocalStorage.getClientId(),
      line_manager_id: this.appLocalStorage.getUserId(),
    };
    // console.log('my obj', obj);
    const result = await this.hoursAdjustment.getHoursAdjustment(obj);
    console.log('1st service', result);
  }

  get validateAForm(): any {
    return this.overTimeForm.controls;
  }
}
