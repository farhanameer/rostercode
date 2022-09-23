import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { forEachChild } from 'typescript';
import { RosterService } from '../../services/data/rosterView.data.service';

@Component({
  selector: 'app-sort-by-date',
  templateUrl: './sort-by-date.component.html',
  styleUrls: ['./sort-by-date.component.css'],
})
export class SortByDateComponent implements OnInit {
  @Input() dates: any;

  data: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private dataService: RosterService,
    private appLocalStorage: AppLocalStorageService
  ) {}

  ngOnInit(): void {
    console.log('in popup', this.dates);
    this.getLMRosterView({
      client_id: this.appLocalStorage.getClientId(),
      year_month: '2022-07',
      is_roster_employees: 1,
      reporting_to_id: this.appLocalStorage.getUserId(),
    });
  }

  async getLMRosterView(params) {
    const data = await this.dataService.getLMRosterView(params);

    if (!data['data']['status']) {
      console.log('error a gya');
      return;
    }

    const response = data['data']['payload'];
    const hash = {};
    const transformedData = [];

    response.forEach((singleData) => {
      let employeeArray = [];
      const obj = {
        date: singleData.date,
        employees: [],
      };

      singleData.shifts.forEach((singleShift) => {
        employeeArray = [...employeeArray, ...singleShift.employees];
      });

      obj.employees = employeeArray;
      this.data.push(obj);
    });

    console.log('loopAble Data', this.data);
  }
}
