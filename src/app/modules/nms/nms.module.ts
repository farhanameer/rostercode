import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationsPanelComponent } from "./components/notifications-panel/notifications-panel.component";
import { NMSRoutingModule } from "./nms-routing.module";
import { MatBadgeModule } from "@angular/material/badge";
import { NotificationPopupComponent } from "./dialogs/notification-popup/notification-popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ShowNotificationsComponent } from "./pages/show-notifications/show-notifications.component";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationSettingsComponent } from "./components/notification-settings/notification-settings.component";
import { MatRadioModule } from "@angular/material/radio";
import { HRPortalNMSComponent } from "./pages/hr-portal-nms/hr-portal-nms.component";
import { LMPortalNMSComponent } from "./pages/lm-portal-nms/lm-portal-nms.component";
import { NotificationRecieversPopupComponent } from "src/app/modules/nms/dialogs/notification-recievers-popup/notification-recievers-popup.component";
import { NotificationHistoryComponent } from "./pages/notification-history/notification-history.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CustomSelectComponent } from "./components/custom-select/custom-select.component";
import { SearchFilterPipe } from "./util/search-filter.pipe";
import { ObservableService } from "./util/observablefn.service";
import { ToastService } from "./services/toast.service";
import { NotificationSettingsService } from "./services/notification-settings.service";
import { GetNotificationsService } from "./services/get-notifications.service";
import { NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";
import { SingleNotificationHistoryComponent } from './dialogs/single-notification-history/single-notification-history.component'
import { FormatDatePipe } from "./util/format-date.pipe";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ValidatorsService } from "./validators/validators.service";
import { NotificationsPanelModule } from "./components/notifications-panel/notifications-panel.module";
import { AllowNotification } from "./dialogs/allow-notification-popup/allow-notification.modal";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    NotificationPopupComponent,
    ShowNotificationsComponent,
    NotificationSettingsComponent,
    HRPortalNMSComponent,
    LMPortalNMSComponent,
    NotificationRecieversPopupComponent,
    NotificationHistoryComponent,
    CustomSelectComponent,
    SearchFilterPipe,
    FormatDatePipe,
    SingleNotificationHistoryComponent,
    AllowNotification,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NMSRoutingModule,
    InfiniteScrollModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDialogModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    NotificationsPanelModule
  ],
  providers: [
    GetNotificationsService,
    ObservableService,
    ToastService,
    NotificationSettingsService,
    GetNotificationsService,
    ValidatorsService,
    AuthGuard,
    RoleGuard
  ],
})
export class NMSModule {}
