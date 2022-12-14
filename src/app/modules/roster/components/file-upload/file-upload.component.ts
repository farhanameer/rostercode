import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAttendanceForm } from 'src/app/shared/form/employee-attendance.form';
import { AvaliableShiftDialog } from '../../dialogs/avaliable-shift/avaliable-shift.dialog';
import { CalenderSetupComponent } from '../../dialogs/calender-setup/calender-setup.component';
import { DisclaimerDialog } from '../../dialogs/disclaimer/disclaimer.dialog';
import { EmployeeShiftListComponent } from '../../dialogs/employee-shift-list/employee-shift-list.component';
import { EventComponent } from '../../dialogs/event/event.component';
import { ShiftAllocationDataService } from '../../services/data/shiftAllocation.data.service';
import { ModalService } from '../../services/modal/modal.service';
import { ShiftListComponent } from '../shift-list/shift-list.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit , OnChanges {


  @Input() reset : any;
  constructor(public activeModal: NgbActiveModal,
    private customModal: ModalService , private shiftAlocation : ShiftAllocationDataService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.file = null;  
  }
  

  
  ngOnInit(): void {
  }

  open(){
    this.customModal.showFeaturedDialog(DisclaimerDialog, "");
  }
  
 
  openAvaliable(){
    this.customModal.showFeaturedDialog(AvaliableShiftDialog, "");
  }

  file = null;
  async fileChange(event){
    console.log(event.files);
    this.file = event.files[0];
   
  }


  async uploadFile(){
    const result = await this.shiftAlocation.createShiftFile(this.file);
    console.log(result);
  }
 
  
}
