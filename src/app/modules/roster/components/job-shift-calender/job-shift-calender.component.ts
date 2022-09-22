import { CalendarService } from './../../services/calander.service';
import { Component, OnInit } from '@angular/core';
import  moment  from 'moment';

@Component({
  selector: 'app-job-shift-calender',
  templateUrl: './job-shift-calender.component.html',
  styleUrls: ['./job-shift-calender.component.css']
})
export class JobShiftCalenderComponent implements OnInit {

  years = new Array(5);
  currentDate: any;
  currentYearData: any;
  year_month = '';
  weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  weekDaysPreset = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];;
  
  monthsNames = ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor(private calendar: CalendarService) { }

  ngOnInit(): void {

      this.currentDate = moment();
      this.year_month = moment(this.currentDate).format('YYYY')+'-'+moment(this.currentDate).format('MM');
      
      this.years[0] = moment(this.currentDate).subtract(2,'years').format('YYYY');
      this.years[1] = moment(this.currentDate).subtract(1,'years').format('YYYY');
      this.years[2] = moment(this.currentDate).format('YYYY');
      this.years[3] = moment(this.currentDate).add(1,'years').format('YYYY');
      this.years[4] = moment(this.currentDate).add(2,'years').format('YYYY');
      
      this.currentYearData = this.calendar.getCalendar(moment(this.currentDate).format('YYYY'), null, this.weekDaysPreset);
      console.log(this.currentYearData);
    }

  getMonthAndYear(isForwarding = false){
    // debugger;
    if(isForwarding) {
      this.currentDate = moment(this.currentDate).add(1,'year');
      for(let i = 0; i < 5; i++){
        if(i == 4){
          this.years[i] = moment(this.currentDate).add(2,'year').format('YYYY');
          continue;
        } 
        this.years[i] = this.years[i+1];       
      } 
    } else {
      this.currentDate = moment(this.currentDate).subtract(1,'year');
      for(let i = 4; i >= 0; i--){
        if(i == 0){
          this.years[i] = moment(this.currentDate).subtract(2,'year').format('YYYY');
          continue;
        } 
        this.years[i] = this.years[i-1];       
      } 
    }
    this.currentYearData = this.calendar.getCalendar(moment(this.currentDate).format('YYYY'), null, this.weekDaysPreset);
  }
  

}
