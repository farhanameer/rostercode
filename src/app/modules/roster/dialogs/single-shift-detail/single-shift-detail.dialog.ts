import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal/modal.service';
import { SingleShiftAllocationDialog } from '../single-shift-allocation/single-shift-allocation.dialog';

@Component({
  selector: 'app-single-shift-detail',
  templateUrl: './single-shift-detail.dialog.html',
  styleUrls: ['./single-shift-detail.dialog.css']
})
export class SingleShiftDetailDialog implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private customModal: ModalService) { }

  ngOnInit(): void {
  }

  open(){
    this.customModal.showFeaturedDialog(SingleShiftAllocationDialog);
  }
}
