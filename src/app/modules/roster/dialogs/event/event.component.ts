import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { HolidayDataService } from '../../services/data/holidays.data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  eventForm: FormGroup;
  @Input() modelData :any;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private holidayService: HolidayDataService
  ) {}
  year : any;
  filters : any;
  isUpdating : Boolean = false;
  ngOnInit(): void {
    const holidayData = this.modelData.holiday;
    if(this.modelData) {
      this.eventForm = this.fb.group({
        hdesc: [holidayData.hdesc, Validators.required],
        start_date: [holidayData.start_date, Validators.required],
        end_date: [holidayData.end_date, Validators.required],
      });
    }else{
      this.eventForm = this.fb.group({
        hdesc: ['', Validators.required],
        start_date: [holidayData.start_date, Validators.required],
        end_date: [holidayData.end_date, Validators.required],
      });
    }

    if(this.modelData && this.modelData.holiday && this.modelData.holiday.holiday_id){
      this.isUpdating = true;
    }

    this.year = moment(holidayData.start_date).format('YYYY');

    this.filters = this.modelData.filters;


    console.log('singleDate we got' , this.modelData);
  }

  async addEvent() {

    // year: 2021,
    //       country_id: 154,
    //       state_id: -1,
    //       city_id: -1,
    //       loc_id: -1,
    //       department_id: -1,



  //   {
  //     "year": 2021,
  //     "start_date": "2022-10-04",
  //     "end_date": "2022-10-26",
  //     "hdesc": "11/25/2021",
  //     "country_id": 154,
  //     "state_id": -1,
  //     "city_id": -1,
  //     "loc_id": -1,
  //     "department_id": -1,
  //     "client_id": 48,
  //     "glob_mkt_id" : -1,
  //     "region_id":-1,
  //     "sub_region_id":-1,
  //     "created_by" : 2335
  // }
    await this.holidayService.addHoliday({
      start_date: this.eventForm.get('start_date').value,
      end_date: this.eventForm.get('end_date').value,
      hdesc: this.eventForm.get('hdesc').value,
      year : this.year , 
      country_id : this.filters.countryId , 
      state_id : this.filters.stateId , 
      city_id : this.filters.cityId , 
      loc_id : this.filters.branchId , 
      department_id : this.filters.departmentId , 
      glob_mkt_id : this.filters.marketId , 
      region_id : this.filters.clusterId , 
      sub_region_id : this.filters.subClusterId
    });
    this.activeModal.close('Close click')
  }

  async updateEvent(){
    this.holidayService.updateHoliday({
      id : this.modelData.holiday.holiday_id ,
      start_date: this.eventForm.get('start_date').value,
      end_date: this.eventForm.get('end_date').value,
      hdesc: this.eventForm.get('hdesc').value,
      year : this.year , 
      country_id : this.filters.countryId , 
      state_id : this.filters.stateId , 
      city_id : this.filters.cityId , 
      loc_id : this.filters.branchId , 
      department_id : this.filters.departmentId , 
      glob_mkt_id : this.filters.marketId , 
      region_id : this.filters.clusterId , 
      sub_region_id : this.filters.subClusterId
    });
    await this.activeModal.close('Close click')
  }

  get validateAForm(): any {
    return this.eventForm.controls;
  }

  submit(val) {
   if(this.isUpdating){
    this.updateEvent();
    return;
   }
   this.addEvent();
   
  }
}
