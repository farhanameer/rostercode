import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private cache = new Map<string, string>();
  loadersUrl : string[] = 
  ['getPersonalFileSetup' , 'personalFileSetupDetails' , 
  'updateCategoryFieldsConfiguration' , 'addFields' , 'building' , 
  'floor' , 'box' , 'cabinet' , 'drawer' , 'flap' , 'Document' , 'upload'];

  escapLoaderUrls : string[] = ['getFilteredLocationForDocument']
  
  constructor() {
    
   }
  



  showLoader(url : string , showForceFully = false) {

    if(showForceFully) {
      $('.showLoader').show();
      return;
    }
    let show = false;
    let foundInEscapUrl = false;
    this.escapLoaderUrls.every(uri =>{
      if(url.includes(uri)){
        foundInEscapUrl = true;
        return false;
      }
      return true;
    });
    this.loadersUrl.every(uri =>{
      if(url.includes(uri)) {
        show = true;
        return false;
      }
      return true;
    })
    if(show && !foundInEscapUrl) {
      $('.showLoader').show();  
    }
  }

  hideLoader() {
    $('.showLoader').hide();
  }
}
