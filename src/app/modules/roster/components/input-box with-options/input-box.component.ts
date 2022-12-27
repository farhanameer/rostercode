import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchService } from '../../services/data/searchService.service';

@Component({
  selector: 'app-input-box-with-options',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxWithOptionsComponent implements OnInit , OnChanges {
  @Input() isdisabled: boolean;
  @Input() form: FormGroup;
  @Input() control: string;
  @Input() label: string;
  @Input() width: string;
  @Input() type: string;
  @Input() height : string;
  @Input() hideLabel : Boolean = false;
  @Input() placeHolder : string = ' '
  @Output() inputChanged : EventEmitter<any> = new EventEmitter();
  @Input() color:string;
  @Input() textColor : any;
  @Input() optionsArray : any;
  masterArray : any = [];

  searchedArray : any = [];
  constructor(private searchService : SearchService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(Array.isArray(this.optionsArray)){
      this.masterArray = [...this.optionsArray];
    }
  }

  ngOnInit(): void {
    console.log('disabled value ' , this.isdisabled);
  }
  inputChange(event){
    this.inputChanged.emit(event.target.value);
    this.search(event.target.value);

  }
  search(value){
    if(Array.isArray(this.optionsArray)){
      
      if(value.length >=3){
        const res = this.searchService.search(this.masterArray , value , 'name');
        this.searchedArray = res['searchedArray'];
      }else{
        this.searchedArray = [];
      }
    }
    
  }


  optionChanged(option){
    if(this.form && this.control){
      this.form.get(this.control).setValue(option.name);
    }
    this.searchedArray = [];
  }
}
