import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'skeleton-loader',
  templateUrl: './dropdown-skeleton-loader.component.html',
  styleUrls: ['./dropdown-skeleton-loader.component.scss']
})
export class DropdownSkeletonLoaderComponent implements OnInit, OnChanges {

  @Input() count: number;
  fakeArray: Array<any>
  constructor() {}
  
  ngOnInit(): void {}
  
  ngOnChanges(changes: SimpleChanges): void {
    
    if(!this.count) this.count = 1;
    this.fakeArray = new Array<any>(this.count);
  }
}
