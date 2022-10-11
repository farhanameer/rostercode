import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HolidayDataService } from '../../services/data/holidays.data.service';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css'],
})
export class ShiftListComponent implements OnInit {
  constructor(private holidayService: HolidayDataService,
    private shiftRequest : ShiftRequestDataService) {}
  
  @Input() data : any;

  @Output() singleShiftId : EventEmitter<any> = new EventEmitter();
  colors : any;
  ngOnInit(): void {
    this.colors= {
      0 : null , 
      1 : null , 
      2 : null
    }
    this.shiftStatusColor();
  }
 

  async shiftStatusColor(){
    const res = await this.shiftRequest.getShiftStatusColors();
    let allColors = res['data'].payload;
    console.log(allColors);

    allColors.forEach(cls =>{
      if(cls.approved) {
        this.colors[2] = cls.approved;
      }else if(cls.pending){
        this.colors[0] = cls.pending;
      }
      else if(cls.disapproved){
        this.colors[1] = cls.disapproved;
      }
    });
    console.log(this.colors);
  }

  singleShift(id){
    this.singleShiftId.emit(id);
  }
}
