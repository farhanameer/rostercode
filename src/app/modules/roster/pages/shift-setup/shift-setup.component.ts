import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shift-setup',
  templateUrl: './shift-setup.component.html',
  styleUrls: ['./shift-setup.component.css']
})
export class ShiftSetupComponent implements OnInit {

  constructor(private shiftRequestService: ShiftRequestDataService) { }

  shiftTypeArray : any;
  shiftColorArray: any;

  ngOnInit(): void {
    // debugger;
    this.getShiftTypes();
    this.getShiftColors();
    // this.getShift
  }

  async getShiftTypes(){
    const data = await this.shiftRequestService.getShiftTypes();
    let shifts = data["data"]["payload"];
    if(!Array.isArray(shifts)){
      console.log('error occured');
    }
    const shiftsArray = [];
    shifts.forEach(shift =>{
      shiftsArray.push({
        id : shift.shift_type_id , 
        name : shift.shift_type_name
      })
    });
    console.log(shiftsArray);
    this.shiftTypeArray = shiftsArray;
    console.log(this.shiftTypeArray);

  }

  async getShiftColors(){
    const data = await this.shiftRequestService.getShiftColors();
    let colors = data["data"]["payload"];
    if(!Array.isArray(colors)){
      console.log('error occured');
    } 
    const colorsArray = [];
    let i = 0;
    colors.forEach(color =>{
      let obj = {
        id: i,
        name: color
      }
      colorsArray.push(obj);
      i++;
    });
    console.log(colorsArray);
    this.shiftColorArray = colorsArray;
    console.log(this.shiftColorArray);

  }

}
