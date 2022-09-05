import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotificationSettingsService } from "../../services/notification-settings.service";
import { ObservableService } from "../../util/observablefn.service";
import { ReportData } from "./report-data";

@Component({
  selector: "app-lm-portal-nms",
  templateUrl: "./lm-portal-nms.component.html",
  styleUrls: ["./lm-portal-nms.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LMPortalNMSComponent implements OnInit {
  reporting = {
    reportingDepartment: [],
    reportingLevel: [],
  };
  userCount: number = 0;
  form: FormGroup;
  filters = {};
  clientId: number;

  constructor(
    private fb: FormBuilder,
    private os: ObservableService,
    private nss: NotificationSettingsService
  ) {
    this.clientId = parseInt(localStorage.getItem("client_id"));
    this.reporting.reportingDepartment =
      ReportData.reporting.reportingDepartment.slice();
    this.reporting.reportingLevel = ReportData.reporting.reportingLevel.slice();

    this.form = this.fb.group({
      reportingLevel: [''],
      reportingDepartment: [''],
    });
  }

  ngOnInit(): void {}
  
  async getUserCount() {
    
    this.filters = this.form.value;

    Object.keys(this.filters).map((val) => {
      if (!this.filters[val]) delete this.filters[val];
    });

    this.userCount = (
      await this.os.asPromised(
        this.nss.getUserCount(this.clientId, { lmFilters: this.filters }, 'lm')
      )
    ).payload[0].userCount;

    
  }

  onResetFilters() {
    Object.keys(this.reporting).map((val) => {
      this.reporting[val] = [];
    });
    Object.keys(this.form.value).map((val) => {
      this.form.get(val).setValue(null);
      this.form.get(val).setErrors(null);
    });
    this.reporting.reportingDepartment =
      ReportData.reporting.reportingDepartment.slice();
    this.reporting.reportingLevel = ReportData.reporting.reportingLevel.slice();

    // this.reporting = ReportData.reporting;
  }
}
