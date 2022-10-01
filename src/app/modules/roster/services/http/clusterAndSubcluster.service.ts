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
    const params = {
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.get(`${this.staticData}/getMarket`, { params });
  }
  getClusterByMarket(marketId){
    const params = {
        'client_id' : this.appLocalService.getClientId() , 
        'market_id' : marketId
    }
    return this.http.get(`${this.staticData}/getCluster`, { params });
  }

  getSubClusterByCluster(clusterId){
    const params = {
        'client_id' : this.appLocalService.getClientId() , 
        'cluster_id' : clusterId
    }
    return this.http.get(`${this.staticData}/getSubCluster`, { params });
  }

  getCountries(keyName = null , keyValue = null){
    const params = {
        'client_id' : this.appLocalService.getClientId() , 
    }
    if(keyName) params[keyName] = keyValue;

    return this.http.get(`${this.staticData}/getCountry`, { params });
  }

  getStatesByCountry(countryId){
    const params = {
        'country_id' : countryId , 
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.get(`${this.staticData}/getStatesByCountry` , {params});
  }

  getCitiesByState(stateId){
    const params = {
        'state_id' : stateId , 
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.get(`${this.staticData}/getCityByState` , {params});
  }

  getBarnchByCity(cityId) {
    const params = {
        'city_id' : cityId , 
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.get(`${this.staticData}/getBranch` , {params});
  }

  getDepartment(){
    const params = {
         
        'client_id' : this.appLocalService.getClientId()
    }
    return this.http.get(`${this.staticData}/getDepartment` , {params});
  }


}
