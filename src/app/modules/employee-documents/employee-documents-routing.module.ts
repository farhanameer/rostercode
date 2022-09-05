import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DocumentReportComponent } from './document-report/document-report.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { RoleGuard } from './guards/role.guard';
import { HrProfileComponent } from './hr-profile/hr-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonalFileSetupComponent } from './personal-file-setup/personal-file-setup.component';
import { PhysicalLocationSetupComponent } from './physical-location-setup/physical-location-setup.component';

const routes: Routes = [{
  path: 'physical-location-setup',
  component: PhysicalLocationSetupComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: ['hrportal']
}, {
  path: 'employee-profile',
  component: EmployeeProfileComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: ['emportal']
}, {
  path: 'hr-profile/:userId',
  component: HrProfileComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: ['hrportal']
}, {
  path: 'personal-file-setup',
  component: PersonalFileSetupComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: ['hrportal']
}, {
  path: 'employee-list',
  component: EmployeeListComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: ['hrportal']
}, {
  path: 'document-report',
  component: DocumentReportComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: ['hrportal']
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDocumentsRoutingModule { }
