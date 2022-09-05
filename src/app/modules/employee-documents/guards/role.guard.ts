import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from "@angular/router";
import { Observable } from "rxjs";
import { ObservableService } from "../util/observablefn.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private os: ObservableService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem("token_nda");
    const link = this.os.getPortal();

    const roles = route.data;
    console.log(state, route);
    console.log(this.route.snapshot);

    for (const role in roles) if (link == roles[role]) return true;
    if (state.url) this.router.navigate(['employee-documents/page-not-found']);
    else this.router.navigate(['/login']);
    return false;
    return true;
  }
}
