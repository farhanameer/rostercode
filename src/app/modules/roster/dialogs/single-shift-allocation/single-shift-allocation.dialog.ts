import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeShiftDataService } from '../../services/data/dropdown.data';

@Component({
  selector: 'app-single-shift-allocation',
  templateUrl: './single-shift-allocation.dialog.html',
  styleUrls: ['./single-shift-allocation.dialog.css']
})
export class SingleShiftAllocationDialog implements OnInit {

  singleShiftForm: FormGroup;

  @Input() data;

  shiftAllocate :any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private employeeShiftDataService: EmployeeShiftDataService,private fb: FormBuilder,
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
    console.warn(this.singleShiftForm.value)
  }

}
