import  moment  from 'moment';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-shifts-calender',
  templateUrl: 'shifts-calender.component.html',
  styleUrls: ['shifts-calender.component.css']
})
export class ShiftsCalenderComponent implements OnInit {

  months = new Array(5);
  currentDate: any;
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor() { }

  ngOnInit(): void {
      this.currentDate = moment();

      this.months[0] = moment(this.currentDate).subtract(2,'month').format('MMMM YYYY');
      this.months[1] = moment(this.currentDate).subtract(1,'month').format('MMMM YYYY');
      this.months[2] = moment(this.currentDate).format('MMMM YYYY');
      this.months[3] = moment(this.currentDate).add(1,'month').format('MMMM YYYY');
      this.months[4] = moment(this.currentDate).add(2,'month').format('MMMM YYYY');

      console.log(this.months);
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

    //this.calender.getCalendar(moment(this.currentDate).format('YYYY'), moment(this.currentDate).format('MMM'), this.weekDays);
  }

}
