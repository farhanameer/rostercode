import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor() {}

  getMonth = null;
  getYear = null;
  getCurrentMonth = null;
  getCurrentYear = null;
  year_month = null;
  totalDaysInMonth = null;
  startOfMonth = null;
  endOfMonth = null;
  weekdaysShort = null;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  getNextDay(previousDay: string) {
    // debugger;
    let nextDay = '';
    this.weekDays.every((currentDay, i) => {
      // debugger;
      if (previousDay == currentDay) {
        if (i + 1 == this.weekDays.length) {
          nextDay = this.weekDays[0];
        } else {
          nextDay = this.weekDays[i + 1];
        }
        return false;
      }
      return true;
    });
    return nextDay;
  }

  getNumberOfDays(day: string, isEnding = false) {
    // debugger;
    let i = 0;
    this.weekDays.every((currentDay, index) => {
      //debugger;
      if (currentDay == day) {
        i = index;
        return false;
      }
      return true;
    });
    if (isEnding) {
      // debugger;
      return this.weekDays.length - (i + 1);
    }
    return i; //6
  }

  pushNullToArray(array: any, counter: number): any {
    // debugger;
    if (counter == 0) {
      return;
    }
    const obj = {
      date: null,
      day: null,
    };
    array.push(obj);
    if (counter == 1) {
      return;
    }
    return this.pushNullToArray(array, counter - 1);
  }
  getAllMonths(year: any, month: any, preset: any) {
    let monthAndDays = [];
    let calendarArray = [];
    for (let i = 0; i <= 11; i++) {
      calendarArray.push(this.getCalendar(year, this.months[i], preset));
      let objResult = {
        monthName: this.months[i],
        totalDaysInMonth: calendarArray[i],
      };
      monthAndDays.push(objResult);
    }
    return monthAndDays;
  }
  getCalendar(year: any, month: any, preset: any) {
    if (month == null) {
      let monthAndDays = ([] = this.getAllMonths(year, month, preset));
      return monthAndDays;
    }
    if (preset != null) {
      this.weekDays = preset;
    }

    this.year_month = year + '-' + month;

    this.totalDaysInMonth = moment(this.year_month, 'YYYY-MMM').daysInMonth();
    this.startOfMonth = moment(this.year_month, 'YYYY-MMM')
      .startOf('months')
      .format('ddd');
    this.endOfMonth = moment(this.year_month, 'YYYY-MMM')
      .endOf('months')
      .format('ddd');

    const calendarArray: any = [];

    let previousDay = '';
    this.pushNullToArray(
      calendarArray,
      this.getNumberOfDays(this.startOfMonth)
    );
    previousDay = this.startOfMonth;
    for (let i = 1; i <= this.totalDaysInMonth; i++) {
      if (i != 1) {
        previousDay = this.getNextDay(previousDay);
      }
      calendarArray.push({
        day: previousDay,
        date: i,
      });
    }
    this.pushNullToArray(
      calendarArray,
      this.getNumberOfDays(previousDay, true)
    );
    //console.log(calendarArray);
    return calendarArray;
  }
}
