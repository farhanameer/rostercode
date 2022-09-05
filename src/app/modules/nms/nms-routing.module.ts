import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotificationsPanelComponent } from "./components/notifications-panel/notifications-panel.component";
import { NotificationSettingsComponent } from "./components/notification-settings/notification-settings.component";
import { ShowNotificationsComponent } from "./pages/show-notifications/show-notifications.component";
import { NotificationHistoryComponent } from "./pages/notification-history/notification-history.component";
import { HRPortalNMSComponent } from "./pages/hr-portal-nms/hr-portal-nms.component";
import { LMPortalNMSComponent } from "./pages/lm-portal-nms/lm-portal-nms.component";
import { RoleGuard } from "./guards/role.guard";
import { AuthGuard } from "src/app/guard/auth.guard";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "all-notifications",
    component: NotificationsPanelComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: ["hrportal", "lmportal", "emportal"],
  },
  {
    path: "show-notifications",
    component: ShowNotificationsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: ["hrportal", "lmportal", "emportal"],
  },
  {
    path: "hr-notification-settings",
    component: HRPortalNMSComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: ["hrportal"],
  },
  {
    path: "lm-notification-settings",
    component: LMPortalNMSComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: ["lmportal"],
  },
  {
    path: "notification-history",
    component: NotificationHistoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: ["hrportal", "lmportal"],
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NMSRoutingModule {}
