
import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class LinkCheckerService {
  constructor() {}

  isLineManagerPortal(){
    const portal = localStorage.getItem('link');
    if(portal && portal == 'lmportal'){
        return true;
    }
    return false;
  }
}
