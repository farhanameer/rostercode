import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ClusterAndSubClusterDataService } from '../../services/data/clusterAndSubCluster.data.service';

@Component({
  selector: 'app-location-and-designation-filter',
  templateUrl: './location-and-designation-filter.component.html',
  styleUrls: ['./location-and-designation-filter.component.css']
})
export class LocationAndDesignationFilterComponent implements OnInit , AfterViewInit , OnChanges {

  constructor(private dataService : ClusterAndSubClusterDataService,
    private appLocalStorage : AppLocalStorageService) { }
  
  

  @Output() filtersChange : EventEmitter<any> = new EventEmitter();
  @Input() resetFilters : Boolean = false;
  @Input() defaultValues : any = null;

  copiedMarketArray = [];
  marketArray : any[] = [];
  clusterArray :any[] = [];
  subClusterArray :any [] = [];
  countriesArray :any [] = [];
  statesArray :any [] = [];
  citiesArray :any [] = [];
  branchesArray :any [] = [];
  departmentArray :any [] = [];


  locationFilters = {
    marketId : -1 , 
    clusterId : -1 , 
    subClusterId : -1,
    countryId : -1 , 
    stateId : -1 , 
    cityId : -1,
    branchId : -1,
    departmentId : -1
  }

  defaultFiltersValues = {
    marketId : {} , 
    clusterId : {} , 
    subClusterId : {},
    countryId : {} , 
    stateId : {} , 
    cityId : {},
    branchId : {},
    departmentId : {}
  }
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
  dropDownName = { 
    'market' : 'marketId' , 
    'cluster' : 'clusterId' , 
    'subCluster' : 'subClusterId',
    'country' : 'countryId',
    'state' : 'stateId' , 
    'city' : 'cityId' , 
    'branch' : 'branchId',
    'department' : 'departmentId'
  }
  ngOnInit(): void {
    this.getMarket();
  }

  ngAfterViewInit(): void {
    this.filtersChange.emit(this.locationFilters);
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    this.clusterArray = [];
    this.subClusterArray = [];
    this.countriesArray = [];
    this.statesArray = [];
    this.citiesArray = [];
    this.branchesArray = [];
    this.departmentArray = [];
    this.marketArray = [];
    setTimeout(() => {
      this.marketArray = [...this.copiedMarketArray];
    }, 200);
    
    setTimeout(() => {
      this.populateFilterValues();
    }, 200);
    console.log('getting default values for filters' , this.defaultValues);
    
  }


  async populateFilterValues(){
    
    if(this.defaultValues && Object.entries(this.defaultValues).length !=0){
      await this.search(this.marketArray , this.defaultValues.glob_mkt_id , 'marketId' , this.getMarket , null);
      await this.search(this.clusterArray , this.defaultValues.region_id , 'clusterId' , this.getCluster, this.defaultValues.glob_mkt_id);
      await this.search(this.subClusterArray , this.defaultValues.sub_region_id , 'subClusterId' , this.getSubCluster, this.defaultValues.region_id );
     
      if(this.defaultValues.glob_mkt_id != -1){
        if(this.defaultValues.region_id == -1 && this.defaultValues.sub_region_id == -1) {
          await this.getCountries('marketId' , this.defaultValues.glob_mkt_id);
        }
        if(this.defaultValues.region_id != -1 && this.defaultValues.sub_region_id == -1){
          await this.getCountries('clusterId' , this.defaultValues.region_id);
        }
        if(this.defaultValues.region_id != -1 && this.defaultValues.sub_region_id != -1){
          await this.getCountries('subClusterId' , this.defaultValues.sub_region_id);
        }
      }
      else{
        await this.getCountries();
      }
      await this.search(this.countriesArray , this.defaultValues.country_id , 'countryId' , this.getCountries, null);
      await this.search(this.statesArray , this.defaultValues.state_id , 'stateId' , this.getStates, this.defaultValues.country_id);
      await this.search(this.citiesArray , this.defaultValues.city_id , 'cityId' , this.getCities, this.defaultValues.state_id);
      await this.search(this.branchesArray , this.defaultValues.branch_id , 'branchId' , this.getBranches, this.defaultValues.city_id);
      await this.search(this.departmentArray , this.defaultValues.department_id , 'departmentId' , this.getDepartments, this.defaultValues.branch_id);
    }
    else{
      console.log('problems')
    }
  }
  async search(array , value , key , apiFunction : any , apiFunctionParams = null){
    if(value == -1 && apiFunctionParams == -1){
      return;
    }
    if(array.length == 0){
      if(apiFunctionParams){
        array = await apiFunction(apiFunctionParams);
      }else{
        array = await apiFunction();
      }
    }
    array.forEach(item =>{
      if(item.id == value){
        this.defaultFiltersValues[key]=item;
      }
    })
  }

  transformArrayForDropdown(array : [], idKey , nameKey) {
    
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

  resetFilterValues(resetAll = false , controlName){
    let foundKey = resetAll;
    for(const key in this.dropDownName){
      if(key == controlName){
        const arrayName = this.dropDownName[key];
        this.locationFilters[arrayName] = -1;
        foundKey = true;
      }
      if(foundKey) {
        const arrayName = this.dropDownName[key];
        this.locationFilters[arrayName] = -1;
      }
    }
  }
  selectionChanged($event){
    
    console.log('selected value' , $event);
    this.resetDropDown(false , $event.controlName);
    this.resetFilterValues(false, $event.controlName);
    if($event.controlName == 'subCluster'){
      console.log('in if statement');
      
      this.getCountries('sub_cluster_id',$event.value);
      this.locationFilters.subClusterId = $event.value;
      this.filtersChange.emit(this.locationFilters);
      return;
    }



    const fun = this.dropDowns[$event.controlName];
    if(!fun){
      this.locationFilters.departmentId = $event.value;
      this.filtersChange.emit(this.locationFilters);
      return;
    }
    this[fun]($event.value);

    
    const filterKey = this.dropDownName[$event.controlName];
    this.locationFilters[filterKey] = $event.value;
    this.filtersChange.emit(this.locationFilters);
  }

  async getMarket(){
    const data = await this.dataService.getMarket();
    
    if(!data["status"]) return; //possible show error
    const markets = data['data'];

    
    if(markets.length != 0) {
      
      this.marketArray = this.transformArrayForDropdown(markets , 'id' , 'value');
      this.copiedMarketArray = [...this.marketArray];
      return;
    }
    this.getCountries();
  }
  async getCluster(marketId){
    const data = await this.dataService.getClusterByMarket(marketId);
    if(!data["status"]) return; //possible show error
    const clusters = data['data'] as any;
    console.log('cluster' , clusters);
    if(clusters.length == 0 ) {
      this.getCountries();
      return;
    }
    this.clusterArray = this.transformArrayForDropdown(clusters , 'id' , 'value');
    console.log('clusters Array' , this.clusterArray);
  }
  async getSubCluster(clusterId){
    const data = await this.dataService.getSubClusterByCluster(clusterId);
    if(!data["status"]) return; //possible show error
    const array = data['data'] as any;
    console.log('sub cluster' , array);
    if(array.length == 0){
      this.getCountries();
      return;
    }
    this.subClusterArray = this.transformArrayForDropdown(array , 'id' , 'value');
    console.log('sub clusters Array' , this.clusterArray);
  }
  async getCountries(key = null , value = null){
    const data = await this.dataService.getCountries(key , value);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('countries Array' , array);
    this.countriesArray = this.transformArrayForDropdown(array , 'id' , 'value');
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
    this.citiesArray = this.transformArrayForDropdown(array , 'id' , 'value');
    console.log('cities Array' , this.citiesArray);
  }
  async getBranches(cityId){
    const data = await this.dataService.getBarnchByCity(cityId);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('branched Array' , array);
    this.branchesArray = this.transformArrayForDropdown(array , 'id' , 'value');
    console.log('branches Array' , this.branchesArray);
  }
  async getDepartments(branchId){
    const params = {
      'country_id'  : this.locationFilters.countryId,
      'line_manager_id' : this.appLocalStorage.getUserId()
    }
    const data = await this.dataService.getDepartment(params);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('departments Array' , array);
    this.departmentArray = this.transformArrayForDropdown(array , 'id' , 'department_name');
    console.log('departments Array' , this.departmentArray);
  }


}
