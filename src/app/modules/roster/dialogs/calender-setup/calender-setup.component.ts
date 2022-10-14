import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { HolidayDataService } from './../../services/data/holidays.data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calender-setup',
  templateUrl: './calender-setup.component.html',
  styleUrls: ['./calender-setup.component.css']
})
export class CalenderSetupComponent implements OnInit {
  workCalenderSetupForm:FormGroup
  weekDays = [];
  constructor(private fb:FormBuilder, public activeModal: NgbActiveModal,
    private holiday: HolidayDataService,
    private appLocalStorage : AppLocalStorageService) { }

  ngOnInit(): void {
    this.workCalenderSetupForm=this.fb.group({
      periodStartYear:["",Validators.required],
      periodEndYear:["",Validators.required],
      weekend:["",Validators.required],
      halfDay:["",Validators.required],
      from:["",Validators.required],
      to:["",Validators.required]


    });

    this.weekends();
    this.getWorkCalendarSetting();
    this.workCalendarSetting();
  }

  async workCalendarSetting(){
    const body = {
      "workCalendarSetting": {
          "client_id": 48,
          "wday_id": "0",
          "half_day_id": "6",
          "half_time_in": "09:00",
          "half_time_out": "14:30",
          "startYear": 2022,
          "endYear": 2022,
          "glob_mkt_id": -1,
          "region_id": -1,
          "sub_region_id": -1,
          "country_id": 154,
          "state_id": -1,
          "city_id": -1,
          "loc_id": -1,
          "department_id": -1
      },
      "publicHolidays": [
          {
              "name": "Allama Iqbal Day",
              "holiday_id": 8,
              "status": 1
          },
          {
              "name": "Ashura",
              "holiday_id": 7,
              "status": 1
          },
          {
              "name": "Eid Milad-un-Nabi ",
              "holiday_id": 9,
              "status": 1
          },
          {
              "name": "Eid-ul-Azha",
              "holiday_id": 6,
              "status": 1
          },
          {
              "name": "Eid-ul-fitr",
              "holiday_id": 4,
              "status": 1
          },
          {
              "name": "Independance Day",
              "holiday_id": 5,
              "status": 1
          },
          {
              "name": "Kashmir Day",
              "holiday_id": 1,
              "status": 1
          },
          {
              "name": "Labour Day",
              "holiday_id": 3,
              "status": 1
          },
          {
              "name": "Pakistan Day",
              "holiday_id": 2,
              "status": 1
          },
          {
              "name": "Quaid-e-Azam Day",
              "holiday_id": 10,
              "status": 1
          }
      ]
  }
    const res = await this.holiday.workCalendarSetting(body);
    
  }

  async getWorkCalendarSetting(){
    const params = {
      "client_id" : this.appLocalStorage.getClientId(),
      "year" : 2022,
      "country_id" : 154
    }
    const res = await this.holiday.getWorkCalendarSetting(params); 
  }
  
  async weekends(){
    const params = {name: null};
    const res = await this.holiday.getWeekends(params);
    let weekData = res['data'];

    const weekDaysArray = [];
    weekData.forEach(day =>{
      weekDaysArray.push({ 
        id: day.wid,
        name : day.wday
      })
    });
    console.log(weekDaysArray);
    this.weekDays = weekDaysArray;
    
  }

  get validateAForm(): any {
    return this.workCalenderSetupForm.controls
  }

  submit(){
    console.warn(this.workCalenderSetupForm.value)
  }

}
