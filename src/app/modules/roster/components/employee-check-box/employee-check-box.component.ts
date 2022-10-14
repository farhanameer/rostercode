import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { WeekendTypeComponent } from '../../dialogs/weekend-type/weekend-type.component';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-employee-check-box',
  templateUrl: './employee-check-box.component.html',
  styleUrls: ['./employee-check-box.component.scss']
})
export class EmployeeCheckBoxComponent implements OnInit {
  @Input() modelData : any;
  constructor( 
   public activeModal: NgbActiveModal,
      private customModal: ModalService,
      private dataService : RosterService , 
       private appLocalStorage: AppLocalStorageService
  ) { }

  ngOnInit(): void {
    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      start_date : this.modelData.start , 
      end_date : this.modelData.end,
      is_roster_employees: 1,
      reporting_to_id: this.appLocalStorage.getUserId(),
      sortByEmployee : 'ASC'
    });
  }
  open(){
    this.customModal.showFeaturedDialog(WeekendTypeComponent, "");

  }


  data = [];
  async getLMRosterView(params) {


    const data = await this.dataService.getLMRosterView(params);

    if (!data['data']['status']) {
      return;
    }


    if(!Array.isArray(data['data']['payload'])){
      console.log('error');
      return;
    }

    const response = data['data']['payload'];


    console.log('response we got',response);

    this.data = response[0].employees;


    
    
    // response.forEach((singleData) => {
    //   let employeeArray = [];
    //   const obj = {
    //     date: singleData.date,
    //     employees: [],
    //   };

    //   singleData.shifts.forEach((singleShift) => {
    //     employeeArray = [...employeeArray, ...singleShift.employees];
    //   });

    //   obj.employees = employeeArray;
    //   this.data.push(obj);
    // });

    console.log('loopAble Data', this.data);
  }

}
