import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayDataService } from '../../services/data/holidays.data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  eventForm: FormGroup;
  @Input() modelData :any;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private holidayService: HolidayDataService
  ) {}

  ngOnInit(): void {
    const holidayData = this.modelData.holiday;
    if(this.modelData) {
      this.eventForm = this.fb.group({
        hdesc: [holidayData.hdesc, Validators.required],
        start_date: [holidayData.start_date, Validators.required],
        end_date: [holidayData.end_date, Validators.required],
      });
    }else{
      this.eventForm = this.fb.group({
        hdesc: ['', Validators.required],
        start_date: [holidayData.start_date, Validators.required],
        end_date: [holidayData.end_date, Validators.required],
      });
    }
    

    console.log('singleDate we got' , this.modelData);
  }

  addEvent() {

    // year: 2021,
    //       country_id: 154,
    //       state_id: -1,
    //       city_id: -1,
    //       loc_id: -1,
    //       department_id: -1,
    this.holidayService.addHoliday({
      start_date: this.eventForm.get('start_date').value,
      end_date: this.eventForm.get('end_date').value,
      hdesc: this.eventForm.get('hdesc').value,
    });
  }

  updateEvent(){
    
  }

  get validateAForm(): any {
    return this.eventForm.controls;
  }

  submit(val) {
    // let start_date = val.start_date;
    // let end_date = val.end_date;
    // let hdesc = val.hdesc;
    // console.log(start_date, end_date, hdesc);
    // alternative way
    // console.log(this.eventForm.get('start_date').value);
    // console.log(this.eventForm.get('end_date').value);
    // console.log(this.eventForm.get('hdesc').value);
    this.addEvent();
  }
}
