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
  optionSelected(option){
    console.log(option);
    this.isClicked =!this.isClicked;
    this.selectedValue = option.name;
    this.hash = {};
    this.hash[option.id] = true;
    this.toggleView();

    this.selectionChange.next({
      value : option.id , 
      controlName : this.name
    });

    this.form.get(this.control).setValue(option.id);

  }
  private wasInside = false;

  //@HostListener('click')
  clickInside() {
    console.log('clicked inside');
    this.wasInside = true;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent) {
    var paths = event['path'] as Array<any>;

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
      this.form?.get(this.control).markAsTouched();
    }
  }

  toggleDropdown(){
    if(this.disabled) return;
    this.isClicked =!this.isClicked;
    this.toggleView(this.isClicked);

  }


  toggleView(show = false){

    

    
    const div = this.dropdownList.nativeElement;

    if(show){
      div.classList.remove('select-hide');
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
    if(this.data.length == 0){
      this.selectedValue = '';
      this.hash = {};
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
