import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { GetNotificationsService } from "../../services/get-notifications.service";
import { ObservableService } from "../../util/observablefn.service";

@Component({
  selector: "app-single-notification-history",
  templateUrl: "./single-notification-history.component.html",
  styleUrls: ["./single-notification-history.component.scss"],
})
export class SingleNotificationHistoryComponent implements OnInit {
  notification = {};
  clientId: number;

  constructor(
    public dialogRef: MatDialogRef<SingleNotificationHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private os: ObservableService,
    private gns: GetNotificationsService
  ) {
    this.clientId = parseInt(localStorage.getItem("client_id"));
  }

  ngOnInit(): void {
    this.getSingleNotification();
  }

  async getSingleNotification() {
    const response = await this.os.asPromised(
      this.gns.getSingleNotificationHistory(this.clientId, this.data.id)
    );
    this.notification = response.payload[0];
    console.log(this.notification);
  }

  close() {
    this.dialogRef.close();
  }
}
