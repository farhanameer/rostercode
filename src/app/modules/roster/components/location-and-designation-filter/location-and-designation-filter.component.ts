import { Component, OnInit } from '@angular/core';
import { ClusterAndSubClusterDataService } from '../../services/data/clusterAndSubCluster.data.service';

@Component({
  selector: 'app-location-and-designation-filter',
  templateUrl: './location-and-designation-filter.component.html',
  styleUrls: ['./location-and-designation-filter.component.css']
})
export class LocationAndDesignationFilterComponent implements OnInit {

  constructor(private dataService : ClusterAndSubClusterDataService) { }
  marketArray : any[] = [];
  clusterArray :any[] = [];
  subClusterArray :any [] = [];
  countriesArray :any [] = [];
  statesArray :any [] = [];
  citiesArray :any [] = [];
  branchesArray :any [] = [];
  departmentArray :any [] = [];

  dropDowns = {
    'market' : 'getCluster' , 
    'cluster' : 'getSubCluster' , 
    'country' : 'getStates',
    'state' : 'getCities' , 
    'city' : 'getBranches' , 
    'branch' : 'getDepartments'
  }
  dropDownArrays = { 
    'market' : 'clusterArray' , 
    'cluster' : 'subClusterArray' , 
    'subCluster' : 'countriesArray',
    'country' : 'statesArray',
    'state' : 'citiesArray' , 
    'city' : 'branchesArray' , 
    'branch' : 'departmentArray'
    
  }
  ngOnInit(): void {
    this.getMarket();
  }


  transformArrayForDropdown(array , idKey , nameKey) {
    const transformedArray = [];
    array.forEach(entry =>{
      transformedArray.push({
        id : entry[idKey] , 
        name : entry[nameKey]
      })
    });
    return transformedArray;
  }
  
  resetDropDown(resetAll = false , controlName){
    let foundKey = resetAll;
    for(const key in this.dropDownArrays){
      if(key == controlName){
        const arrayName = this.dropDownArrays[key];
        this[arrayName] = [];
        foundKey = true;
      }
      if(foundKey) {
        const arrayName = this.dropDownArrays[key];
        this[arrayName] = [];
      }
    }
  }
  selectionChanged($event){
    
    console.log('selected value' , $event);
    this.resetDropDown(false , $event.controlName);
    if($event.controlName == 'subCluster'){
      console.log('in if statement');
      
      this.getCountries('sub_cluster_id',$event.value);
      return;
    }
    const fun = this.dropDowns[$event.controlName];
    this[fun]($event.value);
  }

  async getMarket(){
    const data = await this.dataService.getMarket();
    
    if(!data["status"]) return; //possible show error
    const markets = data["data"];
    if(markets.length != 0) {
      this.marketArray = this.transformArrayForDropdown(markets , 'id' , 'label');
      return;
    }
    this.getCountries();
  }
  async getCluster(marketId){
    const data = await this.dataService.getClusterByMarket(marketId);
    if(!data["status"]) return; //possible show error
    const clusters = data["data"];
    console.log('cluster' , clusters);
    if(clusters.length == 0 ) {
      this.getCountries();
      return;
    }
    this.clusterArray = this.transformArrayForDropdown(clusters , 'id' , 'label');
    console.log('clusters Array' , this.clusterArray);
  }
  async getSubCluster(clusterId){
    const data = await this.dataService.getSubClusterByCluster(clusterId);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('sub cluster' , array);
    if(array.length == 0){
      this.getCountries();
      return;
    }
    this.subClusterArray = this.transformArrayForDropdown(array , 'id' , 'label');
    console.log('sub clusters Array' , this.clusterArray);
  }
  async getCountries(key = null , value = null){
    const data = await this.dataService.getCountries(key , value);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('countries Array' , array);
    this.countriesArray = this.transformArrayForDropdown(array , 'country_id' , 'country');
    console.log('countries Array' , this.countriesArray);
  }
  async getStates(countryId){
    const data = await this.dataService.getStatesByCountry(countryId);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('states Array' , array);
    this.statesArray = this.transformArrayForDropdown(array , 'id' , 'value');
    console.log('states Array' , this.statesArray);
  }
  async getCities(stateId){
    const data = await this.dataService.getCitiesByState(stateId);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('cities Array' , array);
    this.citiesArray = this.transformArrayForDropdown(array , 'id' , 'city_name');
    console.log('cities Array' , this.citiesArray);
  }
  async getBranches(cityId){
    const data = await this.dataService.getBarnchByCity(cityId);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('branched Array' , array);
    this.branchesArray = this.transformArrayForDropdown(array , 'loc_id' , 'loc_desc');
    console.log('branches Array' , this.branchesArray);
  }
  async getDepartments(branchId){
    const data = await this.dataService.getDepartment();
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('departments Array' , array);
    this.departmentArray = this.transformArrayForDropdown(array , 'id' , 'department_name');
    console.log('departments Array' , this.departmentArray);
  }


}
