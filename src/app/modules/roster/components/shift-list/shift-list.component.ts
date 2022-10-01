import { Component, OnInit } from '@angular/core';
import { HolidayDataService } from '../../services/data/holidays.data.service';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css'],
})
export class ShiftListComponent implements OnInit {
  constructor(private holidayService: HolidayDataService) {}

  ngOnInit(): void {}
}
