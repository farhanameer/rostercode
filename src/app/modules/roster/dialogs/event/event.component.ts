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
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  eventForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private holidayService: HolidayDataService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      hdesc: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  addEvent() {
    this.holidayService.addHoliday({
      start_date: this.eventForm.get('start_date').value,
      end_date: this.eventForm.get('end_date').value,
      hdesc: this.eventForm.get('hdesc').value,
    });
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
