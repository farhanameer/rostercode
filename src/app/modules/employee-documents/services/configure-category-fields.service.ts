
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: "root",
})
export class ConfigureCategoryFieldsService {

  categoryFieldHash={};
  updateConfigurationHash = {};
  deleteConfigurationHash = {};

  fieldsConfiguration=[];
  updatedConfiguration = [];
  deltedConfiguration = [];



  

  counter=0;
  upCounter = 0;
  deleteCounter = 0;

  constructor() {
    
  }
  configureCategoryField(confId,fieldId,key,value,categoryId , isUpdating = false){
      if(isUpdating) {
        
        if(!confId){
          console.log(fieldId,key,value,categoryId);
          this.addNewConfiguration(fieldId,key,value,categoryId);
          return;
        }  

        if(!this.updateConfigurationHash[fieldId]){

          console.log(confId,fieldId,key,value,categoryId);

          console.log(this.updateConfigurationHash[fieldId]);

          const updateConfig = {documentCategoryFieldId : fieldId , id : confId};
          updateConfig[key] = value;
          this.updatedConfiguration.push(updateConfig);
          this.upCounter = this.upCounter + 1;
          this.updateConfigurationHash[fieldId] = this.upCounter;
          return;
        }
        const prevUpdateConf = this.updatedConfiguration[this.updateConfigurationHash[fieldId] - 1];

        prevUpdateConf[key]  = value;

        this.updatedConfiguration[this.updateConfigurationHash[fieldId] - 1] = prevUpdateConf;
        return;
      }
      // if(!this.categoryFieldHash[fieldId]){
      //     const singleConfiguration = {documentCategoryFieldId:fieldId , categoryId:categoryId};
      //     singleConfiguration[key] = value;
      //     this.counter = this.counter + 1;
      //     this.fieldsConfiguration.push(singleConfiguration);
      //     this.categoryFieldHash[fieldId] = this.counter;
      //     return;
      // }
      // const prevConfiguration = this.fieldsConfiguration[this.categoryFieldHash[fieldId] - 1];
      // prevConfiguration[key] = value;
      // this.fieldsConfiguration[this.categoryFieldHash[fieldId] - 1] = prevConfiguration;

      this.addNewConfiguration(fieldId,key,value,categoryId);
  }
  addNewConfiguration(fieldId,key,value,categoryId , isUpdating = false){

    if(!this.categoryFieldHash[fieldId]){
      const singleConfiguration = {documentCategoryFieldId:fieldId , categoryId:categoryId};
      singleConfiguration[key] = value;
      this.counter = this.counter + 1;
      this.fieldsConfiguration.push(singleConfiguration);
      this.categoryFieldHash[fieldId] = this.counter;
      // if(this.deleteConfigurationHash[fieldId]) {
      //   if(this.deleteConfigurationHash[fieldId].confId !=-1){
      //     let array = [];
      //     this.deltedConfiguration.forEach(confId =>{
      //       if(confId != this.deleteConfigurationHash[fieldId].confId){
      //         array.push(confId);
      //       }
      //     })
      //     this.deltedConfiguration = array;
      //   }
      // }
      // console.log('deleted configuration hash map',this.deleteConfigurationHash);

      return;
  }
  const prevConfiguration = this.fieldsConfiguration[this.categoryFieldHash[fieldId] - 1];
  prevConfiguration[key] = value;
  this.fieldsConfiguration[this.categoryFieldHash[fieldId] - 1] = prevConfiguration;
  // delete this.deleteConfigurationHash[fieldId];
  // console.log('deleted configuration hash map',this.deleteConfigurationHash);
  // if(this.deleteConfigurationHash[fieldId]) {
  //   if(this.deleteConfigurationHash[fieldId].confId !=-1){
  //     let array = [];
  //     this.deltedConfiguration.forEach(confId =>{
  //       if(confId != this.deleteConfigurationHash[fieldId].confId){
  //         array.push(confId);
  //       }
  //     })
  //     this.deltedConfiguration = array;
  //   }
  // }


  }
  deleteConfiguration(confId , fieldId){
    if(confId !=null){
      this.deltedConfiguration.push(confId);
    }
    this.deleteConfigurationHash[fieldId] = {
      id : 1,
      confId : confId || -1
    };

    // console.log('deleted configuration hash map',this.deleteConfigurationHash);
  }

  getFieldConfiguration(){
      const configuration = [];
      this.fieldsConfiguration.forEach(conf =>{
        console.log(conf);
        
        if(!this.deleteConfigurationHash[conf.documentCategoryFieldId] && !this.updateConfigurationHash[conf.documentCategoryFieldId]){
          configuration.push(conf);
        }
      });
      return configuration;
  }

  

  getDeleteConfiguration(){
    return this.deltedConfiguration
  }

  getUpdatedConfiguration(){
    const configuration = [];
    this.updatedConfiguration.forEach(conf =>{
      if(!this.deleteConfigurationHash[conf.documentCategoryFieldId]){
        configuration.push(conf);
      }
    });
    return configuration;
  }

  reset(){
  this.categoryFieldHash={};
  this.updateConfigurationHash = {};
  this.deleteConfigurationHash = {};

  this.fieldsConfiguration=[];
  this.updatedConfiguration = [];
  this.deltedConfiguration = [];



  

  this.counter=0;
  this.upCounter = 0;
  this.deleteCounter = 0;
  }
}


