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
    this.populateFilterValues();
    // setTimeout(() => {
    //   this.populateFilterValues();
    // }, 200);
    console.log('getting default values for filters' , this.defaultValues);

    this.defaultFiltersValues = {
      marketId : {} , 
      clusterId : {} , 
      subClusterId : {},
      countryId : {} , 
      stateId : {} , 
      cityId : {},
      branchId : {},
      departmentId : {}
    }
  }


  async populateFilterValues(){
    
    if(this.defaultValues && Object.entries(this.defaultValues).length !=0){
      await this.search(this.marketArray , this.defaultValues.glob_mkt_id , 'marketId' , this.getMarket , null,this);
      await this.search(this.clusterArray , this.defaultValues.region_id , 'clusterId' , this.getCluster, this.defaultValues.glob_mkt_id,this);
      await this.search(this.subClusterArray , this.defaultValues.sub_region_id , 'subClusterId' , this.getSubCluster, this.defaultValues.region_id ,this);
     
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
        await this.getCountries(null,null,this);
      }
      await this.search(this.countriesArray , this.defaultValues.country_id , 'countryId' , this.getCountries, null , this);
      await this.search(this.statesArray , this.defaultValues.state_id , 'stateId' , this.getStates, this.defaultValues.country_id,this);
      await this.search(this.citiesArray , this.defaultValues.city_id , 'cityId' , this.getCities, this.defaultValues.state_id,this);
      await this.search(this.branchesArray , this.defaultValues.branch_id , 'branchId' , this.getBranches, this.defaultValues.city_id,this);
      await this.search(this.departmentArray , this.defaultValues.department_id , 'departmentId' , this.getDepartments, this.defaultValues.branch_id,this);

      console.log('default filter values',this.defaultFiltersValues);
    }
    else{
      console.log('problems')
    }
  }
  async search(array , value , key , apiFunction : any , apiFunctionParams = null , defaultThis){
    if(value == -1 && apiFunctionParams == -1){
      return;
    }
    if(array.length == 0){
      if(apiFunctionParams){
        array = await apiFunction(apiFunctionParams , defaultThis);
      }else{
        array = await apiFunction(defaultThis);
      }
    }else{
      array.forEach(item =>{
        console.log('everyLoop' , item);
        if(item.id == value){
          defaultThis.defaultFiltersValues[key]=item;
        }
      })
    }
    
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

  async getMarket(defaultThis = this){
    const data = await defaultThis.dataService.getMarket();
    
    if(!data["status"]) return; //possible show error
    const markets = data['data'];

    
    if(markets.length != 0) {
      
      defaultThis.marketArray = defaultThis.transformArrayForDropdown(markets , 'id' , 'value');
      defaultThis.copiedMarketArray = [...defaultThis.marketArray];
      if(defaultThis.defaultValues && defaultThis.defaultValues['glob_mkt_id']){
        defaultThis.marketArray.forEach(item =>{
          console.log('everyLoop' , item);
          if(item.id == defaultThis.defaultValues['glob_mkt_id']){
            defaultThis.defaultFiltersValues['marketId']=item;
          }
        })
      }
      return;
    }
    this.getCountries(null,null,defaultThis);
  }
  async getCluster(marketId , defaultThis = this){
    const data = await defaultThis.dataService.getClusterByMarket(marketId);
    if(!data["status"]) return; //possible show error
    const clusters = data['data'] as any;
    console.log('cluster' , clusters);
    if(clusters.length == 0 ) {
      defaultThis.getCountries(null,null,defaultThis);
      return;
    }
    defaultThis.clusterArray = defaultThis.transformArrayForDropdown(clusters , 'id' , 'value');
    console.log('clusters Array' , defaultThis.clusterArray);
    if(defaultThis.defaultValues && defaultThis.defaultValues['region_id']){
      defaultThis.clusterArray.forEach(item =>{
        console.log('everyLoop' , item);
        if(item.id == defaultThis.defaultValues['region_id']){
          defaultThis.defaultFiltersValues['clusterId']=item;
        }
      })
    }
  }
  async getSubCluster(clusterId , defaultThis=this){
    const data = await defaultThis.dataService.getSubClusterByCluster(clusterId);
    if(!data["status"]) return; //possible show error
    const array = data['data'] as any;
    console.log('sub cluster' , array);
    if(array.length == 0){
      defaultThis.getCountries(null,null,defaultThis);
      return;
    }
    defaultThis.subClusterArray = defaultThis.transformArrayForDropdown(array , 'id' , 'value');
    console.log('sub clusters Array' , defaultThis.clusterArray);

    if(defaultThis.defaultValues && defaultThis.defaultValues['sub_region_id']){
      defaultThis.subClusterArray.forEach(item =>{
        console.log('everyLoop' , item);
        if(item.id == defaultThis.defaultValues['sub_region_id']){
          defaultThis.defaultFiltersValues['subClusterId']=item;
        }
      })
    }


  }
  async getCountries(key = null , value = null,defaultThis=this){
    const data = await defaultThis.dataService.getCountries(key , value);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('countries Array' , array);
    defaultThis.countriesArray = defaultThis.transformArrayForDropdown(array , 'id' , 'value');
    console.log('countries Array' , defaultThis.countriesArray);

    if(defaultThis.defaultValues && defaultThis.defaultValues['country_id']){
      defaultThis.countriesArray.forEach(item =>{
        console.log('everyLoop' , item);
        if(item.id == defaultThis.defaultValues['country_id']){
          defaultThis.defaultFiltersValues['countryId']=item;
        }
      })
    }


  }
  async getStates(countryId , defaultThis = this){
    const data = await defaultThis.dataService.getStatesByCountry(countryId);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('states Array' , array);
    defaultThis.statesArray = defaultThis.transformArrayForDropdown(array , 'id' , 'value');
    console.log('states Array' , defaultThis.statesArray);

    if(defaultThis.defaultValues && defaultThis.defaultValues['state_id']){
      defaultThis.statesArray.forEach(item =>{
        console.log('everyLoop' , item);
        if(item.id == defaultThis.defaultValues['state_id']){
          defaultThis.defaultFiltersValues['stateId']=item;
        }
      })
    }

  }
  async getCities(stateId,defaultThis=this){
    
    const data = await defaultThis.dataService.getCitiesByState(stateId);
    
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('cities Array' , array);
    defaultThis.citiesArray = defaultThis.transformArrayForDropdown(array , 'id' , 'value');
    console.log('cities Array' , defaultThis.citiesArray);

    if(defaultThis.defaultValues && defaultThis.defaultValues['city_id']){
      defaultThis.citiesArray.forEach(item =>{
        console.log('everyLoop' , item);
        if(item.id == defaultThis.defaultValues['city_id']){
          defaultThis.defaultFiltersValues['cityId']=item;
        }
      })
    }


  }
  async getBranches(cityId,defaultThis=this){
    const data = await defaultThis.dataService.getBarnchByCity(cityId);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('branched Array' , array);
    defaultThis.branchesArray = defaultThis.transformArrayForDropdown(array , 'id' , 'value');
    console.log('branches Array' , defaultThis.branchesArray);

    if(defaultThis.defaultValues && defaultThis.defaultValues['branch_id']){
      defaultThis.branchesArray.forEach(item =>{
        console.log('everyLoop' , item);
        if(item.id == defaultThis.defaultValues['branch_id']){
          defaultThis.defaultFiltersValues['branchId']=item;
        }
      })
    }



  }
  async getDepartments(branchId,defaultThis=this){
    const params = {
      'country_id'  : defaultThis.locationFilters.countryId,
      'line_manager_id' : defaultThis.appLocalStorage.getUserId()
    }
    if(defaultThis.defaultValues && defaultThis.defaultValues['country_id'] && defaultThis.defaultValues['country_id'] !=null){
      params.country_id = defaultThis.defaultValues['country_id'];
    }
    const data = await defaultThis.dataService.getDepartment(params);
    if(!data["status"]) return; //possible show error
    const array = data["data"];
    console.log('departments Array' , array);
    defaultThis.departmentArray = defaultThis.transformArrayForDropdown(array , 'id' , 'department_name');
    console.log('departments Array' , defaultThis.departmentArray);


    if(defaultThis.defaultValues && defaultThis.defaultValues['department_id']){
      defaultThis.departmentArray.forEach(item =>{
        
        if(item.id == defaultThis.defaultValues['department_id']){
          defaultThis.defaultFiltersValues['departmentId']=item;
        }
      })
    }



  }


}
