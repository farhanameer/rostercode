import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttendenceCalenderComponent } from './roster/attendence-calender/attendence-calender.component';
import { RosterLayoutComponent } from './roster/roster-layout/roster-layout.component';
import { DetailAttendenceCalenderComponent } from './roster/detail-attendence-calender/detail-attendence-calender.component';
import { RosterComponent } from './pages/roster/roster.component';
import { ShiftAllocationComponent } from './pages/shift-allocation/shift-allocation.component';
import { SelectBoxComponent } from './roster/select-box/select-box.component';
import { DateBoxComponent } from './roster/date-box/date-box.component';
import { FileUploadComponent } from './roster/file-upload/file-upload.component';
import { ButtonComponent } from './roster/button/button.component';
import { EmployeeShiftAlloctionComponent } from './roster/employee-shift-alloction/employee-shift-alloction.component';

import { EmployeeShiftDetailsComponent } from './roster/employee-shift-details/employee-shift-details.component';
import { BoardCardComponent } from './roster/board-card/board-card.component';
import { EmployeeCardComponent } from './roster/employee-card/employee-card.component';
import { EmployeeShiftCardComponent } from './roster/employee-shift-card/employee-shift-card.component';
import { UploadFilesBoxComponent } from './roster/upload-files-box/upload-files-box.component';
import { RosterCplComponent } from './pages/roster-cpl/roster-cpl.component';
import { SecondaryLayoutComponent } from './roster/secondary-layout/secondary-layout.component';
import { OverviewTableComponent } from './roster/overview-table/overview-table.component';
import { JobShiftCalenderComponent } from './roster/job-shift-calender/job-shift-calender.component';
import { JobShiftDetailComponent } from './roster/job-shift-detail/job-shift-detail.component';
import { SingleShiftAllocationComponent } from './dialogs/single-shift-allocation/single-shift-allocation.component';
import { OvertimeAdjustmentComponent } from './dialogs/overtime-adjustment/overtime-adjustment.component';
import { SingleShiftDetailComponent } from './dialogs/single-shift-detail/single-shift-detail.component';
import { DisclaimerComponent } from './dialogs/disclaimer/disclaimer.component';

@NgModule({
  declarations: [
    AppComponent,
    AttendenceCalenderComponent,
    RosterLayoutComponent,
    DetailAttendenceCalenderComponent,
    RosterComponent,
    ShiftAllocationComponent,
    SelectBoxComponent,
    DateBoxComponent,
    FileUploadComponent,
    ButtonComponent,
    EmployeeShiftAlloctionComponent,

    EmployeeShiftDetailsComponent,
    BoardCardComponent,
    EmployeeCardComponent,
    EmployeeShiftCardComponent,
    UploadFilesBoxComponent,
    RosterCplComponent,
    SecondaryLayoutComponent,
    OverviewTableComponent,
    JobShiftCalenderComponent,
    JobShiftDetailComponent,
    SingleShiftAllocationComponent,
    OvertimeAdjustmentComponent,
    SingleShiftDetailComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
