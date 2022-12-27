import moment from 'moment';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { HolidayDataService } from './../../services/data/holidays.data.service';
import { Component, Input, OnInit } from '@angular/core';
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
  years = [];
  current;
  holidayStatus = [];
  workCalendarSetting = {};
  @Input() modelData = {};

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
    this.getYears();
    this.weekends();
    this.getWorkCalendarSetting();

    console.log(this.modelData);
  }

  
  getYears(){
    this.current = moment();
    let obj = {
      id : moment(this.current).format('YYYY'),
      name :  moment(this.current).format('YYYY')
    }
    this.years.push(obj);

    for(let i = 1; i < 10; i++){
      this.current = moment(this.current).add(1, 'year').format('YYYY');
      this.years.push({
        id : this.current,
        name : this.current
      })
    }
    console.log(this.years);
  }

  async postWorkCalendarSetting(body){
    const res = await this.holiday.workCalendarSetting(body);
    if(res['status']){
      this.activeModal.close(true);
    }    
  }

  selectionChange(value,holiday){
    console.log(value, holiday);
    if(value){
      holiday.status = 1;
    }else{
      holiday.status = 0;
    }
    console.log("Holidays",this.holidayStatus);
  }

  async getWorkCalendarSetting(){

    const params = {
      "client_id" : this.appLocalStorage.getClientId(),
      "year" : this.modelData['year'],
      "country_id" : this.modelData['country_id']
    }
    console.log("Country Year", params);
    const res = await this.holiday.getWorkCalendarSetting(params); 
    // this.holidayStatus = res['data'].publicHolidays;
    const holidays = res['data'].publicHolidays;
    
    let counter = Math.ceil(holidays.length/5);
    // let holidayStatus2 = [];
    let loopCounter = 0;
    for(let i = 1; i<=counter; i++){
      let array = [];
      for(let j = 0; j<5; j++){
        if(holidays[loopCounter]){
          array.push(holidays[loopCounter]);
        }
        loopCounter = loopCounter + 1;
      }
      
      this.holidayStatus.push(array);
      
    }
    console.log("Holiday Status Array",this.holidayStatus);
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
    console.warn(this.workCalenderSetupForm.value);
    this.workCalendarSetting = {
      "client_id" : this.appLocalStorage.getClientId(),
      "wday_id": this.workCalenderSetupForm.value.weekend.toString(),
      "half_day_id": this.workCalenderSetupForm.value.halfDay.toString(),
      "half_time_in": this.workCalenderSetupForm.value.from,
      "half_time_out": this.workCalenderSetupForm.value.to,
      "startYear": this.workCalenderSetupForm.value.periodStartYear,
      "endYear": this.workCalenderSetupForm.value.periodEndYear,
      // "glob_mkt_id": -1,
      // "region_id": -1,
      // "sub_region_id": -1,
      // "country_id": 154,
      // "state_id": -1,
      // "city_id": -1,
      // "loc_id": -1,
      // "department_id": -1

      "glob_mkt_id": this.modelData["filters"].marketId,
      "region_id": this.modelData["filters"].clusterId,
      "sub_region_id": this.modelData["filters"].subClusterId,
      "country_id": this.modelData["filters"].countryId,
      "state_id": this.modelData["filters"].stateId,
      "city_id": this.modelData["filters"].cityId,
      "loc_id": this.modelData["filters"].branchId,
      "department_id": this.modelData["filters"].departmentId
    }
    console.log(this.workCalendarSetting);
    let publicHolidays = [];
    this.holidayStatus.forEach(array =>{
      publicHolidays = [...publicHolidays , ...array];
    });
    const body = {
      workCalendarSetting : this.workCalendarSetting,
      publicHolidays : publicHolidays
    }

    this.postWorkCalendarSetting(body);
  }

}
