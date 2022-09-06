import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppLocalStorageService {
  getClientId() {
    return localStorage.getItem('client_id');
  }
  getUserId() {
    return localStorage.getItem('e_number');
  }
}
