import { RosterService } from './../../services/data/rosterView.data.service';
import  moment  from 'moment';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarService } from '../../services/calander.service';
import { ModalService } from '../../services/modal/modal.service';
import { ShiftManagmentDialog } from '../../dialogs/shift-managment/shift-managment.dialog';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';

@Component({
  selector: 'app-shifts-calender',
  templateUrl: 'shifts-calender.component.html',
  styleUrls: ['shifts-calender.component.css']
})
export class ShiftsCalenderComponent implements OnInit , OnChanges {

  months = new Array(5);
  currentDate: any;
  currentMonthDates: any;
  reshapedData : any;
  year_month = '';
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  @Input() filters : any = null;

  constructor(private calendar: CalendarService, private dataService: RosterService,
    private customModal: ModalService, private appLocalStorage: AppLocalStorageService ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('filters getting changed' , this.filters);
    if(this.filters && (Object.entries(this.filters).length!=0)) {
      console.log('after filter selection');
      this.getLMRosterView({
        "client_id" :this.appLocalStorage.getClientId(),
        "year_month" : this.year_month, 
        "reporting_to_id" : this.appLocalStorage.getUserId()
      });
    }
  }

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
        
      
      
      this.getLMRosterView({
        "client_id" :this.appLocalStorage.getClientId(),
        "year_month" : this.year_month,
        "reporting_to_id" : this.appLocalStorage.getUserId()
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent) {


    // console.log('event paths' , event);
    // console.log('composed path',event.composedPath());
    // console.log('event paths' , event['path']);


    var paths = event.composedPath() as any;

    // if(event.composedPath())

    var inComponent = false;
    paths.forEach((path) => {
      if (path.tagName != undefined) {
        var tagName = path.tagName.toString().toLowerCase();
        // if (tagName == 'app-shifts-calender') inComponent = true;
        if (tagName == 'app-employee-shift-list') inComponent = true;
       
      }
    });

    if (inComponent) {
      console.log('clicked inside');
      
    } else {
      console.log('clicked inside');
      this.show = false;
    }
  }

  lmRosterViewArray : [] = [];

  getRosterShiftsByDate(date){
    let foundData = [];
    
    this.lmRosterViewArray.every(singleShift =>{
      if(date == singleShift["date"]){
        
        foundData = singleShift["shifts"];
        return false;
      }
      return true;
    });

    return foundData;
  }

  async getLMRosterView(params){

    if(this.filters) {
      if(this.filters["employeeType"] !=undefined) {
        params['is_roster_employees'] = this.filters["employeeType"]
      }
      if(this.filters["reportingLevel"]) {
        params['reporting'] = this.filters["reportingLevel"]
      }

      if(this.filters["department"]) {
        params['department'] = this.filters["department"]
      }
      if(this.filters["employees"]) {
        params['employee_id'] = this.filters["employees"]
      }
      if(this.filters["shifts"]) {
        params['shift_id'] = this.filters["shifts"]
      }
    }
    const data = await this.dataService.getLMRosterView(params);
    
    this.lmRosterViewArray = data["data"]["payload"];

    if(!Array.isArray(this.lmRosterViewArray)){
      this.lmRosterViewArray = [];
    }
    this.reshapedData = this.reshapeData(this.currentMonthDates);
    console.log('reshaped data',this.reshapedData);
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
          
          calendarData["shifts"]  = this.getRosterShiftsByDate(date);
          
        }
        resultingArray.push(array[counter]);
        counter = counter + 1;
      }
      responseArray.push([...resultingArray]);
    }
    
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
      
    }

    this.year_month = moment(this.currentDate).format('YYYY')+'-'+moment(this.currentDate).format('MM');
    this.currentMonthDates = this.calendar.getCalendar(moment(this.currentDate).format('YYYY'), moment(this.currentDate).format('MMM'), this.weekDays);
    this.getLMRosterView({
      "client_id" :this.appLocalStorage.getClientId(),
      "year_month" : this.year_month,
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
  startIndex = null;
  hoveredOnDate = false;
  preventOpningDialoug = false;
  startingPointer : any = null;
  wasDragged : boolean = false;
  onDragStart(event , index , actualEvent){
    console.log('current index',index);
    this.startingPointer = actualEvent;
    console.log('total indexes', this.reshapedData.length);
    if(event){
      this.hoveredOnDate = true;
    }
    this.startIndex = index;
    this.mouseStart = event;
    this.mouseDown = true;
    this.obj.start = this.mouseStart;
    this.obj.end = this.mouseStart;
    this.resetColor = false;
    
  }
  
  getPoint(array , index = 0){
    let point = null;
    if(index == 0){
      array.every(item=>{
        if(item.date){
          point = item.date;
          return false;
        }
        return true;
      });
      return point;
    }
    
    array.forEach(item =>{
      if(item.date){
        point = item.date;
      }
    });
    return point;
  }
  
  onDrag(event , index){
   
    if(!event && this.startIndex == index){
      this.preventOpningDialoug = true;
      console.log('prevention',index);
    }else{
      this.preventOpningDialoug = false;
    }
    if(!this.mouseDown) return;

    this.wasDragged = true;
    if(event) this.hoveredOnDate = true;
    
    console.log('mouse was');
    
    if(!this.mouseStart && event) {
      this.mouseStart= this.getPoint(this.reshapedData[this.startIndex] , this.startIndex);
      this.obj.start = this.mouseStart;
    }
    if(!event && this.hoveredOnDate){
      this.obj.end = this.getPoint(this.reshapedData[index] , index);
      return;  
    }
    this.obj.end = event ? event : this.obj.end;
    console.log(this.obj.start);
    console.log(this.obj.end);
  }
  
  mouseLeft(){
    this.mouseDown = false;
    this.mouseDown = false;
    this.mouseEnd = null;
    this.obj.end = 0;
    this.obj.start = 0;
    this.mouseStart = null;
    this.resetColor = true;
    this.hoveredOnDate = false;
    this.wasDragged = false;
  }
  checkIfOpenEmp(event){
    if(event.target.id == 'shiftName' || event.target.id == 'empCount' || event.target.id == 'openEmpLogs'){
      return event.target.id;
    }
    return Math.random();
  }
  onDragOver(event , actualEvent){

    console.log('called first ');
    if(!this.mouseDown) return;
    this.mouseDown = false;
    this.mouseDown = false;
    this.mouseEnd = event;
    this.hoveredOnDate = false;
    this.obj.end = event ? event : this.obj.end;
    console.log('obj values pluse mouse' , this.mouseStart , this.obj.end);

    if(this.startingPointer.target == actualEvent.target && !this.wasDragged && (this.checkIfOpenEmp(this.startingPointer) == this.checkIfOpenEmp(actualEvent))){
      return;
    }
    this.startingPointer = null;
    this.wasDragged = false;
    if(this.preventOpningDialoug) return;
    if(!this.mouseStart && !this.obj.end) return;

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

    this.obj.end = 0;
    this.obj.start = 0;
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
    const payload = {
      dateRagne : dateRange , 
      filters : this.filters
    }
    this.customModal.showFeaturedDialog(ShiftManagmentDialog,"" , payload);
  }


  top:any;
  bottom : any;
  left : any;
  show:boolean = false;
  employees : any = [];
  date : any;

  onEvent(event, date = null , shifts , isSingle = false) {
    console.log(shifts);
    this.employees = [];
    if(isSingle){
      shifts.employees.forEach(emp =>{
        this.employees.push(emp);
      });
    }else{
      shifts.forEach(s =>{
        s.employees.forEach(emp =>{
          this.employees.push(emp);
        });
      });
    }
    console.log('we got employees',this.employees);
    console.log('event' , event.clientX , event.clientY);
    console.log(`${this.year_month}-${date}`);

    var dt = moment(`${this.year_month}-${date}`, "YYYY-MM-DD");
    this.date = `${dt.format('dddd')} , ${date} ${dt.format('MMMM')} ${dt.format('YYYY')}`;

    const elementRect = event.target.getBoundingClientRect();
    const spaceAbove = elementRect.top;
    const spaceBelow = window.innerHeight - elementRect.bottom;

    console.log('below',spaceBelow);
    console.log('above',spaceAbove);

    if(spaceBelow >= 255){
      this.top = `${event.clientY}px`;
      this.left = `${event.clientX}px`;
      // empList.style.top = `${event.clientY}px`;
      // empList.style.left = `${event.clientX}px`;
      // empList.style.bottom = null;
      this.bottom = null;
      
    }else{
      this.bottom = `${spaceBelow}px`;
      this.left = `${event.clientX}px`;
      this.top = null;
      // empList.style.bottom = `${spaceBelow}px`;
      // empList.style.left = `${event.clientX}px`;
      // empList.style.top = null;
     
    }
    // console.log('bouding rectangles',event.target.getBoundingClientRect());
    // console.log(empList.classList);
    // empList.classList.remove('d-none');
    // event.stopPropagation();
    setTimeout(() => {
      this.show = true;
    }, 200);
  }
  
}
