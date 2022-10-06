import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-shift-allocation',
  templateUrl: './shift-allocation.component.html',
  styleUrls: ['./shift-allocation.component.css']
})
export class ShiftAllocationComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  shiftAllocationForm=this.fb.group({
    shift_id:["",Validators.required],
    start_date:["",Validators.required],
    end_date:["",Validators.required],
    set_default:["",Validators.required]
  })

  uploadForm=this.fb.group({
    attachment:["",Validators.required]
  })


  submit(){
    console.warn(this.shiftAllocationForm.value)
  }


  get validateAForm(): any {
    return this.shiftAllocationForm.controls
  }

  get validateForm(): any {
    return this.uploadForm.controls
  }

  employees = [
    {
      id : 1 , 
      name : "Michael", 
      number : 2563
    } ,
    {
      id : 2 , 
      name : "Michael 1", 
      number : 25631
    },{
      id : 3 , 
      name : "Michael 3", 
      number : 25633
    }
    ,{
      id : 14 , 
      name : "Michael4", 
      number : 25634
    }
    ,{
      id : 15, 
      name : "Michael5", 
      number : 25635
    }
    ,{
      id : 16 , 
      name : "Michael6", 
      number : 25636
    },
    {
      id : 17 , 
      name : "Michael7", 
      number : 25637
    },
    {
      id : 18 , 
      name : "Michael8", 
      number : 25638
    },
    {
      id : 19 , 
      name : "Michael9", 
      number : 25639
    },
    {
      id : 110 , 
      name : "Michael10", 
      number : 256310
    },
    {
      id : 111 , 
      name : "Michael11", 
      number : 256311
    }
  ]



  
  secondEmployees = [
    {
      id : 1 , 
      name: "michael" , 
      number:58655
    },
    {
      id : 125 , 
      name: "michael25" , 
      number:5865525
    },
    {
      id : 156 , 
      name: "michael56" , 
      number:5865556
    },
    {
      id : 189 , 
      name: "michael89" , 
      number:5865589
    },
    {
      id : 152 , 
      name: "michael52" , 
      number:5865552
    },
    {
      id : 187 , 
      name: "michael87" , 
      number:5865587
    },
    {
      id : 122 , 
      name: "michael22" , 
      number:5865522
    }
  ]


  thirdEmployees = [
    {
      id : 1 , 
      name: "michael" , 
      number:58655
    },
    {
      id : 12555 , 
      name: "michael2555" , 
      number:586552555
    },
    {
      id : 15641 , 
      name: "michael5641" , 
      number:586555641
    },
    {
      id : 18945 , 
      name: "michael8945" , 
      number:586558945
    },
    {
      id : 15252 , 
      name: "michael5252" , 
      number:586555252
    },
    {
      id : 18700 , 
      name: "michael8700" , 
      number:586558700
    },
    {
      id : 12211 , 
      name: "michael2211" , 
      number:586552211
    }
  ]

  masterArray = [
    {
      array : this.secondEmployees
    } , 
    {
      array : this.thirdEmployees
    }
  ]


  drop(event){
    console.log(event.previousContainer.data);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if(event.previousContainer.data.length == 0){
        console.log('push a new item huh');
        event.previousContainer.data.push({
          empty : true
        })
      }
    }
  }





}
