import { ShiftRequestDataService } from './../../services/data/shiftRequest.data';
import { AppLocalStorageService } from './../../../../services/app-local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shift-request-by-lm',
  templateUrl: './shift-request-by-lm.component.html',
  styleUrls: ['./shift-request-by-lm.component.css']
})
export class ShiftRequestByLmComponent implements OnInit {
  screenRole : 'lm';
  shiftsArray: any;

  constructor(private appLocalStorage: AppLocalStorageService,
    private shiftRequest : ShiftRequestDataService) { }

  ngOnInit(): void {
    this.screenRole = 'lm';
    this.getShiftList();
    
  }

  async getShiftList(){
    const data = await this.shiftRequest.getDefaultList(this.screenRole);
    let shifts = data["data"]["payload"];
    if(!Array.isArray(shifts)){
      console.log('error occured');
    }
    this.shiftsArray = shifts;
  }
}
