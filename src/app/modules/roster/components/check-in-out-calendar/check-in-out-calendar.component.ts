import { RosterService } from './../../services/data/rosterView.data.service';
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
  empRosterArray = [];

  constructor(private calendar: CalendarService, private dataService: RosterService) { }
  
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
      this.getEmpRosterView(this.year_month);
  } 



  getCheckingColor(shift) {
    
    let str = `transparent linear-gradient(180deg, $color 0%, rgba(255, 241, 206, 0) 34%) 0% 0% no-repeat padding-box`
    if(shift.shift_color) {
      str.replace('$color' , shift.shift_color);
      return `transparent linear-gradient(180deg, ${shift.shift_color} 0%, rgba(255, 241, 206, 0) 34%) 0% 0% no-repeat padding-box`
    }
    return 'white'
  }

  async getEmpRosterView(year_month){
    

    const params = {
      "year_month" : year_month
    };

    const data = await this.dataService.getCheckInOutView(params);
    
    this.empRosterArray = data["data"]["payload"]["data"];

    console.log('employee Roster',this.empRosterArray);

    if(!Array.isArray(this.empRosterArray)){
      this.empRosterArray = [];
    }

    this.reshapedData = this.reshapeData(this.currentMonthDates);
  }
  

  getShiftTiming(date){
    if(!date) return null;
    if(date <= 9){
      date = `0${date}`;
    }
    const matchingDate = `${this.year_month}-${date}`;
    
    let shiftTiming = null;
    

    this.empRosterArray.every(empRoster =>{
      if(empRoster.start == matchingDate) {
        const obj = {
          'actual_shift_time_in' : empRoster.actual_shift_time_in,
          'actual_shift_time_out' : empRoster.actual_shift_time_out , 
          'shift_color' : empRoster.shift_color ,
          'shift_name' : empRoster.shift_name
        }

        shiftTiming = obj;
        console.log('foundin matching' , shiftTiming);
        return false;
      }
      return true;
    });

    return shiftTiming;
  }
  reshapeData(array){
    // // debugger;
    let resultingArray = [];
    const responseArray = [];
    const numberOfIterations = array.length / 7;
    let counter = 0;
    for(let i=1; i<= numberOfIterations; i++){
      resultingArray = [];
      for(let j=1; j<=7; j++){
        const shiftTiming = this.getShiftTiming(array[counter].date);
        if(shiftTiming) {
          const obj = {...array[counter] , ...shiftTiming};
          resultingArray.push(obj);
          counter = counter + 1;
        }
        else {
          resultingArray.push(array[counter]);
        counter = counter + 1;
        }
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

    this.getEmpRosterView(this.year_month);
  }
  
  

}
