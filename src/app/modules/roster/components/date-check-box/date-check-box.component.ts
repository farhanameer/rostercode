import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WeekendTypeComponent } from '../../dialogs/weekend-type/weekend-type.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-date-check-box',
  templateUrl: './date-check-box.component.html',
  styleUrls: ['./date-check-box.component.css']
})
export class DateCheckBoxComponent implements OnInit {

  constructor( 
    public activeModal: NgbActiveModal,
       private customModal: ModalService
   ) { }

  ngOnInit(): void {
  }
open(){
    this.customModal.showFeaturedDialog(WeekendTypeComponent, "");

  }
}
