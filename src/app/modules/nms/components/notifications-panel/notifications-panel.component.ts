import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Location } from "@angular/common";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  DialogPosition,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { color } from "highcharts";
import moment from "moment";
import { NotificationPopupComponent } from "../../dialogs/notification-popup/notification-popup.component";
import { GetNotificationsService } from "../../services/get-notifications.service";
import { HelpersService } from "../../util/helpers.service";
import { ObservableService } from "../../util/observablefn.service";

@Component({
  selector: "app-notifications-panel",
  templateUrl: "./notifications-panel.component.html",
  styleUrls: ["./notifications-panel.component.scss"],
  animations: [
    trigger("openClose", [
      state("maximize", style({ display: "block" })),
      state("minimize", style({ display: "none" })),
      transition("maximize => minimize", [animate("100ms ease-in-out")]),
      transition("minimize => maximize", [animate("100ms ease-in-out")]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsPanelComponent implements OnInit {
  @Input() hideBackBtn: boolean;
  @Input() showViewAll: boolean;
  @Input() openNotificationDialog: boolean;
  @Input() sliceData: boolean;
  @Input() ellipsisText: boolean;
  @Input() minHeight: boolean;
  @Input() isFitImage: boolean;

  @ViewChild("notificationRef") elementRef: ElementRef;

  stateUserNotification: string = "maximize";

  notifications = [];
  unreadNotificationCount = 0;

  pageSize: number = 8;
  pageNumber: number = 1;
  disableInfinitScroll: Boolean = false;

  colors = {};

  constructor(
    private dialog: MatDialog,
    private os: ObservableService,
    private gns: GetNotificationsService,
    private router: Router,
    private location: Location,
    private hs: HelpersService
  ) {
    console.log("in show notification");
  }

  ngOnInit(): void {
    this.getAllNotifications();
    this.getUnreadNotificationCount();
    this.getColors();
  }
  
  async getColors() {
    const colorsArray = (await this.os.asPromised(this.hs.getColors())).payload.colors;

    colorsArray.forEach(color =>{
      this.colors[`${color.color_key}`] = `${color.color_code}`
    });


  }

  minMaxUserNotification() {
    if (this.stateUserNotification == "maximize")
      this.stateUserNotification = "minimize";

    else if (this.stateUserNotification == "minimize")
      this.stateUserNotification = "maximize";
  }

  async getUnreadNotificationCount() {
    const response = await this.os.asPromised(
      this.gns.getUnreadNotificationCount()
    );
    this.unreadNotificationCount = response.payload.count;
  }

  async getAllNotifications(
    pageNumber = this.pageNumber,
    pageSize = this.pageSize
  ) {
    const response = await this.os.asPromised(
      this.gns.getUserNotifications(pageNumber, pageSize)
    );

    if (this.notifications.length == 0 && response.payload.pageNumber == 1)
      this.notifications = response.payload.notifications;
    else if (
      response.payload.pageNumber == 1 &&
      response.payload.notifications.length == 0
    )
      this.notifications = [];
    else if (this.notifications.length > 0 && response.payload.pageNumber > 1)
      this.notifications = this.notifications.concat(
        response.payload.notifications
      );
    else if (
      response.payload.pageNumber > 1 &&
      response.payload.notifications.length == 0
    )
      this.disableInfinitScroll = true;
    console.log(this.notifications);
  }
  getDataOnScroll() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllNotifications(this.pageNumber, this.pageSize);
  }
  async getSingleNotification(id) {
    const response = await this.os.asPromised(
      this.gns.getSingleUserNotification(id)
    );
    this.getUnreadNotificationCount();
  }

  openDialog(id) {
    if (this.openNotificationDialog) {
      const coords: DOMRect =
        this.elementRef.nativeElement.getBoundingClientRect();
      console.log(coords);

      const dialogRef: MatDialogRef<NotificationPopupComponent, any> =
        this.dialog.open(NotificationPopupComponent, {
          data: { id },
          backdropClass: ["custom-backdrop", "module-style"],
          panelClass: ["custom-panel", "module-style"],
        });
      this.getUnreadNotificationCount();
      this.setDialogPosition(coords, dialogRef);
    }
  }

  gotoAllNotifications() {
    this.router.navigate(["nms/all-notifications"]);
  }

  navigateBack() {
    if(!this.hideBackBtn)
      this.location.back();
  }

  parseDate(date) {
    return moment(date).format('DD MMM YYYY, hh:MM a')
  }

  setDialogPosition(
    coords: DOMRect,
    dialogRef: MatDialogRef<NotificationPopupComponent, any>
  ) {
    let { top, left, width, height } = coords;

    const backdropCss = `top:${top}px;left:${left + 8}px;width:${
      width - 16
    }px;height:${height}px`;
    const customPanelCss = `height:${height - 80}px;width:${width - 96}px`;
    document
      .getElementsByClassName("custom-backdrop")[0]
      .setAttribute("style", backdropCss);
    document
      .getElementsByClassName("custom-panel")[0]
      .setAttribute("style", customPanelCss);

    const dialogTop = top + 80 / 2 - 111;

    const dialogLeft = coords.left + 96 / 2;
    const position: DialogPosition = {
      top: `${dialogTop}px`,
      left: `${dialogLeft}px`,
    };
    dialogRef.updatePosition(position);
  }
}
