import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppLocalStorageService } from 'src/app/services/app-local-storage.service';
import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClusterAndSubClusterService {
    staticData: string = '';
  constructor(private http: HttpClient , private appLocalService : AppLocalStorageService) {
    this.staticData = APIs['staticData'];
  }

  getMarket() {
    const body = {
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.post(`${this.staticData}/getMarketList`, { body });
  }
  getClusterByMarket(marketId){
    const body = {
        'client_id' : this.appLocalService.getClientId() , 
        'market_id' : marketId
    }
    return this.http.post(`${this.staticData}/clustersListByMarket`, { body });
  }

  getSubClusterByCluster(clusterId){
    const body = {
        'client_id' : this.appLocalService.getClientId() , 
        'cluster_id' : clusterId
    }
    return this.http.post(`${this.staticData}/subClustersListByCluster`, { body });
  }

  getCountries(keyName = null , keyValue = null){
    const body = {
        'client_id' : this.appLocalService.getClientId() , 
    }
    let array = [];
    if(keyName) {
      array.push(keyValue)
      body['id'] = array;
    };

    return this.http.post(`${this.staticData}/countriesListBySubCluster`, body);
  }

  getStatesByCountry(countryId){
    const body = {
        'id' : [countryId] , 
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.post(`${this.staticData}/statesListByCountry` , body);
  }

  getCitiesByState(stateId){
    const body = {
        'id' : [stateId] , 
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.post(`${this.staticData}/citiesListByState` , body);
  }

  getBarnchByCity(cityId) {
    const body = {
        'city_id' : [cityId] , 
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.post(`${this.staticData}/branchesListByCity` , body);
  }

  getDepartment(bodyParams = null){
    let params = {
         
        'client_id' : this.appLocalService.getClientId()
    }
    if(bodyParams){
      params = {...params , ...bodyParams}
    }
    return this.http.get(`${this.staticData}/getDepartment` , {params});
  }

  getRosterType(params){
    
    return this.http.get(`${this.staticData}/roster-type` , {params});
  }


  getReporting(params){
    
    return this.http.get(`${this.staticData}/reporting` , {params});
  }




}
