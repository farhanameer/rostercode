import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DisclaimerDialog } from '../../dialogs/disclaimer/disclaimer.dialog';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragAndDropComponent implements OnInit , OnChanges {

  @Input() shift : any;
  @Output() changed : EventEmitter<any> = new EventEmitter();
  length : Number = 0;
  constructor(private customModal: ModalService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changed occured' , this.shift.id);
  }
  currentLengthOf = 0;
  ngOnInit(): void {
  }

  noWeekEnds = []
  sunday = []
  monday = []
  tuesday = []
  wednesday = []
  thursday = []
  friday = []
  saturday = []

  

  masterArray = [
    {
      name : 'No Weekends',
      array : this.noWeekEnds
    } , 
    {
      name : 'Sunday',
      array : this.sunday
    }
    ,
    {
      name : 'Monday',
      array : this.monday
    },
    {
      name : 'Tuesday',
      array : this.tuesday
    },
    {
      name : 'Wednesday',
      array : this.wednesday
    },
    {
      name : 'Thursday',
      array : this.thursday
    },
    {
      name : 'Friday',
      array : this.friday
    },
    {
      name : 'Saturday',
      array : this.saturday
    }
  ]

  getEmployeesData(array , day){
    let employees = [];
    let days = [];
    day.forEach(d =>{
      days.push(d);
    })
    array.forEach(emp =>{
      employees.push({
        emp_id : emp.emp_id , 
        weekend_day_id : day
      })
    });
    return employees;
  }
  
  emitChange(){
    let employees = [];
    employees = [...employees , ...this.getEmployeesData(this.sunday , [0])]
    employees = [...employees , ...this.getEmployeesData(this.monday , [1])]
    employees = [...employees , ...this.getEmployeesData(this.tuesday , [2])]
    employees = [...employees , ...this.getEmployeesData(this.wednesday , [3])]
    employees = [...employees , ...this.getEmployeesData(this.thursday , [4])]
    employees = [...employees , ...this.getEmployeesData(this.friday , [5])]
    employees = [...employees , ...this.getEmployeesData(this.friday , [5])]
    employees = [...employees , ...this.getEmployeesData(this.noWeekEnds , [])]
    this.changed.emit({
      shift_id : this.shift.id , 
      shift_allocation_emp_list : employees
    });
    // console.log('no weekends',this.noWeekEnds);
    // if(this.noWeekEnds.length >= this.currentLengthOf && this.noWeekEnds.length!=0){
    //   this.customModal.showFeaturedDialog(DisclaimerDialog, "");
    //   this.currentLengthOf = this.noWeekEnds.length;
    // }
    // this.currentLengthOf = this.noWeekEnds.length;
  }



  acceptChange(event){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.emitChange();
  }
  drop(eventCustom){

    let event = eventCustom.event;
    if(eventCustom.dayName == 'No Weekends') {
      console.log('no weekends we got here');

      const ref = this.customModal.showFeaturedDialog(DisclaimerDialog, "");
      ref.closed.subscribe((event) =>{
        if(event){
          this.acceptChange(eventCustom.event);
        }
        
      });
      return;
    }
    console.log('data being',event.previousContainer.data);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.emitChange();
  }
}
