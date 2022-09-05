import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OneSignal } from "onesignal-ngx";
import { APIs } from "src/environments/environment";
import { ObservableService } from "../util/observablefn.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AllowNotification } from "../dialogs/allow-notification-popup/allow-notification.modal";

@Injectable({
  providedIn: "root",
})
export class ConfigureNotificationService {
  notificationUrl: string = "";
  headers: HttpHeaders = new HttpHeaders();
  dialogRef: MatDialogRef<AllowNotification>
  constructor(
    private oneSignal: OneSignal,
    private http: HttpClient,
    private os: ObservableService ,
    private dialog: MatDialog
  ) {
    this.notificationUrl = APIs['notificationUrl'];
    this.headers = this.os.headers();
  }

  init() {
    const currentUser = localStorage.getItem("e_number");

    // // just testing
    
    // this.openDialog();

    console.log('init');
    if(this.oneSignal) {
      console.log('it will be here');
      this.checkIfEnabled();
    }
    this.oneSignal
      .init({
        //appId : "6f2447ae-29fc-4f03-a7a8-b9cdc3a1ddc3" // test
        appId : "2c24930b-47c0-4370-af3f-34f8b2f96fcc" // live 
        // appId: "e607bbd7-6ff9-45f7-b206-0840e5984226",
        // appId : "bbc16408-4e76-4641-b6e4-115fd491a783"
      })
      .then(async () => {
        console.log("subscribed successfully");
        console.log('should call ');
        let uId = await this.oneSignal.getUserId();
        
        this.oneSignal.showSlidedownPrompt();
        this.oneSignal.setExternalUserId(currentUser);
        if(uId) {
          this.registerDevice(uId).subscribe((res) => {
            console.log(res);
          })
        }
        let that = this;
        this.oneSignal.on("subscriptionChange", async () => {
          console.log("got consent");
          const userId = await that.oneSignal.getUserId();
          localStorage.setItem('device_id', userId);
          that.registerDevice(userId).subscribe((res) => {
            console.log(res);
          })
          // setTimeout(async () => {
          //     const userId = await that.os.getUserId();
          //     console.log('player id ' , userId);
          // }, 1000);
        });
      }).finally(()=>{
        
      });
  }


  checkIfEnabled(){

    
    const currentUser = localStorage.getItem("e_number");
    if(this.isLoggedIn()){
      let that = this;
        this.oneSignal.isPushNotificationsEnabled((value)=>{
          console.log('boolean value' , value);

          if(!value) {
            setTimeout(() => {
              that.openDialog();
            }, 1000);
          }
          
         
          this.oneSignal.showHttpPrompt();
          this.oneSignal.getNotificationPermission(()=>{
            console.log('completed');
          })
        });

      }
    
  }
  async setExternalUserId() {
    const userId = await this.oneSignal.getExternalUserId();
    console.log("user Id we got", userId);
  }

  registerDevice(id) {
    console.log('register');
    
    return this.http.get(`${this.notificationUrl}/registerUserDevice`, {
      headers: {'token': JSON.parse(localStorage.getItem('token_nda'))},
      params: { id },
    });
  }

  deleteDevice(id) {
    console.log('delete');
    
    return this.http.get(`${this.notificationUrl}/deleteUserDevice`, {
      headers: {'token': JSON.parse(localStorage.getItem('token_nda'))},
      params: { id },
    });
  }


  openDialog() {
    
    if(this.dialogRef) return;
    this.dialogRef = this.dialog.open(AllowNotification, {
      width: "30vw",
      panelClass: ["module-style", "align-top"],
    });

    
    this.dialogRef.afterClosed().subscribe((result) => {
      
    });
  }


  isLoggedIn(){
    const token = localStorage.getItem('token_nda');
    if(token) return true;
    return false;
  }
}
