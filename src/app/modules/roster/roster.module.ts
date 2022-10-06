import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RosterComponent } from './pages/roster/roster.component';
import { ShiftAllocationComponent } from './pages/shift-allocation/shift-allocation.component';
import { SingleShiftAllocationDialog } from './dialogs/single-shift-allocation/single-shift-allocation.dialog';
import { OvertimeAdjustmentDialog } from './dialogs/overtime-adjustment/overtime-adjustment.dialog';
import { SingleShiftDetailDialog } from './dialogs/single-shift-detail/single-shift-detail.dialog';
import { DisclaimerDialog } from './dialogs/disclaimer/disclaimer.dialog';
import { AvaliableShiftDialog } from './dialogs/avaliable-shift/avaliable-shift.dialog';
import { ShiftManagmentDialog } from './dialogs/shift-managment/shift-managment.dialog';
import { ShiftRequestComponent } from './pages/shift-request/shift-request.component';
import { OvertimeHoursAdjusmentDialog } from './dialogs/overtime-hours-adjusment/overtime-hours-adjusment.dialog';
import { MorningJobShiftDialog } from './dialogs/morning-job-shift/morning-job-shift.dialog';
import { NightJobShiftDialog } from './dialogs/night-job-shift/night-job-shift.dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RosterRoutingModule } from './roster-routing.module';
import { CommonModule } from '@angular/common';
import { AttendenceCalenderComponent } from './components/attendence-calender/attendence-calender.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { DateBoxComponent } from './components/date-box/date-box.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ButtonComponent } from './components/button/button.component';
import { EmployeeShiftAlloctionComponent } from './components/employee-shift-alloction/employee-shift-alloction.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeShiftCardComponent } from './components/employee-shift-card/employee-shift-card.component';
import { UploadFilesBoxComponent } from './components/upload-files-box/upload-files-box.component';
import { RosterCplComponent } from './pages/roster-cpl/roster-cpl.component';
import { OverviewTableComponent } from './components/overview-table/overview-table.component';
import { JobShiftCalenderComponent } from './components/job-shift-calender/job-shift-calender.component';
import { JobShiftDetailComponent } from './components/job-shift-detail/job-shift-detail.component';


import { SortByDateComponent } from './components/sort-by-date/sort-by-date.component';
import { SortByEmployeeComponent } from './components/sort-by-employee/sort-by-employee.component';
import { MainCardComponent } from './components/main-card/main-card.component';
import { SubCardComponent } from './components/sub-card/sub-card.component';
import { JobshiftDialog } from './dialogs/jobshift/jobshift.dialog';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftRequestDetailComponent } from './components/shift-request-detail/shift-request-detail.component';
import { ShiftRequestCardComponent } from './components/shift-request-card/shift-request-card.component';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { RosterComponent2 } from './roster.component';
import { ShiftsCalenderComponent } from './components/shifts-calender/shifts-calender.component';
import { SubLayoutComponent } from './layout/sub-layout/sub-layout.component';
import { DialogLayoutComponent } from './layout/dialog-layout/dialog-layout.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './services/modal/modal.service';
import { DateCardComponent } from './components/date-card/date-card.component';
import { EmployeeShiftManagmentDialog } from './dialogs/employee-shift-managment/employee-shift-managment.dialog';
import { ChangeShiftComponent } from './dialogs/change-shift/change-shift.component';
import { AdditionalShiftComponent } from './dialogs/additional-shift/additional-shift.component';
import { MarkWeekendComponent } from './components/mark-weekend/mark-weekend.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { TimeBoxComponent } from './components/time-box/time-box.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { CheckInOutCalendarComponent } from './components/check-in-out-calendar/check-in-out-calendar.component';
import { ShiftSetupComponent } from './pages/shift-setup/shift-setup.component';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { EmployeeCheckBoxComponent } from './components/employee-check-box/employee-check-box.component';
import { DateCheckBoxComponent } from './components/date-check-box/date-check-box.component';
import { WeekendTypeComponent } from './dialogs/weekend-type/weekend-type.component';
import { EmployeeShiftListComponent } from './dialogs/employee-shift-list/employee-shift-list.component';
import { EventComponent } from './dialogs/event/event.component';
import { CalenderSetupComponent } from './dialogs/calender-setup/calender-setup.component';
import { LocationAndDesignationFilterComponent } from './components/location-and-designation-filter/location-and-designation-filter.component';
import { ShiftRequestByLmComponent } from './pages/shift-request-by-lm/shift-request-by-lm.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {DragDropModule} from '@angular/cdk/drag-drop';






@NgModule({
  declarations: [
    AttendenceCalenderComponent,
    RosterComponent,
    RosterComponent2,
    AvaliableShiftDialog,
    SelectBoxComponent,
    DateBoxComponent,
    FileUploadComponent,
    ButtonComponent,
    EmployeeShiftAlloctionComponent,
    ShiftAllocationComponent,
    BoardCardComponent,
    EmployeeCardComponent,
    EmployeeShiftCardComponent,
    UploadFilesBoxComponent,
    RosterCplComponent,
    OverviewTableComponent,
    JobShiftCalenderComponent,
    JobShiftDetailComponent,
    SingleShiftAllocationDialog,
    OvertimeAdjustmentDialog,
    SingleShiftDetailDialog,
    DisclaimerDialog,
    ShiftManagmentDialog,
    SortByDateComponent,
    SortByEmployeeComponent,
    MainCardComponent,
    SubCardComponent,
    JobshiftDialog,
    ShiftRequestComponent,
    ShiftListComponent,
    OvertimeHoursAdjusmentDialog,
    ShiftRequestDetailComponent,
    MorningJobShiftDialog,
    NightJobShiftDialog,
    ShiftRequestCardComponent,
    FullLayoutComponent,
    SubLayoutComponent,
    ShiftsCalenderComponent,
    DialogLayoutComponent,
    DateCardComponent,
    EmployeeShiftManagmentDialog,
    ChangeShiftComponent,
    AdditionalShiftComponent,
    MarkWeekendComponent,
    InputBoxComponent,
    TimeBoxComponent,
    CheckBoxComponent,
    CheckInOutCalendarComponent,
    ShiftSetupComponent,
    DefaultViewComponent,
    EmployeeCheckBoxComponent,
    DateCheckBoxComponent,
    WeekendTypeComponent,
    EmployeeShiftListComponent,
    EventComponent,
    CalenderSetupComponent,
    LocationAndDesignationFilterComponent,
    ShiftRequestByLmComponent,
    

   
  ],
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RosterRoutingModule,
    NgbModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule , 
    DragDropModule
  ],
  providers: [ModalService, NgbActiveModal, NgbModal],
})
export class RosterModule {}
