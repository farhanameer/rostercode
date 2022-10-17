import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { updateFor } from 'typescript';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectBoxComponent implements OnInit , AfterViewInit {
  selectedValue: string = '';
  isClicked: boolean = false;
  @ViewChild('dropdownList') dropdownList:ElementRef;
  @ViewChild('wrapperSelect') wrapperSelect : ElementRef; 
  

  @Input() form: FormGroup;
  @Input() data: Array<any> = [];
  @Input() label: string;
  @Input() control: string;
  @Input() disabled: boolean;
  @Input() isLoaded: boolean;
  @Input() width : string;
  @Input() height : string;
  @Input() name : string;
  @Input() hideLabel : Boolean;
  @Input() customClass : any;
  @Input() defaultValue : any;
  @Input() multiSelect : boolean = false;
 

  

  @Output() onResetDropDown = new EventEmitter();
  @Output() selectionChange : EventEmitter<any>  = new EventEmitter();
  @Output() onClick = new EventEmitter();

  @ViewChild('selectWrapper') selectWrapper: any;
  @ViewChild('mainContainer') mainContainer: ElementRef;
  


  locData = {};
  searchedFilter: string = '';

  constructor() {}


  
  sampleData = [
    {
      id : 1 , 
      name : 'Audi'
    },
    {
      id : 2 , 
      name : 'BMW'
    } , 
    {
      id : 3 , 
      name : 'Nisan'
    } , 
    {
      id : 4 , 
      name : 'Toyota'
    }
  ];

  hash = {};
  previousSelectionArray = [];
  removeIfAlreadySelected(item){
    let found = false;
    const newArray = [];
    let hashMap = {};
    this.previousSelectionArray.forEach(it =>{
      if(item.id == it){
        found = true;
      }
      if(item.id != it){
        newArray.push(it);
        hashMap[it] = true;
       
      }
    });
    
    return {selectionArray : newArray , found : found , map:hashMap};
  }
  optionSelected(option){
    console.log(option);
    this.hash = {};
    this.isClicked =!this.isClicked;
    
    if(!this.multiSelect) {
      this.hash = {};
    }
    const {selectionArray , found , map} = this.removeIfAlreadySelected(option);
    if(this.multiSelect) {
      
      this.previousSelectionArray = selectionArray;
      this.hash=map;
    }
    if(!found && this.multiSelect) {
      this.hash[option.id] = true;
      this.previousSelectionArray.push(option.id);
    }else if(!this.multiSelect){
      this.hash[option.id] = true;
    }
    

    this.toggleView();
    this.selectionChange.next({
      value : option.id , 
      controlName : this.name,
      multiSelect : this.multiSelect , 
      multiSelectValues : this.previousSelectionArray
    
    });
    

    if(this.multiSelect && this.previousSelectionArray.length !=0 && this.previousSelectionArray.length != this.data.length) {
      this.selectedValue = `${this.previousSelectionArray.length} Selected`;
    } else if(this.multiSelect && this.previousSelectionArray.length == this.data.length){
      this.selectedValue = 'All Selected'
    }else{
      this.selectedValue = ''
    }
    if(!this.multiSelect){
      this.selectedValue = option.name;
    }
    


    if(this.form && this.control && !this.multiSelect) {
      this.form.get(this.control).setValue(option.id);
    }

    if(this.form && this.control && this.multiSelect) {
      this.form.get(this.control).setValue(this.previousSelectionArray);
    }

  }
  private wasInside = false;

  //@HostListener('click')
  clickInside() {
    console.log('clicked inside');
    this.wasInside = true;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent) {


    // console.log('event paths' , event);
    // console.log('composed path',event.composedPath());
    // console.log('event paths' , event['path']);


    var paths = event.composedPath() as any;

    // if(event.composedPath())

    var inComponent = false;
    paths.forEach((path) => {
      if (path.tagName != undefined) {
        var tagName = path.tagName.toString().toLowerCase();
        if (tagName == 'app-select-box') inComponent = true;
      }
    });

    if (inComponent) {
      console.log('clicked inside');
      
    } else {
      console.log('clicked outside');
      if(this.disabled) return;
      this.isClicked = false;
      this.toggleView();
      if(this.checkIfTouched()){
        this.form?.get(this.control).markAsTouched();
      }
    }
  }

  toggleDropdown(){
    if(this.disabled) return;
    this.isClicked =!this.isClicked;
    this.toggleView(this.isClicked);

  }

  checkIfTouched(){
    const div = this.dropdownList.nativeElement;
    let foundClass = false;
    div.classList.forEach(cls =>{
      if(cls == 'touched'){
        foundClass = true;
      }
    })
    return foundClass;
  }
  toggleView(show = false){

    const div = this.dropdownList.nativeElement;

    
    if(show){
      div.classList.remove('select-hide');
      div.classList.add('touched');
      return;
    }
    div.classList.add('select-hide');
     
  }

 
  ngOnInit(): void {
      console.log('dsabled value' , this.disabled);
      console.log('container' , this.customClass);
    // this.form.get(this.control).setValue(-1);
  }

  ngOnChanges(change: SimpleChange) {
    if(this.data && this.data.length == 0){
      this.selectedValue = '';
      this.hash = {};
    } 

    if(this.defaultValue && this.defaultValue.id && this.defaultValue.name && this.data){
      this.data.forEach(value =>{
        if(value.id == this.defaultValue.id){
          this.hash[this.defaultValue.id] = this.defaultValue.id;
          this.selectedValue = this.defaultValue.name;
          if(this.form && this.control) {
            this.form.get(this.control).setValue(this.defaultValue.id);
          }
        }
      })
    }
  }

  ngAfterViewInit(): void {
    if(this.customClass) {
      const container = this.mainContainer.nativeElement;
      if(!Array.isArray(this.customClass)){
        container.classList.add(this.customClass);
        return;
      }
      this.customClass.forEach(customClass =>{
        container.classList.add(customClass);
      })
    }
    
    // this.initSelect()
  }

  get validation() {
    return this.form?.controls;
  }
  onRestrictSpace(event) {
    this.searchedFilter = this.locData['name'];
    this.getSelectData();
  }
  getSelectData() {
    console.log('getSelectData');
    this.onResetDropDown.emit();
    this.selectionChange.emit();
  }

  onClickSelect() {
    this.onClick.emit();
  }

  clicked() {
    console.log('clicking');
    this.isClicked = true;
  }
}
