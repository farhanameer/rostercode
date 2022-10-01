import {
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

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectBoxComponent implements OnInit {
  selectedValue: string = '';
  isClicked: boolean = false;
  @ViewChild('dropdownList') dropdownList:ElementRef; 
  x;
  i;
  j;
  l;
  ll;
  selElmnt;
  a;
  b;
  c;

  @Input() form: FormGroup;
  @Input() data: Array<any> = [];
  @Input() label: string;
  @Input() control: string;
  @Input() disabled: boolean;
  @Input() isLoaded: boolean;
  @Input() width : string;
  @Input() height : string;
  

  @Output() onResetDropDown = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() onClick = new EventEmitter();

  @ViewChild('selectWrapper') selectWrapper: any;

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

    // this.form.get(this.control).setValue(option.id);

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

  //@HostListener('document:click')
  // clickout() {
  //   // if (!this.wasInside) {
  //   //   console.log('clicked outside');
  //   // }
  //   // this.wasInside = false;
  //   console.log('click outside');
  // }
  ngOnInit(): void {
      console.log('dsabled value' , this.disabled);
    // this.form.get(this.control).setValue(-1);
  }

  ngOnChanges(change: SimpleChange) {
    console.log(this.form);
  }

  ngAfterViewInit(): void {
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

  initSelect() {
    /*look for any elements with the class "select-wrapper":*/
    this.x = document.getElementsByClassName('select-wrapper');
    this.l = this.x.length;
    for (this.i = 0; this.i < this.l; this.i++) {
      this.selElmnt = this.x[this.i].getElementsByTagName('select')[0];
      this.ll = this.selElmnt.length;
      /*for each element, create a new DIV that will act as the selected item:*/
      this.a = document.createElement('DIV');
      this.a.setAttribute('class', 'select-selected');
      this.a.innerHTML =
        this.selElmnt.options[this.selElmnt.selectedIndex].innerHTML;
      this.x[this.i].appendChild(this.a);
      /*for each element, create a new DIV that will contain the option list:*/
      this.b = document.createElement('DIV');
      this.b.setAttribute('class', 'select-items select-hide');
      for (this.j = 1; this.j < this.ll; this.j++) {
        /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
        this.c = document.createElement('DIV');
        this.c.innerHTML = this.selElmnt.options[this.j].innerHTML;
        this.c.addEventListener('click', function (e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName('select')[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName('same-as-selected');
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute('class');
              }
              this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
          h.click();
        });
        this.b.appendChild(this.c);
      }
      this.x[this.i].appendChild(this.b);
      // let that = this;
      // that.a.addEventListener('click', function (e) {
      //   /*when the select box is clicked, close any other select boxes,
      //   and open/close the current select box:*/
      //   that.closeAllSelect(that);
      //   e.stopPropagation();
      //   that['nextSibling'].classList.toggle('select-hide');
      //   that['classList'].toggle('select-arrow-active');
      // });
    }
  }
  closeAllSelect() {
    const div = document.getElementById('custom-select');
    console.log(div);
    div.classList.add('select-hide');

    // /*a function that will close all select boxes in the document,
    // except the current select box:*/
    // let x,
    //   y,
    //   i,
    //   xl,
    //   yl,
    //   arrNo = [];
    // x = document.getElementsByClassName('select-items');
    // y = document.getElementsByClassName('select-selected');
    // xl = x.length;
    // yl = y.length;
    // for (i = 0; i < yl; i++) {
    //   if (elmnt == y[i]) {
    //     arrNo.push(i);
    //   } else {
    //     y[i].classList.remove('select-arrow-active');
    //   }
    // }
    // for (i = 0; i < xl; i++) {
    //   if (arrNo.indexOf(i)) {
    //     x[i].classList.add('select-hide');
    //   }
    // }
  }
}
