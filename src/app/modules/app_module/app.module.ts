import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SidebarModule } from 'ng-sidebar';
import { AgGridModule } from 'ag-grid-angular';
import { GridModule } from '@progress/kendo-angular-grid';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ChartModule } from 'angular-highcharts';

import { AppRoutingModule, routingComponents } from '../routing_module/app-routing.module';
import { AppComponent } from './app.component';

import { HttpLoaderModule } from 'src/app/shared/components/http-loader/http-loader.module';
import { CustomMatPaginatorIntl } from 'src/app/shared/modules/material/custom-mat-paginator-int';
import { JqueryLoaderModule } from 'src/app/shared/components/jquery-loader/jquery-loader.module';
import { TokenInterceptor } from 'src/app/services/token-interceptor.service';
import { HttpService } from 'src/app/shared/http-service/http.service';
import { CryptoService } from 'src/app/services/crypto.service';

import { PeopleFrameComponent } from '../../shared/components/people-frame/people-frame.component';
import { HeaderComponent } from '../../shared/components/people-frame/header/header.component';
import { SimpleHeaderComponent } from '../../shared/components/simple-header/simple-header.component';
import { LoaderService } from '../../services/loader.service';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { FooterModule } from '../../shared/modules/footer/footer.module';
import { EmployeeAttendanceForm } from '../../shared/form/employee-attendance.form';
import { MenuPageModule } from 'src/app/shared/modules/menu-page/menu-page.module';
import { EmployeeDocumentsModule } from '../employee-documents/employee-documents.module';
import { NMSModule } from '../nms/nms.module';
import { RosterModule } from '../roster/roster.module';


declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    PeopleFrameComponent,
    SimpleHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    ReactiveFormsModule,
    SidebarModule.forRoot(),
    SharedModule.forRoot(),
    MenuPageModule,
    FooterModule,
    HttpLoaderModule,
    JqueryLoaderModule,
    GridModule,
    BsDropdownModule.forRoot(),
    AgGridModule.withComponents([]),
    MaterialModule,
    EmployeeDocumentsModule,
    NMSModule,
    // ATSModule,
    RosterModule
  ],
  providers: [
    LoaderService,
    EmployeeAttendanceForm,
    HttpService,
    CryptoService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ],
  bootstrap: [AppComponent]
})

// declare module "@angular/core" {
//   interface ModuleWithProviders<T = any> {
//     ngModule: Type<T>;
//     providers?: Provider[];
//   }
// }

export class AppModule { }
