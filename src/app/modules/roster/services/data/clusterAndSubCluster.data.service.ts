import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { ClusterAndSubClusterService } from '../http/clusterAndSubcluster.service';
import { HttpEmployeeShift } from '../http/http.dropdown';

@Injectable({
  providedIn: 'root',
})
export class ClusterAndSubClusterDataService {
  constructor(
    private httpService : ClusterAndSubClusterService,
    private appLocalStorage: AppLocalStorageService
  ) {}

  getMarket() {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getMarket().subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }


  getClusterByMarket(marketId) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getClusterByMarket(marketId).subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }


  getSubClusterByCluster(clusterId) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getSubClusterByCluster(clusterId).subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }

  getCountries(keyName = null, value = null) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getCountries(keyName , value).subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }



  getStatesByCountry(countryId) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getStatesByCountry(countryId).subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }


  getCitiesByState(stateId) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getCitiesByState(stateId).subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }



  getBarnchByCity(cityId) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getBarnchByCity(cityId).subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }


  getDepartment() {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getDepartment().subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        resolve(response);
      }
    });
  }









  

  

}
