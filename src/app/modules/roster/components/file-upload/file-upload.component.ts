import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AvaliableShiftDialog } from '../../dialogs/avaliable-shift/avaliable-shift.dialog';
import { CalenderSetupComponent } from '../../dialogs/calender-setup/calender-setup.component';
import { DisclaimerDialog } from '../../dialogs/disclaimer/disclaimer.dialog';
import { EmployeeShiftListComponent } from '../../dialogs/employee-shift-list/employee-shift-list.component';
import { EventComponent } from '../../dialogs/event/event.component';
import { ModalService } from '../../services/modal/modal.service';
import { ShiftListComponent } from '../shift-list/shift-list.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private customModal: ModalService){}

  ngOnInit(): void {
  }
  open(){
    this.customModal.showFeaturedDialog(DisclaimerDialog, "");
  }
  
 
  openAvaliable(){
    this.customModal.showFeaturedDialog(AvaliableShiftDialog, "");
  }
  
}
