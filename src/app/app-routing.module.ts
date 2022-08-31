import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliableShiftDialog } from './dialogs/avaliable-shift/avaliable-shift.dialog';
import { DisclaimerDialog } from './dialogs/disclaimer/disclaimer.dialog';
import { OvertimeAdjustmentDialog } from './dialogs/overtime-adjustment/overtime-adjustment.dialog';
import { SingleShiftAllocationDialog } from './dialogs/single-shift-allocation/single-shift-allocation.dialog';
import { SingleShiftDetailDialog } from './dialogs/single-shift-detail/single-shift-detail.dialog';
import { RosterCplComponent } from './pages/roster-cpl/roster-cpl.component';
import { RosterComponent } from './pages/roster/roster.component';
import { ShiftAllocationComponent } from './pages/shift-allocation/shift-allocation.component';
import { AttendenceCalenderComponent } from './roster/attendence-calender/attendence-calender.component';
import { JobShiftDetailComponent } from './roster/job-shift-detail/job-shift-detail.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
