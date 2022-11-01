import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MorningJobShiftDialog } from '../../dialogs/morning-job-shift/morning-job-shift.dialog';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-employee-shift-card',
  templateUrl: './employee-shift-card.component.html',
  styleUrls: ['./employee-shift-card.component.css']
})
export class EmployeeShiftCardComponent implements OnInit {

  @Input() data : any;
  @Input() dayName : any;
  @Output() itemDropped : EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,
    private customModal: ModalService) { }

  ngOnInit(): void {
  }
  drop(event){
    this.itemDropped.emit(event);
  }
  open(){
    const data = {
      employees : this.data, 
      name : this.dayName
    }
    this.customModal.showFeaturedDialog(MorningJobShiftDialog, "",data);
  }
}
