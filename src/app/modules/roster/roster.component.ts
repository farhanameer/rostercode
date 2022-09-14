import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-roster-main',
  templateUrl: './roster.component.html'
})
export class RosterComponent2 {
  title = 'roster';

  constructor(private http: HttpClient) {
    const url = 'http://sandbox.peopleitest.com:3085/api2/3.0/WorkCalendar/ReportingType';
    for(let i = 1; i <= 1000; i++)
      http.get(url, {
        params: {id: i.toString()}
      }).subscribe((res) => {
        if(res['payload'].length > 0)
          console.log(res['payload']);
        else {
          console.log('nothing');
        }
          
      })
  }
}
