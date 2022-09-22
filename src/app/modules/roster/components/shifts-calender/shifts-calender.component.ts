import { RosterService } from './../../services/data/rosterView.data.service';
import  moment  from 'moment';
import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calander.service';
import { ModalService } from '../../services/modal/modal.service';
import { ShiftManagmentDialog } from '../../dialogs/shift-managment/shift-managment.dialog';

@Component({
  selector: 'app-shifts-calender',
  templateUrl: 'shifts-calender.component.html',
  styleUrls: ['shifts-calender.component.css']
})
export class ShiftsCalenderComponent implements OnInit {

  months = new Array(5);
  currentDate: any;
  currentMonthDates: any;
  reshapedData : any;
  year_month = '';
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private calendar: CalendarService, private dataService: RosterService,
    private customModal: ModalService) { }

  ngOnInit(): void {
      this.currentDate = moment();

      this.year_month = moment(this.currentDate).format('YYYY')+'-'+moment(this.currentDate).format('MM');
      
      this.currentMonthDates = this.calendar.getCalendar(
        moment(this.currentDate).format('YYYY'), 
        moment(this.currentDate).format('MMM'), 
        this.weekDays
        );


        console.log('calendar from moment',this.currentMonthDates);
        
      this.months[0] = moment(this.currentDate).subtract(2,'month').format('MMMM YYYY');
      this.months[1] = moment(this.currentDate).subtract(1,'month').format('MMMM YYYY');
      this.months[2] = moment(this.currentDate).format('MMMM YYYY');
      this.months[3] = moment(this.currentDate).add(1,'month').format('MMMM YYYY');
      this.months[4] = moment(this.currentDate).add(2,'month').format('MMMM YYYY');
        
      
      
      console.log(this.getLMRosterView(this.year_month));
  }

  lmRosterViewArray : [] = [];

  getRosterShiftsByDate(date){
    let foundData = [];
    console.log('lm view Array' , this.lmRosterViewArray);
    this.lmRosterViewArray.every(singleShift =>{
      if(date == singleShift["date"]){
        console.log('data' , singleShift["date"])
        foundData = singleShift["shifts"];
        return false;
      }
      return true;
    });

    return foundData;
  }

  async getLMRosterView(year_month){
    const data = await this.dataService.getLMRosterView(year_month);
    
    this.lmRosterViewArray = data["data"]["payload"];

    if(!Array.isArray(this.lmRosterViewArray)){
      this.lmRosterViewArray = [];
    }
    this.reshapedData = this.reshapData(this.currentMonthDates);
  }

  calendarArray : any = [];

  reshapData(array){
    let resultingArray = [];
    const responseArray = [];
    const numberOfIterations = array.length / 7;
    let counter = 0;
    for(let i=1; i<= numberOfIterations; i++){
      resultingArray = [];
      for(let j=1; j<=7; j++){
        const calendarData = array[counter];
        let date;
        calendarData["shifts"] = [];
        if(calendarData["date"] && calendarData["date"] <=9){
          date = `${this.year_month}-0${calendarData["date"]}`;
        } else{
          date = `${this.year_month}-${calendarData["date"]}`;
        }
        if(calendarData["date"]){
          console.log(date);
          calendarData["shifts"]  = this.getRosterShiftsByDate(date);
          console.log(calendarData["shifts"].length);
        }
        resultingArray.push(array[counter]);
        counter = counter + 1;
      }
      responseArray.push([...resultingArray]);
    }
    console.log('shifts Data',responseArray);
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
    this.getLMRosterView(this.year_month);
  }

  mouseDown:boolean = false;
  mouseStart : any ;
  mouseEnd :any ;
  obj={
    start : 0 , 
    end : 0
  }
  checkIfOK(date){
    if(date && (date >= this.obj.start && date<= this.obj.end)){
      return true;
    }
    return false;
  }
  onDragStart(event){
    this.mouseStart = event;
    this.mouseDown = true;
    this.obj.start = this.mouseStart;
  }
  onDrag(event){

    if(!this.mouseDown) return;
    this.obj.end = event;
  }
  onDragOver(event){
    if(!this.mouseDown) return;
    this.mouseDown = false;
    this.mouseEnd = event;
    this.obj.end = this.mouseEnd;
    
    for(let i = this.mouseStart; i<=this.mouseEnd; i++){
      console.log('dates' , `${this.year_month}-${i}`);
    }

  }
  onDragDrop(event){
    console.log('on drag drop')
  }
  onDragEnd(event){
    console.log('on drage end')
  }


  // dialog open function below:
  openManagement(){
    this.customModal.showFeaturedDialog(ShiftManagmentDialog,"");
  }
  
}
