import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeShiftDataService } from '../../services/data/dropdown.data';

@Component({
  selector: 'app-single-shift-allocation',
  templateUrl: './single-shift-allocation.dialog.html',
  styleUrls: ['./single-shift-allocation.dialog.css']
})
export class SingleShiftAllocationDialog implements OnInit {

  @Input() data;

  shiftAllocate :any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private employeeShiftDataService: EmployeeShiftDataService
  ) { }

  ngOnInit(): void {
    this.getShiftDropdown()
  }

  async getShiftDropdown() {
    this.shiftAllocate = <Array<any>>(await this.employeeShiftDataService.getEmployeeShift({}));
  }

}
