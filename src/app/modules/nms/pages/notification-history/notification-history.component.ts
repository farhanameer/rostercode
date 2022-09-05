import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import moment from "moment";
import { LoaderService } from "src/app/modules/employee-documents/util/loader.service";
import { SingleNotificationHistoryComponent } from "../../dialogs/single-notification-history/single-notification-history.component";
import { GetNotificationsService } from "../../services/get-notifications.service";
import { dateFormat } from "../../util/date-format.enum";
import { ObservableService } from "../../util/observablefn.service";

@Component({
  selector: "app-notification-history",
  templateUrl: "./notification-history.component.html",
  styleUrls: ["./notification-history.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationHistoryComponent {
  notificationHistoryFilterForm: FormGroup;

  pageSize: number = 25;
  pageNumber: number = 1;
  allNotifications = [];
  disableInfinitScroll: Boolean = false;
  clientId: number;

  constructor(
    private fb: FormBuilder,
    private os: ObservableService,
    private gns: GetNotificationsService,
    private dialog: MatDialog ,
    private loader : LoaderService
  ) {
    this.clientId = parseInt(localStorage.getItem("client_id"));
  }

  ngOnInit(): void {
    this.notificationHistoryFilterForm = this.fb.group({
      date: [null],
      messageType: [null],
      messageCategory: [null],
    });
    this.search({});
  }

  async search(filters) {
    this.pageNumber = 1;
    this.allNotifications = [];
    this.disableInfinitScroll = false;
    this.getNotificationsHistory(filters);
  }
  async getNotificationsHistory(filters, pageNumber = this.pageNumber, pageSize = this.pageSize) {

    if (this.disableInfinitScroll) return;
    this.loader.showLoader("" , true);
    for (const filter in filters)
      if (filters[filter] == null) delete filters[filter];
    if (filters.date) filters.date = moment(filters.date).format(dateFormat);

    const response = await this.os.asPromised(
      this.gns.getNotificationsHistory(this.clientId, filters, pageNumber, pageSize)
    );
    
    if (this.allNotifications.length == 0 && response.payload.pageNumber == 1)
      this.allNotifications = response.payload.notifications;
    else if (response.payload.pageNumber == 1 && response.payload.notifications.length == 0)
      this.allNotifications = [];
    else if (this.allNotifications.length > 0 && response.payload.pageNumber > 1)
      this.allNotifications = this.allNotifications.concat(response.payload.notifications);
    else if (response.payload.pageNumber > 1 && response.payload.notifications.length == 0)
      this.disableInfinitScroll = true;


    this.loader.hideLoader();
  }
  getDataOnScroll(filters) {
    console.log('logging');
    this.pageNumber = this.pageNumber + 1;
    this.getNotificationsHistory(filters, this.pageNumber, this.pageSize);
  }
  getSingleNotification(id) {
    this.dialog.open(SingleNotificationHistoryComponent, {
      width: "600px",
      data: { id },
      panelClass: ["module-style", "custom-notification-history"]
    });
    document
      .getElementsByClassName("custom-notification-history")[0]
      .parentElement.setAttribute("style", "padding-top:0 !important;");
  }
  reset() {
    this.allNotifications = [];
    const filters = Object.keys(this.notificationHistoryFilterForm.value);
    for (const filter of filters) {
      this.notificationHistoryFilterForm.get(filter).setValue(null);
      this.notificationHistoryFilterForm.get(filter).setErrors(null);
    }
    this.pageNumber = 1;
    this.disableInfinitScroll = false;
    this.getNotificationsHistory({});
  }

  ngDoCheck() {

    console.log('unexpedted' , this.disableInfinitScroll);
  }
}
