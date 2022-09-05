import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import moment from "moment";
import { GetNotificationsService } from "../../services/get-notifications.service";
import { HelpersService } from "../../util/helpers.service";
import { ObservableService } from "../../util/observablefn.service";

@Component({
  selector: "app-notification-popup",
  templateUrl: "./notification-popup.component.html",
  styleUrls: ["./notification-popup.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationPopupComponent implements OnInit {
  notification = {};
  post = "";

  colors = {};

  constructor(
    public dialogRef: MatDialogRef<NotificationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private os: ObservableService,
    private gns: GetNotificationsService,
    private hs: HelpersService
  ) {}
  ngOnInit(): void {
    this.getSingleNotification(this.data.id);
    this.getColors();
  }
  async getColors() {
    const colorsArray = (await this.os.asPromised(this.hs.getColors())).payload
      .colors;

    colorsArray.forEach((color) => {
      this.colors[`${color.color_key}`] = `${color.color_code}`;
    });
  }
  async getSingleNotification(id) {
    const response = await this.os.asPromised(
      this.gns.getSingleUserNotification(id)
    );
    this.notification = response.payload.notification;
  }

  parseData(date) {
    return moment(date).format('DD MMM YYYY, hh:MM a');
  }

  close() {
    this.dialogRef.close();
  }
}
