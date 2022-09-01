import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttendenceCalenderComponent } from './components/attendence-calender/attendence-calender.component';
import { FullLayoutComponent,} from './layout/full-layout/full-layout.component';

import { RosterComponent } from './pages/roster/roster.component';
import { ShiftAllocationComponent } from './pages/shift-allocation/shift-allocation.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { DateBoxComponent } from './components/date-box/date-box.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ButtonComponent } from './components/button/button.component';
import { EmployeeShiftAlloctionComponent } from './components/employee-shift-alloction/employee-shift-alloction.component';

import { EmployeeShiftDetailsComponent } from './components/employee-shift-details/employee-shift-details.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeShiftCardComponent } from './components/employee-shift-card/employee-shift-card.component';
import { UploadFilesBoxComponent } from './components/upload-files-box/upload-files-box.component';
import { RosterCplComponent } from './pages/roster-cpl/roster-cpl.component';
import { DialogLayoutComponent } from './layout/dialog-layout/dialog-layout.component';
import { OverviewTableComponent } from './components/overview-table/overview-table.component';
import { JobShiftCalenderComponent } from './components/job-shift-calender/job-shift-calender.component';
import { JobShiftDetailComponent } from './components/job-shift-detail/job-shift-detail.component';
import {SingleShiftAllocationDialog } from './dialogs/single-shift-allocation/single-shift-allocation.dialog';
import { OvertimeAdjustmentDialog } from './dialogs/overtime-adjustment/overtime-adjustment.dialog';
import {  SingleShiftDetailDialog } from './dialogs/single-shift-detail/single-shift-detail.dialog';
import {DisclaimerDialog } from './dialogs/disclaimer/disclaimer.dialog';
import {  AvaliableShiftDialog } from './dialogs/avaliable-shift/avaliable-shift.dialog';
import { CheckInOutCalenderComponent } from './components/check-in-out-calender/check-in-out-calender.component';
import { ShiftManagmentDialog } from './dialogs/shift-managment/shift-managment.dialog';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { SortByDateComponent } from './components/sort-by-date/sort-by-date.component';
import { SortByEmployeeComponent } from './components/sort-by-employee/sort-by-employee.component';
import { MainCardComponent } from './components/main-card/main-card.component';
import { SubCardComponent } from './components/sub-card/sub-card.component';
import { JobshiftDialog } from './dialogs/jobshift/jobshift.dialog';
import { ShiftRequestComponent } from './pages/shift-request/shift-request.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { EmployeeShiftManagementDialog } from './dialogs/employee-shift-management/employee-shift-management.dialog';
import { OvertimeHoursAdjusmentDialog } from './dialogs/overtime-hours-adjusment/overtime-hours-adjusment.dialog';
import { ShiftRequestDetailComponent } from './components/shift-request-detail/shift-request-detail.component';
import { MorningJobShiftDialog } from './dialogs/morning-job-shift/morning-job-shift.dialog';
import { NightJobShiftDialog } from './dialogs/night-job-shift/night-job-shift.dialog';

import { ShiftRequestCardComponent } from './components/shift-request-card/shift-request-card.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ShiftRequestApprovalComponent } from './components/shift-request-approval/shift-request-approval.component';


@NgModule({
  declarations: [
    AppComponent,
    AttendenceCalenderComponent,
    FullLayoutComponent,
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
    DialogLayoutComponent,
    OverviewTableComponent,
    JobShiftCalenderComponent,
    JobShiftDetailComponent,
    SingleShiftAllocationDialog,
    OvertimeAdjustmentDialog,
    SingleShiftDetailDialog,
    DisclaimerDialog,
    CheckInOutCalenderComponent,
    ShiftManagmentDialog,
    RadioButtonComponent,
    SortByDateComponent,
    SortByEmployeeComponent,
    MainCardComponent,
    SubCardComponent,
    JobshiftDialog,
    ShiftRequestComponent,
    ShiftListComponent,
    EmployeeShiftManagementDialog,
    OvertimeHoursAdjusmentDialog,
    ShiftRequestDetailComponent,
    MorningJobShiftDialog,
    NightJobShiftDialog,
    ShiftRequestCardComponent,
    ShiftRequestApprovalComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
