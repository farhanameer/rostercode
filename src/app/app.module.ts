import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttendenceCalenderComponent } from './roster/attendence-calender/attendence-calender.component';
import { RosterLayoutComponent } from './roster/roster-layout/roster-layout.component';

import { RosterComponent } from './pages/roster/roster.component';
import { ShiftAllocationComponent } from './pages/shift-allocation/shift-allocation.component';
import { SelectBoxComponent } from './pages/boxes/select-box/select-box.component';
import { DateBoxComponent } from './pages/boxes/date-box/date-box.component';
import { FileUploadComponent } from './roster/file-upload/file-upload.component';
import { ButtonComponent } from './roster/button/button.component';
import { EmployeeShiftAlloctionComponent } from './roster/employee-shift-alloction/employee-shift-alloction.component';

import { EmployeeShiftDetailsComponent } from './roster/employee-shift-details/employee-shift-details.component';
import { BoardCardComponent } from './roster/board-card/board-card.component';
import { EmployeeCardComponent } from './roster/employee-card/employee-card.component';
import { EmployeeShiftCardComponent } from './roster/employee-shift-card/employee-shift-card.component';
import { UploadFilesBoxComponent } from './pages/boxes/upload-files-box/upload-files-box.component';
import { RosterCplComponent } from './pages/roster-cpl/roster-cpl.component';
import { SecondaryLayoutComponent } from './roster/secondary-layout/secondary-layout.component';
import { OverviewTableComponent } from './roster/overview-table/overview-table.component';
import { JobShiftCalenderComponent } from './roster/job-shift-calender/job-shift-calender.component';
import { JobShiftDetailComponent } from './roster/job-shift-detail/job-shift-detail.component';
import {SingleShiftAllocationDialog } from './dialogs/single-shift-allocation/single-shift-allocation.dialog';
import { OvertimeAdjustmentDialog } from './dialogs/overtime-adjustment/overtime-adjustment.dialog';
import {  SingleShiftDetailDialog } from './dialogs/single-shift-detail/single-shift-detail.dialog';
import {DisclaimerDialog } from './dialogs/disclaimer/disclaimer.dialog';
import {  AvaliableShiftDialog } from './dialogs/avaliable-shift/avaliable-shift.dialog';
import { CheckInOutCalenderComponent } from './roster/check-in-out-calender/check-in-out-calender.component';
import { ShiftManagmentComponent } from './dialogs/shift-managment/shift-managment.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SortByDateComponent } from './roster/sort-by-date/sort-by-date.component';
import { SortByEmployeeComponent } from './roster/sort-by-employee/sort-by-employee.component';
import { MainCardComponent } from './roster/main-card/main-card.component';
import { SubCardComponent } from './roster/sub-card/sub-card.component';
import { JobshiftComponent } from './dialogs/jobshift/jobshift.component';
import { ShiftRequestComponent } from './pages/shift-request/shift-request.component';
import { ShiftListComponent } from './shift-list/shift-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AttendenceCalenderComponent,
    RosterLayoutComponent,
    RosterComponent,
    AvaliableShiftDialog,
    SelectBoxComponent,
    DateBoxComponent,
    FileUploadComponent,
    ButtonComponent,
    EmployeeShiftAlloctionComponent,
    ShiftAllocationComponent,
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
    SingleShiftAllocationDialog,
    OvertimeAdjustmentDialog,
    SingleShiftDetailDialog,
    DisclaimerDialog,
    CheckInOutCalenderComponent,
    ShiftManagmentComponent,
    RadioButtonComponent,
    SortByDateComponent,
    SortByEmployeeComponent,
    MainCardComponent,
    SubCardComponent,
    JobshiftComponent,
    ShiftRequestComponent,
    ShiftListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
