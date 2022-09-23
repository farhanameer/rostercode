import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WeekendTypeComponent } from '../../dialogs/weekend-type/weekend-type.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-employee-check-box',
  templateUrl: './employee-check-box.component.html',
  styleUrls: ['./employee-check-box.component.css']
})
export class EmployeeCheckBoxComponent implements OnInit {

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
