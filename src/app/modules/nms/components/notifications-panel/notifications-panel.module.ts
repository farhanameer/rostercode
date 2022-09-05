import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDialogModule } from "@angular/material/dialog";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { GetNotificationsService } from "../../services/get-notifications.service";
import { ToastService } from "../../services/toast.service";
import { ObservableService } from "../../util/observablefn.service";
import { NotificationsPanelComponent } from "./notifications-panel.component";

@NgModule({
  declarations: [
    NotificationsPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatDialogModule,
    InfiniteScrollModule,
  ],
  providers: [
    GetNotificationsService,
    ObservableService,
    ToastService,
  ],
  exports: [
    NotificationsPanelComponent
  ]
})
export class NotificationsPanelModule {}
