import { Component, OnInit } from '@angular/core';
import { ClusterAndSubClusterDataService } from '../../services/data/clusterAndSubCluster.data.service';

@Component({
  selector: 'app-location-and-designation-filter',
  templateUrl: './location-and-designation-filter.component.html',
  styleUrls: ['./location-and-designation-filter.component.css']
})
export class LocationAndDesignationFilterComponent implements OnInit {

  constructor(private dataService : ClusterAndSubClusterDataService) { }
  marketArray : [];
  clusterArray : [];
  subClusterArray : [];
  countriesArray : [];
  statesArray : [];
  citiesArray : [];
  branchesArray : [];
  departmentArray : [];
  ngOnInit(): void {
    this.getMarket();
  }

  async getMarket(){
    const data = await this.dataService.getMarket();
    console.log(data);
  }
  getCluster(){

  }
  getSubCluster(){

  }
  getCountries(){
    
  }
  getStates(key = null , value = null){

  }
  getCities(){

  }
  getBranches(){

  }
  getDepartments(){

  }


}
