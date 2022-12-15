import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppLocalStorageService {
  shiftRequest : any = '';
  constructor(private http : HttpClient){
    this.shiftRequest = APIs['ShiftRequestAndSetupUrl'];
  }
  getClientId() {
    return localStorage.getItem('client_id');
  }
  getUserId() {
    return localStorage.getItem('e_number');
  }
  async getLineManagerId(){
    const details =await this.lineManagerDetails();
    if(details["dept_id"]){
      return details["dept_id"];
    }
    return -1;
  }
  getLineManagerDetails(){
    return this.lineManagerDetails();
  }

  private async lineManagerDetails(){
    const details = JSON.parse(localStorage.getItem('line_manager_details'));
    
    if(!details){
      let lineManager = await this.getLineManagerDetailsFromAPI(this.getUserId());
      if(lineManager["success"]) {

        console.log('id' , lineManager);
        const lmDetails = lineManager["data"]["payload"];
        if(Object.entries(lmDetails).length !=0){
          localStorage.setItem('line_manager_details' , JSON.stringify(lmDetails));
        }
        return lmDetails;
      }
    }
    return details;
  }

  private getLineManagerDetailsFromAPI(user_id){
    return new Promise((resolve , reject)=>{
      
      this.http.get(`${this.shiftRequest}/linemanager-details?emp_id=${user_id}`).subscribe(
        success =>{
          
          resolve({
            success : true , 
            data : success
          })
        } , error =>{
          resolve({
            success  : false , 
            error : error
          })
        }
      );
    });
  }

}
