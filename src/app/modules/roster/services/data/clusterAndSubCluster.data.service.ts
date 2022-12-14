import { Injectable } from '@angular/core';
import { AppLocalStorageService } from '../../../../services/app-local-storage.service';
import { ClusterAndSubClusterService } from '../http/clusterAndSubcluster.service';
import { HttpEmployeeShift } from '../http/http.dropdown';
import { RosterToastService } from '../roster.toast.service';

@Injectable({
  providedIn: 'root',
})
export class ClusterAndSubClusterDataService {
  constructor(
    private httpService: ClusterAndSubClusterService,
    private appLocalStorage: AppLocalStorageService,
    private toastService: RosterToastService
  ) {}

  getMarket() {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getMarket().subscribe(
          (data) => {
            response.data = data;
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
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
            response.data = data;
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
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
            response.data = data;
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
        resolve(response);
      }
    });
  }

  getCountries(keyName = null, value = null) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getCountries(keyName, value).subscribe(
          (data) => {
            response.data = data;
            response.message = 'success';
            response.status = true;
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
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
            response.data = data;
            response.message = 'success';
            response.status = true;
            
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
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
            response.data = data;
            response.message = 'success';
            response.status = true;
            
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
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
            response.data = data;
            response.message = 'success';
            response.status = true;
            
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
        resolve(response);
      }
    });
  }

  getDepartment(bodyParams = null) {
    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      try {
        this.httpService.getDepartment(bodyParams).subscribe(
          (data) => {
            response.data = data['data'];
            response.message = 'success';
            response.status = true;
            if (
              data['payload'] &&
              !Array.isArray(data['payload']) &&
              typeof data['payload'] == 'string'
            ) {
              this.toastService.toast(data['payload'], 'success-toast');
            }
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
        resolve(response);
      }
    });
  }


  getRosterType() {


    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      const params = {
        "client_id" : this.appLocalStorage.getClientId()
      }
      try {
        this.httpService.getRosterType(params).subscribe(
          (data) => {
            response.data = data;
            response.message = 'success';
            response.status = true;
            
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
        resolve(response);
      }
    });
  }


  getReporting() {


    return new Promise((resolve, reject) => {
      const response = { data: null, status: false, message: null };
      const params = {
        "client_id" : this.appLocalStorage.getClientId()
      }
      try {
        this.httpService.getReporting(params).subscribe(
          (data) => {
            response.data = data;
            response.message = 'success';
            response.status = true;
            
            resolve(response);
            console.log(response);
          },
          (err) => {
            response.message = err;
            this.toastService.toast(err.error.error, 'error-toast');
            resolve(response);
          }
        );
      } catch (error) {
        response.message = error;
        this.toastService.toast(error, 'error-toast');
        resolve(response);
      }
    });
  }
}
