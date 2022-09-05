
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable({
  providedIn: "root",
})
export class DropDownFieldService {
  
  resetDropDown  = new Subject();

  dropDownApiCall = new Subject();

  enableLocations = new Subject();
  disabledLocations = new Subject();


  private dropDownValue = {};
  constructor() {
    
  }

  registerDropDownValue(value,name){
    
    this.dropDownValue[name] = value;
    console.log('hash after register',this.dropDownValue);

  }

  reset(value,name){
    console.log('name and value',name,value);
    if(name == 'flap' || name == 'drawer') return;
    if(this.dropDownValue[name] == value){
        this.resetDropDown.next({name});
    }
  }

  makeDropDownApiCall(key){
    
      console.log
      if(key != 'flap' || key != 'drawer') {
        this.dropDownApiCall.next({key});
      }
  }



  locationEnabled(key , ids) {
    this.enableLocations.next({key , ids});
  }
  locationDisabled(key , ids) {
    this.disabledLocations.next({key , ids});
  }
  
}


