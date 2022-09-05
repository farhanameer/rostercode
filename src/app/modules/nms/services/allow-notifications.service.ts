import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import { AllowNotification } from "../dialogs/allow-notification-popup/allow-notification.modal";
import { ConfigureNotificationService } from "./configure-notifications.service";

@Injectable({
  providedIn: "root",
})
export class AllowNotificationsService {
  constructor(private dialog: MatDialog, private router: Router
    , private configureNotification : ConfigureNotificationService) {}

  init() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url !='/login'){
          this.configureNotification.init();
        }
      }
    });
  }
  
}
