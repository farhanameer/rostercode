import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { CalendarService } from '../../services/calander.service';
import { EmployeeShiftDataService } from '../../services/data/dropdown.data';
import { EmployeeRosterDataService } from '../../services/data/employeeAttendance.data';

@Component({
  selector: 'app-attendence-calender',
  templateUrl: './attendence-calender.component.html',
  styleUrls: ['./attendence-calender.component.css'],
})
export class AttendenceCalenderComponent implements OnInit {
  constructor(
    private calender: CalendarService,
    private dataService: EmployeeRosterDataService,
    private dataShiftService: EmployeeShiftDataService
  ) {}
  // weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weekDaysShortWord: any;

  years = new Array(3);
  months = new Array(5);
  currentDate: any;
  month: string = '';
  year: string = '';
  year_month: string = '';
  daysList: [] = [];
  employeeAttendance = [];
  cplCount: any;
  mmm = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  ngOnInit(): void {
    this.currentDate = moment();
    this.month = moment(this.currentDate).format('MMM');
    this.year = moment(this.currentDate).format('YYYY');
    this.getMonthAndYear(false, true);

    // this.daysList = this.calender.getCalendar(
    //   this.year,
    //   this.month,
    //   this.weekDays
    // );
    // console.log(this.daysList);
    // this.daysList.forEach((e, i) => {
    //   (e['color'] as any) = '';
    //   this.employeeAttendance.forEach((el) => {
    //     if (el.date == e['date']) {
    //       (e['color'] as any) = el['color'];
    //     }
    //   });
    // });
    // console.log(this.daysList);

    // hard code dates set!
    // this.daysList.forEach((e, i) => {
    //   (e['color'] as any) = '';
    //   if (e['date'] == 5 || e['date'] == 20 || e['date'] == 25) {
    //     (e['colorStr'] as any) = '#FEC932';
    //   }
    // });
    // console.log(this.daysList);

    this.weekDaysShortWord = this.weekDays.map((x) => x[0]);

    // this.years[0] = moment(this.currentDate).subtract(1, 'year').format('YYYY');
    // this.years[1] = moment(this.currentDate).format('YYYY');
    // this.years[2] = moment(this.currentDate).add(1, 'year').format('YYYY');

    // this.months[0] = moment(this.currentDate)
    //   .subtract(2, 'month')
    //   .format('MMMM YYYY');
    // this.months[1] = moment(this.currentDate)
    //   .subtract(1, 'month')
    //   .format('MMMM YYYY');
    // this.months[2] = moment(this.currentDate).format('MMMM YYYY');
    // this.months[3] = moment(this.currentDate)
    //   .add(1, 'month')
    //   .format('MMMM YYYY');
    // this.months[4] = moment(this.currentDate)
    //   .add(2, 'month')
    //   .format('MMMM YYYY');
    // console.log(this.years);
    // console.log(this.months);
    // const monthIndex = this.mmm[this.month];
    // this.year_month = `${this.year}-${monthIndex}`;
    // this.getEmpRoster();
  }

  async getEmpRoster() {
    const result = await this.dataService.getEmployeeRoster({
      year_month: this.year_month,
    });
    console.log(result);
    this.employeeAttendance = result['data']['payload']['data'];
    // console.log(this.employeeAttendance);
    this.cplCount = result['data']['payload'].cplCount;
  }

  getAllMonths(isForwardingYear = false) {
    if (isForwardingYear) {
      this.currentDate = moment(this.currentDate).add(1, 'year');
      for (let i = 0; i < 3; i++) {
        if (i == 2) {
          this.years[i] = moment(this.currentDate)
            .add(1, 'year')
            .format('YYYY');
          continue;
        }
        this.years[i] = this.years[i + 1];
      }
      console.log(this.years);
    } else {
      this.currentDate = moment(this.currentDate).subtract(1, 'year');
      for (let i = 2; i >= 0; i--) {
        if (i == 0) {
          this.years[i] = moment(this.currentDate)
            .subtract(1, 'year')
            .format('YYYY');
          continue;
        }
        this.years[i] = this.years[i - 1];
      }
      console.log(this.years);
    }
    this.calender.getCalendar(
      moment(this.currentDate).format('YYYY'),
      null,
      this.weekDays
    );
  }

  async getMonthAndYear(isForwarding = false, firstTime = false) {
    if (isForwarding) {
      this.currentDate = moment(this.currentDate).add(1, 'month');
    } else if (!firstTime) {
      this.currentDate = moment(this.currentDate).subtract(1, 'month');
    }
    this.month = moment(this.currentDate).format('MMM');
    this.year = moment(this.currentDate).format('YYYY');
    console.log(this.year, this.month);

    this.daysList = this.calender.getCalendar(
      moment(this.currentDate).format('YYYY'),
      moment(this.currentDate).format('MMM'),
      this.weekDays
    );

    const monthIndex = this.mmm[moment(this.currentDate).format('MMM')];
    this.year_month = `${moment(this.currentDate).format(
      'YYYY'
    )}-${monthIndex}`;
    // console.log(this.year_month);

    await this.getEmpRoster();

    let counter = 1;
    this.daysList.forEach((e, i) => {
      let date = `${this.year}-${monthIndex}-${e['date']}`;

      if (counter < 10 && e['date']) {
        date = `${this.year}-${monthIndex}-0${e['date']}`;
        counter++;
      }
      (e['color'] as any) = '';
      this.employeeAttendance.forEach((el) => {
        if (el.start == date) {
          (e['color'] as any) = el['color'];
        }
      });
    });
  }
}
