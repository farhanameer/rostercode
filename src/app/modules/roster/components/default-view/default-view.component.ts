import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WeekendTypeComponent } from '../../dialogs/weekend-type/weekend-type.component';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.css']
})
export class DefaultViewComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private customModal: ModalService) { }

  ngOnInit(): void {
  }
  open(){
    this.customModal.showFeaturedDialog(WeekendTypeComponent, "");

  }

}
