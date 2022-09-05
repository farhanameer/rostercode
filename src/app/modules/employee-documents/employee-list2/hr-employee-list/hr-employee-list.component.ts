import { AfterViewInit, ChangeDetectorRef, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ResStatus } from 'src/app/shared/constants/constants';
import { LookupService } from "src/app/services/lookup.service";
import { BaseComponentComponent } from 'src/app/shared/base-component/base-component.component';
import { CryptoService } from 'src/app/services/crypto.service';
import { HttpService } from 'src/app/shared/http-service/http.service';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { HrEmployeeLeaveBalanceComponent } from '../../employee-leave-balance/hr-employee-leave-balance/hr-employee-leave-balance.component';
import { MatSort } from '@angular/material/sort';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import {
	ResizableModule
} from 'angular-resizable-element';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
interface Employee {
  empid: number;
  designation: string;
  department: string;
  band: string;
  joining_date: string;
  status: string;
  name: string;
}



interface MatMenuListItem {
  menuLinkText: string;
  path: string;
  isDisabled: boolean;
}

@Component({
  selector: 'app-hr-employee-list',
  templateUrl: './hr-employee-list.component.html',
  styleUrls: ['./hr-employee-list.component.scss']
})
export class HrEmployeeListComponent
extends BaseComponentComponent
 implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('perfectScroll') perfectScrollbarDirectiveRef: PerfectScrollbarComponent;
  @ViewChild(MatSort) sort: MatSort;
  show: boolean;
  dataSource = new MatTableDataSource();
  @ViewChild(MatTable) dtable: MatTable<Employee>;
  data: any;
  tableData: any = {};
  sortData: any;
  filterData: string;
  searchData: any;
  columns: Array<any>;
  displayedColumns: string[];
  highlighted: any;
  filter: any;
  filterValues: any = {};
  activeList = ["Yes", "No"];
  employeeSort: any = [];
  sort_by: any[] = [];
  status: any = [];
  searchBy: any = [];
  menuListItems: MatMenuListItem[];
  new_arr = [];
  activeVal: any;
  pageNum: any = 1;
  pageSize: any = 20;
  sort_By = "Last Added";
  initialLoad: boolean = true;
  height: any = "31";
  isDisabled: any = false;
  overflow: any = "auto";
  tableEvents: any = [];
  IsData: boolean = true;
  labelData: any = "View All";
  dataNumber : any = "20";
  showAllData = false;
pageload=true;
  flag = false;
  testData: void;
  filteredStatus: any;
  statusFilter: any;
  filteredDepartment: any;
  departmentFilter: any;

  constructor(
    private lookupService: LookupService,
    private router: Router,
    private cryptoService: CryptoService,
    public dialog: MatDialog,
    private httpService: HttpService,
  ) {
    super();
  }
  ngOnInit(): void {
    let that = this;
    that.initializeDataTable();
  }

  // initialize data table
  initializeDataTable() {
    let that = this;
    that.displayedColumns = [
      "empid",
      "name",
      "designation",
      "department",
      "band",
      "joining_date",
      "emp_status",
    ];
    that.columns = [
      {
        columnDef: "empid",
        header: "Employee ID",
        cell: (element: any) => `${element["empid"] ? element["empid"] : ``}`,
        color: "red",
        class: "w-75",
      },
      {
        columnDef: "name",
        header: "Name",
        cell: (element: any) => `${element["name"] ? element["name"] : ``}`,
        color: "red",
        class: "w-100",
      },
      {
        columnDef: "designation",
        header: "Designation",
        class: "w-100",
        cell: (element: any) =>
          `${element["designation"] ? element["designation"] : ``}`,
      },
      {
        columnDef: "department",
        header: "Department",
        class: "w-100",
        cell: (element: any) =>
          `${element["department"] ? element["department"] : ``}`,
      },
      {
        columnDef: "band",
        header: "Band",
        class: "w-100",
        cell: (element: any) => `${element["band"] ? element["band"] : ``}`,
      },
      {
        columnDef: "joining_date",
        header: "Joining Date",
        class: "w-100",
        cell: (element: any) =>
          `${element["joining_date"] ? element["joining_date"] : ``}`,
      },
      {
        columnDef: "emp_status",
        header: "Status",
        class: "w-100",
        cell: (element: any) =>
          `${element["emp_status"] ? element["emp_status"] : ``}`,
      },
    ];
    that.menuListItems = that.lookupService.menuListItems;
    that.loadDropdowns()
    that.loadData();
  }

  // ngAfterViewInit() {
  //   let that = this;
  // }

  searchByValues(event: any) {
    let that = this;
    if (event == null) {
      that.filter = null;
    }
  }
  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // load data
  loadData() {
    let that = this;
    let extraParams = {
      ...(that.pageNum && { 'pageNum': that.pageNum }),
      ...(that.pageSize && { 'pageSize': that.pageSize }),
      // ...(that.sort_By && { 'sort_by': that.sort_By.toString() }),
    }
    that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
      .subscribe(
        (data: any) => {
          if (data.data.length >= 0) {
            that.data = [];
            this.initialLoad = true;
            that.IsData = true;
            that.data = (data as any).data;
            this.dataSource = new MatTableDataSource((data as any).data ? (data as any).data : []);
            that.setTableHeight((data as any).data);

          }
          else {
            this.IsData = false;
            this.setTableHeight((data as any).data ? (data as any).data : []);
          }
          that.dataNumber = (data as any).data ? (data as any).data.length : 0;
        },
        (error) => {

        }
      );
  }

  // load dropddowns
  loadDropdowns() {
    let that = this;
    this.httpService.get(`${environment.nodeApiUrl}StaticData/employeeListDropdowns`)
      .subscribe((result: any) => {
        // if (result && result.data) {
          var sData = result.sort_by;
          for (var i = 0; i < sData.length; i++) {
            that.sort_by.push({
              value: i + 1,
              sort: sData[i],
            });
          }
          that.searchBy = result.departments;
          that.departmentFilter = result.departments;
          that.status = result.job_status;
          that.statusFilter = result.job_status;
        // }
      });
  }
  onkeypress(value)
  {
  let that = this;
  let filter = value.toLowerCase();
  this.filteredStatus =  that.statusFilter.filter(option => option.description.toLowerCase().startsWith(filter));
  that.status = that.filteredStatus;
}
onDepartmentPress(value)
{
let that = this;
let filter = value.toLowerCase();
this.filteredDepartment =  that.departmentFilter.filter(option => option.department_name.toLowerCase().startsWith(filter));
that.searchBy = that.filteredDepartment;
}
// onKeycon(value) { 
//   this.status = this.searchcon(value);
// }
// searchcon(value: string) { 
//   let filter = value.toLowerCase();
//   return this.statusFilter.filter(option => option.department_name.toLowerCase().startsWith(filter));
// }
  //apply filter on data table
  applyFilter() {
     ;
    let that = this;
    var sort = this.sortData ? this.sortData : this.sort_By;
    var department = this.searchData ? this.searchData : null;
    var filterVal = parseInt(this.filter) ? parseInt(this.filter) : this.filter;
    var activeVal = this.activeVal != null ? this.activeVal : null;
    var page = 1;
    let extraParams = {
      ...(page && { 'pageNum': page }),
      ...(that.pageSize && { 'pageSize': that.pageSize }),
      ...(activeVal != null && { 'active_status': activeVal.toString() }),
      ...(department && { 'department_id': department.toString() }),
      ...(filterVal && { 'search_value': filterVal }),
      ...(sort && { 'sort_by': sort.toString() }),
    }
    // that.httpService.getByParams(`${environment.laravelApiUrl}user/employee_list`, extraParams)
    that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
      .subscribe(
        (data: any) => {
          if (data.data.length >= 0) {
            that.IsData = true;
            var newData = (data as any).data;
            that.data = newData;
            this.dataSource = new MatTableDataSource(newData);
            this.setTableHeight(newData);
            this.dataNumber = newData.length;

          }
          else {
            this.IsData = false;
            this.setTableHeight((data as any).data ? (data as any).data : []);
            this.dataNumber = (data as any).data ? (data as any).data.length : 0;
          }
        },
        (error) => {
        }
      );
  }

  // click dataTable row
  rowClick(index: string | number) {
    for (var i = 0; i < this.data.length; i++) {
      this.data[i].highlighted = false;
    }
  }

  // navigate to selected employee form
  navigate(path?: any, id?: any) {
    let that = this;
    if (path === "employment_salary_change") {
      that.router.navigate(["/employee_histroy/employment_salary_change"], {
        queryParams: {
          employeeId: id,
        },
      });
    } else if (path === "employment_change_history") {
      that.router.navigate(["/employee_histroy/employment_change_history"], {
        queryParams: {
          employeeId: id,
        },
      });
    } else if (path === "emp_history") {
      that.router.navigate(["/employee_histroy/emp_history"], {
        queryParams: {
          employeeId: id,
        },
      });
    }
    else if (path === "EditEmployeeProfile") {
      that.router.navigate(["/org-emp/employee-profile/profile/edit/personal-details"], {
        queryParams: {
          employeeId: this.cryptoService.encrypt(id),
        },
      });
    }
    else if (path === "ViewEmployeeProfile") {

      that.router.navigate(["/org-emp/employee-profile/profile/view-profile"], {
        queryParams: {
          employeeId: this.cryptoService.encrypt(id),
        },
      });
    }
    else if (path === "ApprovalQueue") {
      that.router.navigate(["/org-emp/employee-profile/profile/approval-queue"], {
        queryParams: {
          employeeId: this.cryptoService.encrypt(id),
        },
      });
    }
    else if (path === "EmployeeLeaveBalance") {
      var data1 = {employeeId : id}
      const dialogRef = this.dialog.open(HrEmployeeLeaveBalanceComponent, {
        width: '600px',
        data: { fixedComponents: data1 },
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  //load server data on page scroll

  // onTableScroll(e) {
  //   if (this.flag) {
  //     let that = this;
  //     const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
  //     const tableScrollHeight = e.target.scrollHeight; // length of all table
  //     const scrollLocation = e.target.scrollTop; // how far user scrolled
  //     var newData;
  //     if (that.showAllData == false) {
  //       // If the user has scrolled within 200px of the bottom, add more data
  //       const buffer = 200;
  //       const limit = tableScrollHeight - tableViewHeight - buffer;
  //       if (scrollLocation > limit) {
  //                  this.pageNum = this.pageNum + 1;
  //         var scrollimit = 20;
  //         var sort = this.sortData ? this.sortData : this.sort_By;
  //         var department = this.searchData ? this.searchData : null;
  //         var filterVal = this.filter ? this.filter : null;
  //         var activeVal = this.activeVal != null ? this.activeVal : null;
  //         let extraParams = {
  //           ...(that.pageNum && { 'pageNum': that.pageNum }),
  //           ...(scrollimit && { 'pageSize': scrollimit }),
  //           ...(activeVal != null && { 'active_status': activeVal.toString() }),
  //           ...(department && { 'department_id': department.toString() }),
  //           ...(filterVal && { 'search_value': filterVal }),
  //           // ...(sort && { 'sort_by': sort.toString() }),
  //         };
  //         localStorage.setItem("isLoaderDisabled", "true");
  //           that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
  //           .subscribe(
  //             (data: any) => {
  //               localStorage.removeItem("isLoaderDisabled");
  //               this.tableData = {};
  //               //(data as any).data;
  //               // console.log(data.payload.result);
  //               data.payload ? (newData = data.payload.result) : newData;
  //               if (newData) {
  //                 this.tableData = this.dataSource
  //                   ? [...this.dataSource.data, ...newData]
  //                   : newData;
  //                 this.data = this.tableData;
  //                 this.dataSource = new MatTableDataSource(this.tableData);
  //                 this.pageSize = this.tableData.length;
  //                 this.setTableHeight(this.tableData);
  //                 this.setColumnResize(1000, that.tableEvents);
  //                 console.log("lenth", this.tableData.length);
  //                 this.dataNumber = this.tableData.length;
  //                 // console.log(" this.dataNumber", this.dataNumber);
  //               }
  //             },
  //             (error) => {}
  //           );
  //       }
  //     }
  //     this.initialLoad = false;
  //   }
  //   this.flag = true;
  // }
  
  onTableScroll(e) {
    if(this.pageload==true){
        this.pageload=false;
    }
    else{
      let that = this;
      const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
      const tableScrollHeight = e.target.scrollHeight; // length of all table
      const scrollLocation = e.target.scrollTop; // how far user scrolled
      if (that.showAllData == false) {
        // If the user has scrolled within 200px of the bottom, add more data
        const buffer = 200;
        const limit = tableScrollHeight - tableViewHeight - buffer;
        if (scrollLocation > limit) {
          this.pageNum = this.pageNum + 1;
          var scrollimit = 20;
          var sort = this.sortData ? this.sortData : this.sort_By;
          var department = this.searchData ? this.searchData : null;
          var filterVal = this.filter ? this.filter : null;
          var activeVal = this.activeVal != null ? this.activeVal : null;
          let extraParams = {
            ...(that.pageNum && { 'pageNum': that.pageNum }),
            ...(scrollimit && { 'pageSize': scrollimit }),
            ...(activeVal != null && { 'active_status': activeVal.toString() }),
            ...(department && { 'department_id': department.toString() }),
            ...(filterVal && { 'search_value': filterVal }),
          }
          localStorage.setItem('isLoaderDisabled', 'true');
          that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
            .subscribe(
              (data: any) => {
                localStorage.removeItem('isLoaderDisabled');
                var newData = (data as any).data;
                if (newData) {
                  this.tableData = this.dataSource
                    ? [...this.dataSource.data, ...newData]
                    : newData;
                    this.data=this.tableData;
                  this.dataSource = new MatTableDataSource(this.tableData);
                  this.pageSize = this.tableData.length;
                  this.setTableHeight(this.tableData);

                  this.dataNumber = this.tableData.length;
                }
              },
              (error) => {
              }
            );
        }
      }
      this.initialLoad = false;
    }

  }

  // set datatable hight dynamically on base of data
  setTableHeight(data: any) {
    if (data && data.length < 18) {
      this.height = 28 * data.length + 28;
      this.isDisabled = true;
      this.overflow = "hidden";
    } else {
      this.height = data && data.length > 0 ? this.dataNumber == "All" ? 28 * data.length + 28 : 560 : 50;
      this.isDisabled = false;
      this.overflow = "auto";
    }
  }
  viewData() {
    let that = this;
    that.perfectScrollbarDirectiveRef.directiveRef.update();
    that.perfectScrollbarDirectiveRef.directiveRef.scrollToTop(0,1);
    if (that.labelData == "View All") {
      that.showAllData = true;
      let extraParams = {}
      that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
        .subscribe(
          (data: any) => {
            that.showAllData = true;
            that.labelData = "Show Less";
            that.dataNumber = "All";
            if (data.data.length >= 0) {
              that.IsData = true;
              var totalData = (data as any).data;
              var loadInitialData = that.dataSource
                  ? [...that.dataSource.data, ...totalData]
                  : totalData;
                  this.data=loadInitialData;
              this.dataSource = new MatTableDataSource(loadInitialData);
              that.setTableHeight(loadInitialData);
              // setTimeout(function(){
              //   var fullData = that.dataSource
              //     ? [...that.dataSource.data, ...totalData]
              //     : totalData;
              //     that.dataSource = new MatTableDataSource(fullData);
              //     that.setTableHeight(fullData);
              //  });
            }
            else {
              this.IsData = false;
              this.setTableHeight((data as any).data ? (data as any).data : []);
            }
          },
          (error) => {
          }
        );

    } else {
      // this.flag = true;
      // this.dataNumber = "20";
      // that.pageNum = 1;
      // that.pageSize = 0;
      // that.labelData = "View All";
      // that.loadData();
      // that.showAllData = false;
      that.pageNum = 1;
      that.pageSize = 20;
      that.labelData = "View All";
      that.loadData();
      that.showAllData = false;
    }
  }

  // viewData() {
  //   let that = this;
  //   that.perfectScrollbarDirectiveRef.directiveRef.update();
  //   that.perfectScrollbarDirectiveRef.directiveRef.scrollToTop(0, 1);
  
  //   console.log("LabelData", that.labelData);
  //   if (that.labelData == "View All") {
  //     that.showAllData = true;
  //     // that.page = 1
  //     let extraParams = {};
  //     that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
  //       .subscribe(
  //         (data: any) => {
  //           // that.showAllData = true;
  //           that.labelData = "Show Less";
  //           that.dataNumber = "All";
  //           if (data.data.length >= 0) {
  //             that.IsData = true;
  //             var totalData = data.payload.result; //(data as any).data;
  //             // var loadInitialData = totalData.splice(0, 150);
  //             var loadInitialData = totalData;
  //             //  that.dataSource
  //             //   ? [...that.dataSource.data, ...totalData]
  //             //   : totalData;
  //             // this.data = totalData;
  //             this.data = loadInitialData;
  //             this.dataSource = new MatTableDataSource(loadInitialData);
  //             that.setTableHeight(loadInitialData);
  //           } else {
  //             this.IsData = false;
  //             this.testData = this.setTableHeight(data ? data : []);
  //             console.log("Test Data", this.testData);
  //           }
  //         },
  //         (error) => {}
  //       );
  //   } else {
  //     this.flag = true;
  //     this.dataNumber = "20";
  //     that.pageNum = 1;
  //     that.pageSize = 0;
  //     that.labelData = "View All";
  //     that.loadData();
  //     that.showAllData = false;
  //   }
  // }

  compare(a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  changeOrder() {
    var value = this.sortData;
    if (value === 1) {
      this.data.sort(this.compare);
    } else if (value === 2) {
      this.data.sort(this.compare).reverse();
    }
  }

}

@NgModule({
  declarations: [HrEmployeeListComponent],
  imports: [SharedModule,
    ResizableModule
  ],
})
export class HrEmployeeListComponentModule { }
