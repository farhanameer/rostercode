import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftAllocationComponent } from '../../pages/shift-allocation/shift-allocation.component';
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
    private customModal: ModalService) { }
    
  ngOnInit(): void {
    console.log(this.data);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
  }
  

  open(){
    this.customModal.showFeaturedDialog(SingleShiftAllocationDialog, this.data);
this.activeModal.close(ShiftAllocationComponent)
  }
}
