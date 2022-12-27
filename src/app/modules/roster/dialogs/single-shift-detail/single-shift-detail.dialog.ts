import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftAllocationComponent } from '../../pages/shift-allocation/shift-allocation.component';
import { LinkCheckerService } from '../../services/linkChecker.service';
import { ModalService } from '../../services/modal/modal.service';
import { SingleShiftAllocationDialog } from '../single-shift-allocation/single-shift-allocation.dialog';

@Component({
  selector: 'app-single-shift-detail',
  templateUrl: './single-shift-detail.dialog.html',
  styleUrls: ['./single-shift-detail.dialog.css']
})
export class SingleShiftDetailDialog implements OnInit, OnChanges {
  @Input() data:any;
  constructor(public activeModal: NgbActiveModal,
    private customModal: ModalService,
    public linkService : LinkCheckerService) { }
    
  ngOnInit(): void {
    console.log(this.data);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
  }
  

  open(){
    const ref = this.customModal.showFeaturedDialog(SingleShiftAllocationDialog, this.data);
    ref.closed.subscribe(event =>{
      if(event){
        this.activeModal.close(true)
      }
    });
    // this.activeModal.close(false)
  }
}
