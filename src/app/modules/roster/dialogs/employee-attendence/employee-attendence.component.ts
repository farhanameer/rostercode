import { AttendanceDataService } from './../../services/data/attendance.data.service';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import  moment  from 'moment';

@Component({
  selector: 'app-employee-attendence',
  templateUrl: './employee-attendence.component.html',
  styleUrls: ['./employee-attendence.component.css']
})
export class EmployeeAttendenceComponent implements OnInit {
  @Input() modelData;
  time_in;
  time_out;
  constructor(private fb:FormBuilder,
              public activeModal: NgbActiveModal, 
              private appLocalStorage : AppLocalStorageService,
              private dataService : AttendanceDataService) { }
  shiftSetUpForm: FormGroup;
  ngOnInit(): void {
    this.time_in = moment(this.modelData.plan_shift_time_in).format('HH:mm');
    this.time_out = moment(this.modelData.plan_shift_time_out).format('HH:mm');
    
    this.shiftSetUpForm = this.fb.group({
      time_in: ['', Validators.required],
      time_out: ['', Validators.required],
    });
    
    console.log("Employee Data", this.modelData);

  }
  submit(){
    console.log(this.shiftSetUpForm);
    const body = {
      "employeeId" : this.modelData.emp_id,
      "current_user_id": this.appLocalStorage.getUserId(),
      "date_in": this.modelData.plan_shift_time_in.split(' ')[0],
      "time_in" : `${this.shiftSetUpForm.get('time_in').value}:00`,
      "date_out" : this.modelData.plan_shift_time_out.split(' ')[0],
      "time_out" : `${this.shiftSetUpForm.get('time_out').value}:00`
    }
    this.updateAttendance(body);
  }

  async updateAttendance(body){
    const res = await this.dataService.updateAttendance(body);
  }
fileChange(e){

}
}