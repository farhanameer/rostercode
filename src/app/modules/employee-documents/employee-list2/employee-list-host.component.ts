import { Compiler, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Form, Role } from 'src/app/shared/constants/constants';
import { ComponentDirective } from 'src/app/shared/directive/component.directive';

@Component({
  selector: 'app-employee-list-host',
  templateUrl: './employee-list-host.component.html',
  styleUrls: ['./employee-list-host.component.scss']
})
export class EmployeeListHostComponent implements OnInit {

  currentUrl: string = "";
  private destroy$ = new Subject();
  @ViewChild(ComponentDirective) componentHost: ComponentDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private vcref: ViewContainerRef,
    private injector: Injector, private route: ActivatedRoute, private router: Router, private compilor: Compiler) { }

  ngOnInit(): void {
    let that = this;
    that.getUrl();

  }

  getUrl() {
    let that = this;
    var url = /[^/]*$/.exec(this.router.url)[0];
    if (url) {
      this.currentUrl = this.getPathFromUrl(url);
      var portal = localStorage.getItem('link');
      this.loadComponent(portal);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPathFromUrl(url) {
    return url.split("?")[0];
  }

  loadComponent(currentRole: any) {
    let that = this;
    let componentFactory;
    switch (currentRole) {
      case Role.HR:
          import('../employee-list/hr-employee-list/hr-employee-list.component').then(
            ({ HrEmployeeListComponent }) => {
              componentFactory = that.componentFactoryResolver.resolveComponentFactory(HrEmployeeListComponent);
              const viewContainerRef = that.componentHost.viewContainerRef;
              viewContainerRef.clear();
              viewContainerRef.createComponent(componentFactory);
            }
          )
        break;
      case Role.CR:
        import('../employee-list/cr-employee-list/cr-employee-list.component').then(
          ({ CrEmployeeListComponent }) => {
            componentFactory = that.componentFactoryResolver.resolveComponentFactory(CrEmployeeListComponent);
              const viewContainerRef = that.componentHost.viewContainerRef;
              viewContainerRef.clear();
              viewContainerRef.createComponent(componentFactory);
            }
          )
        break;
        case Role.LM:
          import('../employee-list/lm-employee-list/lm-employee-list.component').then(
            ({ LmEmployeeListComponent }) => {
              componentFactory = that.componentFactoryResolver.resolveComponentFactory(LmEmployeeListComponent);
                const viewContainerRef = that.componentHost.viewContainerRef;
                viewContainerRef.clear();
                viewContainerRef.createComponent(componentFactory);
              }
            )
          break;
      default:
        break;
    }
  }
}
