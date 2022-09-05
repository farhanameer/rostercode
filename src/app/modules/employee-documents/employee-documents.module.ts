import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployeeDocumentsRoutingModule } from "./employee-documents-routing.module";
import { PhysicalLocationSetupComponent } from "./physical-location-setup/physical-location-setup.component";
import { EmployeeProfileComponent } from "./employee-profile/employee-profile.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxMatDatetimePickerModule } from "@angular-material-components/datetime-picker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {
  MatOptionModule,
  MAT_DATE_FORMATS,
  MAT_RIPPLE_GLOBAL_OPTIONS,
} from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { PersonalFileSetupComponent } from "./personal-file-setup/personal-file-setup.component";
import { PhysicalLocationSetupService } from "./services/physical-location-setup/physical-location-setup.service";
import { PhysicalLocationModal } from "./physical-location-setup/physical-location-modal/physical-location-modal";
import { HrProfileComponent } from "./hr-profile/hr-profile.component";
import { DocumentComponent } from "./components/document/document.component";
import { DocumentCategoryComponent } from "./components/document-category/document-category.component";

import { AddDocumentService } from "./services/add-document/add-document.service";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SearchFilterPipe } from "./util/search-filter/search-filter.pipe";
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from "@angular/material/snack-bar";
import { LimitRecordsPipe } from "./util/limit-records.pipe";
import { DocumentViewerModal } from "./components/document/document-viewer-modal/document-viewer-modal";
import { CategoryFieldModal } from "./components/document-category/category-field-modal/category-field-modal";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DocumentReportComponent } from "./document-report/document-report.component";
import { DocumentReportService } from "./services/document-report/document-report.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { NgxDocViewerModule } from "ngx-doc-viewer2";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { CdkTableModule } from "@angular/cdk/table";
import { MatTableModule } from "@angular/material/table";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MatButtonModule } from "@angular/material/button";
import { LookupService } from "../../services/lookup.service";
import { LoaderInterceptorService } from "./services/loader-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DropdownSkeletonLoaderComponent } from "./components/dropdown-skeleton-loader/dropdown-skeleton-loader.component";

@NgModule({
  declarations: [
    PhysicalLocationSetupComponent,
    EmployeeProfileComponent,
    PersonalFileSetupComponent,
    DocumentReportComponent,
    PhysicalLocationModal,
    HrProfileComponent,
    DocumentComponent,
    DocumentCategoryComponent,
    SearchFilterPipe,
    DocumentViewerModal,
    CategoryFieldModal,
    EmployeeListComponent,
    PageNotFoundComponent,
    DropdownSkeletonLoaderComponent,
  ],
  imports: [
    CommonModule,
    EmployeeDocumentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    CdkTableModule,
    MatTableModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
  ],
  providers: [
    PhysicalLocationSetupService,
    AddDocumentService,
    DocumentReportService,
    LookupService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 500 } },
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } } ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
  ],
})
export class EmployeeDocumentsModule {}
