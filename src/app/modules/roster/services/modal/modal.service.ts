import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal,
    private componentFactoryResolver: ComponentFactoryResolver
    ) { }
    showDefaultModalComponent(theComponent: any) {
      const componenetFactory = this.componentFactoryResolver.resolveComponentFactory(
        theComponent
      );
      const modalRef = this.ngbModal.open(theComponent);
      
      return modalRef;
    }
  
    showFeaturedDialog(theComponent: any, employee: any , data = null) {
      const componenetFactory = this.componentFactoryResolver.resolveComponentFactory(
        theComponent 
      );
  
      const modalRef = this.ngbModal.open(theComponent, {modalDialogClass: 'ag-modal'});
      modalRef.componentInstance.data = employee;
      modalRef.componentInstance.dates = data;
      return modalRef;
    }
}
