import { Component, Input, OnInit } from '@angular/core';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { ClusterAndSubClusterDataService } from '../../services/data/clusterAndSubCluster.data.service';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ShiftRequestDataService } from '../../services/data/shiftRequest.data';
import { LinkCheckerService } from '../../services/linkChecker.service';
import moment from 'moment';

@Component({
  selector: 'app-roster-cpl',
  templateUrl: './roster-cpl.component.html',
  styleUrls: ['./roster-cpl.component.css']
})
export class RosterCplComponent implements OnInit {

  @Input() shifts = {};
  constructor(private clusterAndSubCluster : ClusterAndSubClusterDataService,
    private rosterView : RosterService,
    private appLocalStorageService : AppLocalStorageService,
    private shiftRequestService : ShiftRequestDataService,
    public linkService : LinkCheckerService) { }
  clientTypesArray : any = [];
  reportingTypesArray : any = [];
  departmentsArray : any = [];
  employeesArray : any = [];
  shiftsArray : any = [];
  filters : any = {};
  searchValue: any;
  ngOnInit(): void {
    this.getClientTypes();
    this.getReportingTypes();
    this.getDepartments();
  }

  onClick(object){
    console.log(object);
  }
  loopAbleShifts;
  time_in_footer;
  time_out_footer;
  currentDate : any;
  getNewShifts(shifts){
    this.loopAbleShifts = shifts;
    console.log('event catched',shifts);
    // console.log("Time in SHIFTS", shifts[0].plan_shift_time_in);
    this.time_in_footer = moment(shifts[0].plan_shift_time_in).format("hh:mm");;
    this.time_out_footer = moment(shifts[0].plan_shift_time_out).format("hh:mm");
    console.log("Time in", this.time_in_footer);
    console.log("Time out", this.time_out_footer);
    console.log("Loop Able Shifts", this.loopAbleShifts);
  }
  dateChanged(date){
    this.currentDate = date;
    console.log('date changed' , date);
  }
  selectionChanged(selection){


    console.log('selection' , selection);
    let obj = {};
    obj[selection.controlName] = selection.value;
    this.filters = {...this.filters , ...obj};
    this.filters[selection.controlName]=selection.value;
    if(selection.controlName == 'department'){
      this.getEmployees(selection.value);
      this.getShifts(selection.value);
    }
    // if(selection.controlName == 'employees'){
    //   this.getShifts(selection.value)
    // }
  }
  transformDropDownData(array , idKey , valueKey){
    if(!Array.isArray(array)) return [];
    const dropDownArray = [];
    array.forEach(d =>{
      dropDownArray.push({
        id : d[idKey] , 
        name : d[valueKey]
      })
    });
    return dropDownArray;
  }
  async getClientTypes(){
    console.log('getClientTypes');
    const data =await this.clusterAndSubCluster.getRosterType();
    console.log('data in roster type',data);
    if(!data["status"]) return;
    console.log(data["payload"]);
    this.clientTypesArray = this.transformDropDownData(data["data"]["data"] , 'reference_key' , 'description');
    console.log('data after fixed',this.clientTypesArray);
  }

  async getReportingTypes(){
    console.log('getClientTypes');
    const data =await this.clusterAndSubCluster.getReporting();
    if(!data["status"]) return;
    console.log(data["payload"]);
    this.reportingTypesArray = this.transformDropDownData(data["data"]["data"] , 'reference_key' , 'description');
  }

  async getDepartments(){
    let bodyParams = {};
    if(this.linkService.isLineManagerPortal()){
      bodyParams['line_manager_id'] = await this.appLocalStorageService.getLineManagerId();
    }
    const data =await this.clusterAndSubCluster.getDepartment(bodyParams);
    if(!data["status"]) return;
    console.log(data["data"]);
    this.departmentsArray = this.transformDropDownData(data["data"] , 'id' , 'department_name');
  }


  async getEmployees(departmentId){
    console.log('getClientTypes');
    const params = {
      client_id : this.appLocalStorageService.getClientId(),
      department_id : departmentId
    }
    if(this.linkService.isLineManagerPortal()){
      params['dept_id'] = await this.appLocalStorageService.getLineManagerId();
    }
    if(!this.linkService.isLineManagerPortal()){
      return;
    }
    const data =await this.rosterView.getEmployeeList(params);
    if(!data["status"]) return;
    console.log(data["payload"]);
    this.employeesArray = this.transformDropDownData(data["data"]["payload"] , 'emp_id' , 'name');
  }


  async getShifts(departmentId){
    console.log('getClientTypes');
    const params = {
      department_id : departmentId
    }
    let portal = this.linkService.isLineManagerPortal() ? 'lm' : 'hr';
    const data =await this.shiftRequestService.getDefaultList(portal , params);
    if(!data["status"]) return;
    console.log(data["payload"]);
    this.shiftsArray = this.transformDropDownData(data["data"]["payload"] , 'id' , 'name');
  }

  search(event: any){
    console.log(event);
    this.searchValue = event;
  }



}
