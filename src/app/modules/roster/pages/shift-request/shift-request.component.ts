import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shift-request',
  templateUrl: './shift-request.component.html',
  styleUrls: ['./shift-request.component.css']
})
export class ShiftRequestComponent implements OnInit {

  constructor(private fb:FormBuilder , private shiftRequestService : ShiftRequestDataService) { }

  shiftTypeArray : any;

  ngOnInit(): void {
    this.getShiftTypes();
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

  shiftRequestForm=this.fb.group({
    shift_id:["",Validators.required],
    shiftName:["",Validators.required],
    start_date:["",Validators.required],
    end_date:["",Validators.required],
    comments:["",Validators.required]
  })


  submit(){
    console.warn(this.shiftRequestForm.value)
  }

  get validateAForm(): any {
    return this.shiftRequestForm.controls
  }

}
