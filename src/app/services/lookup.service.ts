import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor() { }
  employeeSort = [
    { value: 1, sort: 'A to Z' },
    { value: 2, sort: 'Z to A' },
  ];
  activeEmployees = [
    { value: 'Active', status: 'Active Employee' },
    { value: 'Non Active', status: 'Non Active Employee' },
  ];
  searchBy = [
    { value: null, search: 'Not Set' },
    { value: 'empID', search: 'Employee Id' },
    { value: 'name', search: 'Name' },
    { value: 'designation', search: 'Designation' },
    { value: 'department', search: 'Department' },
    { value: 'band', search: 'Band' },
  ];

  performanceHistoryLabels=  [
    'Perfomance Rewards',
     'Letter of Appericiations',
     'Warning Letter',
     'Training',
  ]

  yearDropDown= [
    {id:2000, year:'2000'},
    {id:2001, year:'2001'},
    {id:2002, year:'2002'},
    {id:2003, year:'2003'},
    {id:2004, year:'2004'},
    {id:2005, year:'2005'},
    {id:2006, year:'2006'},
    {id:2007, year:'2007'},
    {id:2008, year:'2008'},
    {id:2009, year:'2009'},
    {id:2010, year:'2010'},
    {id:2011, year:'2011'},
    {id:2012, year:'2012'},
    {id:2013, year:'2013'},
    {id:2014, year:'2014'},
    {id:2015, year:'2015'},
    {id:2016, year:'2016'},
    {id:2017, year:'2017'},
    {id:2018, year:'2018'},
    {id:2019, year:'2019'},
    {id:2020, year:'2020'},
    {id:2021, year:'2021'},
    {id:2022, year:'2022'},
    {id:2023, year:'2023'},
    {id:2024, year:'2024'},
    {id:2025, year:'2025'},
  ]

  menuListItems = [
    {
      menuLinkText: 'View Employee Profile',
      path: 'ViewEmployeeProfile',
      isDisabled: false,
    },
    {
      menuLinkText: 'Employee Documents',
      path: 'ViewEmployeeProfile',
      isDisabled: false,
    },
    {
      menuLinkText: 'Edit Employee Profile',
      path: 'EditEmployeeProfile',
      isDisabled: false,
    },
    {
      menuLinkText: 'Approval Queue',
      path: 'ApprovalQueue',
      isDisabled: false,
    },
    {
      menuLinkText: 'Employee Leave Balance',
      path: 'EmployeeLeaveBalance',
      isDisabled: true,
    },
    {
      menuLinkText: 'Attendance Summary',
      path: 'AttendanceSummary',
      isDisabled: true,
    },
    {
      menuLinkText: 'Employment History',
      path: 'emp_history',
      isDisabled: true,
    },
    {
      menuLinkText: 'Employment Change Log',
      path: 'employment_change_history',
      isDisabled: true,
    },
    {
      menuLinkText: 'Employment Salary Change',
      path: 'employment_salary_change',
      isDisabled: true,
    },
  ];
}
