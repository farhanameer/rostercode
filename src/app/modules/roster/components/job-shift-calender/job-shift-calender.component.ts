import { CalendarService } from './../../services/calander.service';
import { Component, Input, OnInit } from '@angular/core';
import  moment  from 'moment';
import { EventComponent } from '../../dialogs/event/event.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal/modal.service';
import { HolidayDataService } from '../../services/data/holidays.data.service';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { CalenderSetupComponent } from '../../dialogs/calender-setup/calender-setup.component';

@Component({
  selector: 'app-job-shift-calender',
  templateUrl: './job-shift-calender.component.html',
  styleUrls: ['./job-shift-calender.component.scss']
})
export class JobShiftCalenderComponent implements OnInit {

  holidaysArray : [] = [];
  years = new Array(5);
  currentDate: any;
  currentYearData: any;
  year_month = '';
  weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  weekDaysPreset = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  monthsNames = ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  filters : any;
  currentYearMonthsData : any;

  months = {
    'Jan' : '01',
    'Feb' : '02' , 
    'Mar' : '03',
    'Apr' : '04',
    'May' : '05',
    'Jun' : '06',
    'Jul' : '07',
    'Aug' : '08',
    'Sep' : '09',
    'Oct' : '10',
    'Nov' : '11',
    'Dec' : '12'
  };

  constructor(private calendar: CalendarService,public activeModal: NgbActiveModal,
    private customModal: ModalService , private holidayService : HolidayDataService , private appLocalStorage : AppLocalStorageService) { }

  filterChange($event){
    console.log('in job shift calendar',$event);
    this.filters = $event;
    const year = moment(this.currentDate).format('YYYY');
    this.getHolidays(year);
  }
  ngOnInit(): void {

      this.currentDate = moment();
      this.year_month = moment(this.currentDate).format('YYYY')+'-'+moment(this.currentDate).format('MM');
      
      this.years[0] = moment(this.currentDate).subtract(2,'years').format('YYYY');
      this.years[1] = moment(this.currentDate).subtract(1,'years').format('YYYY');
      this.years[2] = moment(this.currentDate).format('YYYY');
      this.years[3] = moment(this.currentDate).add(1,'years').format('YYYY');
      this.years[4] = moment(this.currentDate).add(2,'years').format('YYYY');
      
      // this.currentYearData = this.calendar.getCalendar(moment(this.currentDate).format('YYYY'), null, this.weekDaysPreset);
      this.getCalendar(moment(this.currentDate).format('YYYY'))
      console.log(this.currentYearData);
  }

  
  holidaysHash = {};
  getCalendar(year){
    this.currentYearData = this.calendar.getCalendar(year, null, this.weekDaysPreset);
    this.currentYearMonthsData = [...this.currentYearData];
    this.getHolidays(year);
  }
  async getHolidays(year){
    const params = {
      'client_id' : this.appLocalStorage.getClientId(),
      'year' : year , 
      "glob_mkt_id": this.filters.marketId,
      "region_id": this.filters.clusterId,
      "sub_region_id": this.filters.subClusterId,
      "country_id": this.filters.countryId,
      "state_id": this.filters.stateId,
      "city_id": this.filters.cityId,
      "loc_id": this.filters.branchId,
      "department_id": this.filters.departmentId
    }
    const holidays = await this.holidayService.getHoliday(params);
    console.log('holidays' , holidays);
    console.log('current year and month' , this.year_month);
    if(!holidays["status"]) return; // possible error

    this.holidaysArray = holidays["data"];
    this.holidaysHash = {};

    this.holidaysArray.forEach(holiday =>{
      const month = moment(holiday["start_date"]).format('MM');
      if(!this.holidaysHash[month]){
        this.holidaysHash[month] = this.checkHolidaysInRange(holiday);
        return;
      }else{
        const prevHolidays = this.holidaysHash[month];
      const newHolidays = this.checkHolidaysInRange(holiday);
      console.log('previous Holiday' , prevHolidays);
      this.holidaysHash[month] = {...prevHolidays , ...newHolidays};
      }
      
    });
    console.log('holidays Hash' , this.holidaysHash);
    this.currentYearData = this.calendar.getCalendar(year, null, this.weekDaysPreset);
    this.currentYearData.forEach((month , monthIndex) =>{


      
      
      let currentMonth = this.months[month.monthName];
      
      
      if(this.holidaysHash[currentMonth]){
        
        const monthHash = this.holidaysHash[currentMonth];
        
        month.totalDaysInMonth.forEach((day , dayIndex) =>{
          
          let key = '';
          if(day.date && day.date<=9){
            key = `${year}-${currentMonth}-0${day.date}`;
          }else{
            key = `${year}-${currentMonth}-${day.date}`;
          }
          if(monthHash[key]){
            day = {...day , ...monthHash[key]}
            
            this.currentYearData[monthIndex].totalDaysInMonth[dayIndex] = {...day , ...monthHash[key]};
          }else{
            day = {day : day.day , date : day.date};
            
            this.currentYearData[monthIndex].totalDaysInMonth[dayIndex] = {day : day.day , date : day.date};
          }
        });
        
      }
    });
    

    console.log('year Data' , this.currentYearData);
  }

  checkHolidaysInRange(holiday){
    if(holiday.start_date == holiday.end_date){
      const hash = {}
      hash[holiday.start_date] = holiday;
      return hash;
    }
    const end = holiday.end_date;
    let start = moment(holiday.start_date);
    const hash = {};
    for(var date = start.format('YYYY-MM-DD'); start.format('YYYY-MM-DD')<=end;){
      hash[start.format('YYYY-MM-DD')] = holiday;
      start = start.add(1,'day');
    }
    return hash;
    
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
    const year = moment(this.currentDate).format('YYYY');
    this.getCalendar(year);

    // this.currentYearData = this.calendar.getCalendar(moment(this.currentDate).format('YYYY'), null, this.weekDaysPreset);
  }
  
  
    open(singleDate , yearData, open = false){
      console.log(yearData);
      // const key = `${year}`
      const year = moment(this.currentDate).format('YYYY');
      const month = this.months[yearData.monthName];
      let day = singleDate.date;
      if(singleDate.date <=9){
        day = `0${day}`
      }

      const date = `${year}-${month}-${day}`;
      if(!singleDate.date) return;
      if(singleDate.start_date && !open) return;
      this.customModal.showFeaturedDialog(EventComponent,"" , {
        holiday : {
          start_date: date , 
          end_date : date
        }, 
        filters : this.filters
      });
    }
    edit(singleDate){
      this.customModal.showFeaturedDialog(EventComponent,"" , {
        holiday : singleDate, 
        filters : this.filters
      });
    }
    async delete(singleDate){
      const response = await this.holidayService.deleteHoliday({
        id : singleDate.holiday_id , 
        client_id : this.appLocalStorage.getClientId()
      });
      console.log('delete response',response);
      if(!response["status"]) return; // posible error message
      singleDate = {
        day : singleDate.day , 
        date : singleDate.date
      }
    }
  // *** shift calendar pop up
  openCalendar(){
    this.customModal.showFeaturedDialog(CalenderSetupComponent,"")
  }
  }

