import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisclaimerComponent } from './dialogs/disclaimer/disclaimer.component';
import { OvertimeAdjustmentComponent } from './dialogs/overtime-adjustment/overtime-adjustment.component';
import { SingleShiftAllocationComponent } from './dialogs/single-shift-allocation/single-shift-allocation.component';
import { SingleShiftDetailComponent } from './dialogs/single-shift-detail/single-shift-detail.component';
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
    component:SingleShiftAllocationComponent
  },
  {
    path:'overtime',
    component:OvertimeAdjustmentComponent
  },
  {
    path:'shiftDetails',
    component:SingleShiftDetailComponent
  },
  {
    path:'disclaimer',
    component:DisclaimerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
