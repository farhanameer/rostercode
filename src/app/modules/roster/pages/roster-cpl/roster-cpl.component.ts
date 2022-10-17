import { Component, Input, OnInit } from '@angular/core';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { ClusterAndSubClusterDataService } from '../../services/data/clusterAndSubCluster.data.service';
import { RosterService } from '../../services/data/rosterView.data.service';
import { ShiftRequestDataService } from '../../services/data/shiftRequest.data';

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
    private shiftRequestService : ShiftRequestDataService) { }
  clientTypesArray : any = [];
  reportingTypesArray : any = [];
  departmentsArray : any = [];
  employeesArray : any = [];
  shiftsArray : any = [];
  filters : any = {};
  ngOnInit(): void {
    this.getClientTypes();
    this.getReportingTypes();
    this.getDepartments();
  }

  onClick(object){
    console.log(object);
  }
  selectionChanged(selection){


    console.log('selection' , selection);
    let obj = {};
    obj[selection.controlName] = selection.value;
    this.filters = {...this.filters , ...obj};
    this.filters[selection.controlName]=selection.value;
    if(selection.controlName == 'department'){
      this.getEmployees(selection.value)
    }
    if(selection.controlName == 'employees'){
      this.getShifts(selection.value)
    }
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
    const bodyParams = {
      line_manager_id : this.appLocalStorageService.getUserId()
    }
    const data =await this.clusterAndSubCluster.getDepartment(bodyParams);
    if(!data["status"]) return;
    console.log(data["data"]);
    this.departmentsArray = this.transformDropDownData(data["data"] , 'id' , 'department_name');
  }


  async getEmployees(departmentId){
    console.log('getClientTypes');
    const params = {
      dept_id : this.appLocalStorageService.getUserId(),
      client_id : this.appLocalStorageService.getClientId(),
      department_id : departmentId
    }
    const data =await this.rosterView.getEmployeeList(params);
    if(!data["status"]) return;
    console.log(data["payload"]);
    this.employeesArray = this.transformDropDownData(data["data"]["payload"] , 'emp_id' , 'name');
  }


  async getShifts(employeeId){
    console.log('getClientTypes');
    const params = {
      emp_id : employeeId
    }
    const data =await this.shiftRequestService.getDefaultList('lm' , params);
    if(!data["status"]) return;
    console.log(data["payload"]);
    this.shiftsArray = this.transformDropDownData(data["data"]["payload"] , 'id' , 'name');
  }



}
