import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import moment from "moment";
import { dateFormat } from "../util/date-format.enum";

@Injectable({
  providedIn: "root",
})
export class ValidatorsService {
  constructor() {}

  validators() {
    return [
      this.validateIfScheduled,
      this.validateNotificationCategory,
      this.validateIfLesserThanCurrentTime,
      this.validateIfNotSMS,
    ];
  }

  validateIfScheduled(control: AbstractControl): ValidationErrors | null {
    const sendType = control.get("notificationSendType").value;
    const date = control.get("notificationDate").value;
    const time = control.get("notificationTime").value;

    if (
      (sendType && sendType == "dateSchedule" && !date) ||
      (sendType && sendType == "timeSchedule" && !date)
    )
      control
        .get("notificationDate")
        .setErrors({ requiredIfScheduledDate: true });
    if (sendType && sendType == "timeSchedule" && !time) {
      control
        .get("notificationTime")
        .setErrors({ requiredIfScheduledTime: true });
    } else if (!sendType || sendType == "now") {
      control.get("notificationDate").setErrors(null);
      control.get("notificationTime").setErrors(null);
    }
    return null;
  }

  validateIfNotSMS(control: AbstractControl): ValidationErrors | null {
    const notification = control
      .get("notificationCategory")
      .get("notification").value;
    const email = control.get("notificationCategory").get("email").value;
    const sms = control.get("notificationCategory").get("sms").value;
    const notificationSubject = control.get("notificationSubject").value;

    if (!notificationSubject && (notification || email || !sms))
      control.get("notificationSubject").setErrors({ requiredIfNotSMS: true });
    else control.get("notificationSubject").setErrors(null);
    return null;
  }

  validateNotificationCategory(
    control: AbstractControl
  ): ValidationErrors | null {
    const sms = control.get("notificationCategory").get("sms").value;
    const email = control.get("notificationCategory").get("email").value;
    const notification = control
      .get("notificationCategory")
      .get("notification").value;

    if (sms || email || notification)
      control.get("notificationCategory").setErrors(null);
    else
      control
        .get("notificationCategory")
        .setErrors({ requiredIfNoneSelected: true });
    return null;
  }

  validateIfLesserThanCurrentTime(
    control: AbstractControl
  ): ValidationErrors | null {
    const date = control.get("notificationDate");
    const time = control.get("notificationTime");

    if (date.value && time.value) {
      const selectedDate = moment(date.value).format(dateFormat);
      const selectedDateTime = moment(`${selectedDate} ${time.value}`);
      if (selectedDateTime.isBefore(moment()))
        time.setErrors({ dateLesser: true });
      else time.setErrors(null);
    }

    return null;
  }
}
