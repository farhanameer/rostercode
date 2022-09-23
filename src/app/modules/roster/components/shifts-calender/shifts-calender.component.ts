import { RosterService } from './../../services/data/rosterView.data.service';
import  moment  from 'moment';
import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calander.service';
import { ModalService } from '../../services/modal/modal.service';
import { ShiftManagmentDialog } from '../../dialogs/shift-managment/shift-managment.dialog';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';

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
    private customModal: ModalService, private appLocalStorage: AppLocalStorageService) { }

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
        
      
      
      this.getLMRosterView({
        "client_id" :this.appLocalStorage.getClientId(),
        "year_month" : this.year_month,
        "is_roster_employees" : 1 , 
        "reporting_to_id" : this.appLocalStorage.getUserId()
    });
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

  async getLMRosterView(params){
    const data = await this.dataService.getLMRosterView(params);
    
    this.lmRosterViewArray = data["data"]["payload"];

    if(!Array.isArray(this.lmRosterViewArray)){
      this.lmRosterViewArray = [];
    }
    this.reshapedData = this.reshapeData(this.currentMonthDates);
  }

  calendarArray : any = [];

  reshapeData(array){
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
    this.getLMRosterView({
      "client_id" :this.appLocalStorage.getClientId(),
      "year_month" : this.year_month,
      "is_roster_employees" : 1 , 
      "reporting_to_id" : this.appLocalStorage.getUserId()
  });
  }

  mouseDown:boolean = false;
  mouseStart : any ;
  mouseEnd :any ;
  obj={
    start : 0 , 
    end : 0
  }
  resetColor : boolean = false;
  checkIfOK(date){
    if(this.resetColor) return false;
    if(this.obj.start < this.obj.end) {

    
    if(date && (date >= this.obj.start && date<= this.obj.end)){
      return true;
    }
    return false;
    }
    else if(this.obj.start > this.obj.end) {

    
      if(date && (date <= this.obj.start && date>= this.obj.end)){
        return true;
      }
      return false;
      }
  }
  onDragStart(event){
    this.mouseStart = event;
    this.mouseDown = true;
    this.obj.start = this.mouseStart;
    this.resetColor = false;
    
  }
  onDrag(event){

    if(!this.mouseDown) return;
    
    this.obj.end = event ? event : this.obj.end;
  }
  
  onDragOver(event){
    if(!this.mouseDown) return;
    this.mouseDown = false;
    this.mouseEnd = event;
    this.obj.end = event ? event : this.obj.end;

    if(this.mouseStart <='9') {
      this.mouseStart = `0${this.mouseStart}`
    }
    if(this.obj.end as any <='9') {
      this.obj.end  = `0${this.obj.end}` as any;
    }

    let start = `${this.year_month}-${this.mouseStart}`;
    let end = `${this.year_month}-${this.obj.end}`;

    console.log('mouseStart',`${this.year_month}-${this.mouseStart}`);
    console.log('mouseEnd' , `${this.year_month}-${this.obj.end}`);


    
    if(!(start < end)){
      const date = end;
      end = start;
      start = date;
    }


    console.log('mouseStart after',start);
    console.log('mouseEnd after' , end);

    
    this.resetColor = true;
    this.openManagement({
      start : start , 
      end : end
    });




    // for(let i = this.mouseStart; i<=this.mouseEnd; i++){
    //   console.log('dates' , `${this.year_month}-${i}`);
    // }

  }
  onDragDrop(event){
    console.log('on drag drop')
  }
  onDragEnd(event){
    console.log('on drage end')
  }


  // dialog open function below:
  openManagement(dateRange){
    
    this.customModal.showFeaturedDialog(ShiftManagmentDialog,"" , dateRange);
  }
  
}
