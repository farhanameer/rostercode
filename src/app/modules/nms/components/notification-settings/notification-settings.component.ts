import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import moment from "moment";
import { ToastService } from "../../services/toast.service";
import { NotificationRecieversPopupComponent } from "../../dialogs/notification-recievers-popup/notification-recievers-popup.component";
import { NotificationSettingsService } from "../../services/notification-settings.service";
import { ObservableService } from "../../util/observablefn.service";
import { ValidatorsService } from "../../validators/validators.service";
import { dateFormat } from "../../util/date-format.enum";

@Component({
  selector: "notification-settings",
  templateUrl: "./notification-settings.component.html",
  styleUrls: ["./notification-settings.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationSettingsComponent implements OnInit, OnChanges {
  @Input() userCount;
  @Input() filters;
  @Input() portal;
  @Input() companyId;

  @Output() onResetFilters = new EventEmitter();

  employeesList = [];

  clientId: number;
  users = [];
  include: boolean = false;
  form: FormGroup;
  todayDate;
  date: string;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private os: ObservableService,
    private nss: NotificationSettingsService,
    private toastService: ToastService,
    private vs: ValidatorsService
  ) {
    this.clientId = parseInt(localStorage.getItem("client_id"));
    this.todayDate = new Date();
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        notificationCategory: this.fb.group({
          notification: [false],
          email: [false],
          sms: [false],
        }),
        notificationType: ["", Validators.required],
        notificationSendType: ["", Validators.required],
        notificationDate: [""],
        notificationTime: [""],
        notificationSubject: [""],
        notificationBody: ["", Validators.required],
      },
      { validators: this.vs.validators() }
    );
    this.getUserCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.clientId = this.companyId ? this.companyId : this.clientId;
    this.include = false;
    this.users = [];
  }

  async getUserCount() {
    const response = await this.os.asPromised(
      this.nss.getUserCount(this.clientId, {}, this.portal)
    );
    this.userCount = response.payload[0].userCount;
  }

  fields() {
    return [
      {
        name: "notificationCategory",
        sub: { name: ["notification", "email", "sms"] },
      },
      { name: "notificationType" },
      { name: "notificationSendType" },
      { name: "notificationDate" },
      { name: "notificationTime" },
      { name: "notificationSubject" },
      { name: "notificationBody" },
    ];
  }
  dateChangeEvent(date) {}
  onChangeSendType(control) {
    const type = this.form.get(control).value;
    if (type == "now") {
      this.form.get("notificationDate").setValue("");
      this.form.get("notificationTime").setValue("");
    }

    if (type == "schedule") {
      this.form.get("notificationTime").setValue("");
    }
  }

  disabledTimePicker() {
    return (
      !this.form.get("notificationSendType").value ||
      this.form.get("notificationSendType").value == "now" ||
      this.form.get("notificationSendType").value == "schedule"
    );
  }

  disabledDatePicker() {
    return (
      !this.form.get("notificationSendType").value ||
      this.form.get("notificationSendType").value == "now"
    );
  }

  dateChange(event) {
    this.date = moment(event.value).format(dateFormat);
  }

  async sendNotification() {

    console.log('notification sending');

    const notificationCategory = [];
    const catArray = Object.keys(this.form.value.notificationCategory);
    const hideNotiCat =
      !this.form.get("notificationCategory").get("notification").value &&
      !this.form.get("notificationCategory").get("email").value &&
      this.form.get("notificationCategory").get("sms").value;
    let date = "";
    let time = "";

    for (const key of catArray)
      if (this.form.value.notificationCategory[key] == true)
        notificationCategory.push(key);
    if (hideNotiCat) this.form.value.notificationSubject = "";

    if (!this.form.value.notificationDate)
      delete this.form.value.notificationDate;
    if (!this.form.value.notificationTime)
      delete this.form.value.notificationTime;
    else time = this.form.value.notificationTime;

    date = moment(this.form.value.notificationDate).format(dateFormat);

    this.form.value.notificationDate = this.date;
    this.form.value.notificationTime = moment(`${date} ${time}`).toISOString();
    const form = { ...this.form.value };
    let response;
    form.notificationCategory = notificationCategory;
    const usersArray = [];
    this.users.forEach((usr) => {
      usersArray.push(usr.userId);
    });
    const appliedFilters = {...this.filters};
    console.log('applied filters' , this.filters);
    if(appliedFilters['filters'] && appliedFilters['filters']['companyId']) { 
      delete appliedFilters['filters']['companyId'];

      console.log('applied filters' , appliedFilters);
    }
    
    console.log('applied filters' , appliedFilters);
    
    if (this.userCount > 0 || form.notificationType == "broadcast") {
      console.log(this.portal);
      response = await this.os.asPromised(
        this.nss.sendNotification(
          this.portal,
          this.clientId,
          appliedFilters,
          form,
          usersArray,
          this.include
        )
      );
      if (response.status) {
        this.toastService.toast("Notification Sent!", "success-toast");
        this.include = false;
        this.users = [];
        this.setCurrentCompany();
        this.getUserCount();
        this.reset();
      }
    } else {
      this.toastService.toast("Select at least one employee!", "error-toast");
    }
  }

  setCurrentCompany(){
    const companyId = Number(localStorage.getItem('client_id'));
    this.clientId = companyId;
  }

  reset() {
    for (const field of this.fields()) {
      if (field.name == "notificationCategory")
        for (const subField of field.sub.name) {
          this.form.get(field.name).get(subField).setValue(false);
          this.form.get(field.name).get(subField).markAsUntouched();
        }
      else {
        this.form.get(field.name).setValue("");
        this.form.get(field.name).setErrors(null);
        this.form.get(field.name).markAsUntouched();
      }
    }
    this.onResetFilters.emit();
  }

  viewEdit() {
    const dialogRef = this.dialog.open(NotificationRecieversPopupComponent, {
      width: "1000px",
      data: {
        filters: this.filters,
        userCount: this.userCount,
        portal: this.portal,
        users: this.users,
        include: this.include,
        clientId: this.clientId,
      },
      panelClass: ["module-style", "custom-notification-panel"],
      disableClose: true,
    });
    document
      .getElementsByClassName("custom-notification-panel")[0]
      .parentElement.setAttribute("style", "padding-top:0 !important;");
    dialogRef.afterClosed().subscribe((res) => {
      this.userCount = res ? res.userCount : this.userCount;
      this.users = res ? res.users : [];
      this.include = res ? res.include : "0";
    });
  }
}
