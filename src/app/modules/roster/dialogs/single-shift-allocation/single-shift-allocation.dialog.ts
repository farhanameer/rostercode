import { RosterService } from './../../services/data/rosterView.data.service';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { Component, Input, OnInit } from '@angular/core';
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

  @Input() data;

  shiftAllocate :any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private employeeShiftDataService: EmployeeShiftDataService,
    private fb: FormBuilder,
    private appLocalStorage : AppLocalStorageService,
    private rosterService : RosterService
  ) { }

  ngOnInit(): void {
    this.getShiftDropdown()
    this.singleShiftForm=this.fb.group({
      date:["",Validators.required],
      allocateShift:["",Validators.required]
    })
  }

  async getShiftDropdown() {
    this.shiftAllocate = <Array<any>>(await this.employeeShiftDataService.getEmployeeShift({}));
  }


  get validateAForm(): any {
    return this.singleShiftForm.controls
  }

  submit(){

    this.singleShiftForm.value.date = moment(this.singleShiftForm.value.date).format("YYYY-MM-DD");

    const body = {
      "client_id" : this.appLocalStorage.getClientId(),
      "linemanager_id" : this.appLocalStorage.getUserId(),
      "shift_id" : 7,
      "employee_id" : this.data.employee_id,
      "rosterDate" : this.singleShiftForm.value.date,
      "additional_shift_id" : this.singleShiftForm.value.allocateShift
    }
    this.assignShift(body);
  }

  async assignShift(body){
    const res = await this.rosterService.assignAddtionalShift(body);
    debugger;
  }  

}
