import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliableShiftDialog } from './dialogs/avaliable-shift/avaliable-shift.dialog';
import { DisclaimerDialog } from './dialogs/disclaimer/disclaimer.dialog';
import {  EmployeeShiftManagementDialog } from './dialogs/employee-shift-management/employee-shift-management.dialog';
import {JobshiftDialog } from './dialogs/jobshift/jobshift.dialog';
import { MorningJobShiftDialog } from './dialogs/morning-job-shift/morning-job-shift.dialog';
import { NightJobShiftDialog } from './dialogs/night-job-shift/night-job-shift.dialog';
import { OvertimeAdjustmentDialog } from './dialogs/overtime-adjustment/overtime-adjustment.dialog';
import { OvertimeHoursAdjusmentDialog } from './dialogs/overtime-hours-adjusment/overtime-hours-adjusment.dialog';
import { ShiftManagmentDialog } from './dialogs/shift-managment/shift-managment.dialog';
import { SingleShiftAllocationDialog } from './dialogs/single-shift-allocation/single-shift-allocation.dialog';
import { SingleShiftDetailDialog } from './dialogs/single-shift-detail/single-shift-detail.dialog';
import { RosterCplComponent } from './pages/roster-cpl/roster-cpl.component';
import { RosterComponent } from './pages/roster/roster.component';
import { ShiftAllocationComponent } from './pages/shift-allocation/shift-allocation.component';
import { ShiftRequestComponent } from './pages/shift-request/shift-request.component';
import { AttendenceCalenderComponent } from './components/attendence-calender/attendence-calender.component';
import { JobShiftDetailComponent } from './components/job-shift-detail/job-shift-detail.component';
import { ShiftRequestApprovalComponent } from './components/shift-request-approval/shift-request-approval.component';
import { ShiftRequestDetailComponent } from './components/shift-request-detail/shift-request-detail.component';
import { SortByDateComponent } from './components/sort-by-date/sort-by-date.component';
import { SortByEmployeeComponent } from './components/sort-by-employee/sort-by-employee.component';

const routes: Routes = [
  {
    path:'calender',
    component:AttendenceCalenderComponent
  },
  {
    path:'roster',
    component:RosterComponent
  },
  {
    path:'shiftAllocation',
    component:ShiftAllocationComponent
  },
  {
    path:'rosterCPL',
    component:RosterCplComponent
  },
  {
    path:'single',
    component:SingleShiftAllocationDialog
  },
  {
    path:'overtime',
    component:OvertimeAdjustmentDialog
  },
  {
    path:'shiftdetails',
    component:SingleShiftDetailDialog
  },
  {
    path:'disclaimer',
    component:DisclaimerDialog
  },
  {
    path:'avaliableshift',
    component:AvaliableShiftDialog
  },
  {
    path:'shiftmanagement',
    component:ShiftManagmentDialog,
    children: [
      {
        path:'sortbydate',
         component:SortByDateComponent
      },
      {
        path:'sortbyemployee',
         component: SortByEmployeeComponent
      }
    ]
  },
  {
    path:'morningshift',
    component:MorningJobShiftDialog
  },
  {
    path:'nightshift',
    component:NightJobShiftDialog
  },
  {
    path:'shiftrequest',
    component:ShiftRequestComponent
  },
  {
    path:'employeeshift',
    component:EmployeeShiftManagementDialog
  },
  {
    path:'overtimehours',
    component:OvertimeHoursAdjusmentDialog
  },
  {
    path:'requestapproval',
    component:ShiftRequestApprovalComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
