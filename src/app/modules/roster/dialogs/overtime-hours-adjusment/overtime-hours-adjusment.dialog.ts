import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { RosterService } from '../../services/data/roster.dataService';
import { LinkCheckerService } from '../../services/linkChecker.service';

@Component({
  selector: 'app-overtime-hours-adjusment',
  templateUrl: './overtime-hours-adjusment.dialog.html',
  styleUrls: ['./overtime-hours-adjusment.dialog.scss'],
})
export class OvertimeHoursAdjusmentDialog implements OnInit {
  @Input() modelData: any;
  overTimeHoursAdjustmentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private appLocalStorage: AppLocalStorageService,
    private hoursAdjustment: RosterService,
    public linkService : LinkCheckerService
  ) {}

  ngOnInit(): void {
    console.log(this.modelData);
    this.overTimeHoursAdjustmentForm = this.fb.group({
      hours: [this.modelData.overtime, Validators.required],
      toApproveHours: ['', Validators.required],
      note: ['', Validators.required],
    });
  }

  submit() {
    // console.warn(this.overTimeHoursAdjustmentForm.value);
    // const obj = {
    //   employee_id: this.modelData.employee_id,
    //   toApproveHours: this.overTimeHoursAdjustmentForm.value.toApproveHours,
    //   note: this.overTimeHoursAdjustmentForm.value.note,
    //   client_id: this.appLocalStorage.getClientId(),
    //   line_manager_id: this.appLocalStorage.getUserId(),
    // };
    // console.log(obj);
    this.overTimeAdjustmentTest();
  }

  async overTimeAdjustmentTest() {
    let obj = {
      employee_id: this.modelData.employee_id,
      toApproveHours: this.overTimeHoursAdjustmentForm.value.toApproveHours,
      note: this.overTimeHoursAdjustmentForm.value.note,
      client_id: this.appLocalStorage.getClientId(),
      line_manager_id: await this.appLocalStorage.getLineManagerId(),
    };
    const result = await this.hoursAdjustment.getHoursAdjustment(obj);
    if(!result["status"]) return;
    console.log('Approve Hours', result);
    this.activeModal.close(true);
  }

  get validateAForm(): any {
    return this.overTimeHoursAdjustmentForm.controls;
  }
}
