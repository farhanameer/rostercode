import { CalendarService } from './../../services/calander.service';
import { Component, OnInit } from '@angular/core';
import  moment  from 'moment';

@Component({
  selector: 'app-check-in-out-calendar',
  templateUrl: './check-in-out-calendar.component.html',
  styleUrls: ['./check-in-out-calendar.component.css']
})
export class CheckInOutCalendarComponent implements OnInit {

  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  months = new Array(5);
  currentDate: any;
  currentMonthDates: any;
  year_month = '';
  reshapedData : any;

  constructor(private calendar: CalendarService) { }

  ngOnInit(): void {
    this.currentDate = moment();

      this.year_month = moment(this.currentDate).format('YYYY')+'-'+moment(this.currentDate).format('MM');
      
      this.currentMonthDates = this.calendar.getCalendar(
        moment(this.currentDate).format('YYYY'), 
        moment(this.currentDate).format('MMM'), 
        this.weekDays
        );
        
      this.months[0] = moment(this.currentDate).subtract(2,'month').format('MMMM YYYY');
      this.months[1] = moment(this.currentDate).subtract(1,'month').format('MMMM YYYY');
      this.months[2] = moment(this.currentDate).format('MMMM YYYY');
      this.months[3] = moment(this.currentDate).add(1,'month').format('MMMM YYYY');
      this.months[4] = moment(this.currentDate).add(2,'month').format('MMMM YYYY');

      this.reshapedData = this.reshapeData(this.currentMonthDates);
      console.log(this.currentMonthDates);
  }


  reshapeData(array){
    // debugger;
    let resultingArray = [];
    const responseArray = [];
    const numberOfIterations = array.length / 7;
    let counter = 0;
    for(let i=1; i<= numberOfIterations; i++){
      resultingArray = [];
      for(let j=1; j<=7; j++){
        resultingArray.push(array[counter]);
        counter = counter + 1;
      }
      responseArray.push([...resultingArray]);
    }
    console.log('Reshaped Data',responseArray);
    return responseArray;
  }

  getMonthAndYear(isForwarding = false){
    if(isForwarding) {
      this.currentDate = moment(this.currentDate).add(1,'month');
      for(let i = 0; i < 5; i++){
        if(i == 4){
          this.months[i] = moment(this.currentDate).add(2,'month').format('MMMM YYYY');
          continue;
        } 
        this.months[i] = this.months[i+1];       
      }
      console.log(this.months); 
    } else {
      this.currentDate = moment(this.currentDate).subtract(1,'month');
      for(let i = 4; i >= 0; i--){
        if(i == 0){
          this.months[i] = moment(this.currentDate).subtract(2,'month').format('MMMM YYYY');
          continue;
        } 
        this.months[i] = this.months[i-1];       
      }
      console.log(this.months); 
    }

    this.year_month = moment(this.currentDate).format('YYYY')+'-'+moment(this.currentDate).format('MM');
    this.currentMonthDates = this.calendar.getCalendar(moment(this.currentDate).format('YYYY'), moment(this.currentDate).format('MMM'), this.weekDays);
    this.reshapedData = this.reshapeData(this.currentMonthDates);
  }

}
