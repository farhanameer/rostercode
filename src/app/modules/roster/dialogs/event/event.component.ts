import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayDataService } from '../../services/data/holidays.data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private holidayService: HolidayDataService
  ) {}

  ngOnInit(): void {
    this.addEvent();
  }
  addEvent() {
    this.holidayService.addHoliday({
      start_date: '2022-06-01',
      end_date: '2022-06-01',
      hdesc: '11/25/2021',
    });
  }
}
