import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ViewEncapsulation,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { LookupService } from "src/app/services/lookup.service";
import { HttpService } from "src/app/shared/http-service/http.service";
import { Employee, MatMenuListItem } from "src/app/shared/models/employee.model";
import { BaseComponentComponent } from "src/app/shared/base-component/base-component.component";
import { environment } from "src/environments/environment";

// declare var $: any;
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeListComponent
  extends BaseComponentComponent
  implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
  page: any = 1;
  limit: any = 20;
  sort_By = "Last Added";
  initialLoad: boolean = true;
  height: any = "31";
  isDisabled: any = false;
  overflow: any = "auto";
  tableEvents: any = [];
  IsData: boolean = true;
  labelData: any = "View All"

  constructor(
    private lookupService: LookupService,
    private router: Router,
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
      ...(that.page && { 'pageNum': that.page }),
      ...(that.limit && { 'pageSize': that.limit }),
      ...(that.sort_By && { 'sort_by': that.sort_By.toString() }),
    }
    that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
      .subscribe(
        (data: any) => {
          console.log('is data loaded', data);
          
          if (data.data.length > 0) {
            that.IsData = true;
            that.data = (data as any).data;
            that.dataSource.data = (data as any).data;
            that.setTableHeight(this.data);
            that.columns.filter((o) => {
              o.options = this.getFilterObject((data as any).data, o.columnProp);
            });
          }
          else {
            this.IsData = false;
            this.setTableHeight(this.data);
          }
          $('.showLoader').hide();
          this.initialLoad = false;
        },
        (error) => {
          $('.showLoader').hide();
        }
      );
  }

  // load dropddowns
  loadDropdowns() {
    let that = this;
    this.httpService.get(`${environment.nodeApiUrl}StaticData/employeeListDropdowns`)
      .subscribe((result: any) => {
        if (result) {
          var sData = result.sort_by;
          for (var i = 0; i < sData.length; i++) {
            that.sort_by.push({
              value: i + 1,
              sort: sData[i],
            });
          }
          that.searchBy = result.departments;
          that.status = result.job_status;
        }
      });
  }

  //apply filter on data table
  applyFilter() {
    let that = this;
    $('.showLoader').show();
    var sort = this.sortData ? this.sortData : this.sort_By;
    var department = this.searchData ? this.searchData : null;
    var filterVal = parseInt(this.filter) ? parseInt(this.filter) : this.filter;
    var activeVal = this.activeVal != null ? this.activeVal : null;
    var page = 1;
    let extraParams = {
      ...(page && { 'pageNum': page }),
      ...(that.limit && { 'pageSize': that.limit }),
      ...(activeVal != null && { 'active_status': activeVal.toString() }),
      ...(department && { 'department_id': department.toString() }),
      ...(filterVal && { 'search_value': filterVal }),
      ...(sort && { 'sort_by': sort.toString() }),
    }
    that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
      .subscribe(
        (data: any) => {
          if (data.data.length > 0) {
            that.IsData = true;

            $('.showLoader').hide();
            var newData = (data as any).data;
            this.dataSource = new MatTableDataSource(newData);
            this.setTableHeight(newData);
            this.setColumnResize(0, this.tableEvents);
          }
          else {
            this.IsData = false;
            this.setTableHeight(this.data);
          }
        },
        (error) => {
          $('.showLoader').hide();
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
    if(path === "ViewEmployeeProfile") {
      that.router.navigate(["employee-documents/hr-profile", id])
    }
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
  }

  //load server data on page scroll
  onTableScroll(e) {
    let that = this;
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    if (this.initialLoad == false) {
      // If the user has scrolled within 200px of the bottom, add more data
      const buffer = 200;
      const limit = tableScrollHeight - tableViewHeight - buffer;
      if (scrollLocation > limit) {
        this.page = this.page + 1;
        var scrollimit = 20;
        var sort = this.sortData ? this.sortData : this.sort_By;
        var department = this.searchData ? this.searchData : null;
        var filterVal = this.filter ? this.filter : null;
        var activeVal = this.activeVal != null ? this.activeVal : null;
        let extraParams = {
          ...(that.page && { 'pageNum': that.page }),
          ...(scrollimit && { 'PageSize': scrollimit }),
          ...(activeVal != null && { 'active_status': activeVal.toString() }),
          ...(department && { 'department_id': department.toString() }),
          ...(filterVal && { 'search_value': filterVal }),
          ...(sort && { 'sort_by': sort.toString() }),
        }
        that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
          .subscribe(
            (data: any) => {
              var newData = (data as any).data;
              if (newData) {
                this.tableData = this.dataSource
                  ? [...this.dataSource.data, ...newData]
                  : newData;
                this.dataSource = new MatTableDataSource(this.tableData);
                this.limit = this.tableData.length;
                this.setTableHeight(this.tableData);
                this.setColumnResize(1000, that.tableEvents);
              }
            },
            (error) => {
              $('.showLoader').hide();
            }
          );
      }
    }
    this.initialLoad = false;
  }

  // set datatable hight dynamically on base of data
  setTableHeight(data: any) {
    // if (data && data.length < 18) {
    //   this.height = 28 * data.length + 28;
    //   this.isDisabled = true;
    //   this.overflow = "hidden";
    // } else {
    //   this.height = data && data.length > 0 ? 560 : 50;
    //   this.isDisabled = false;
    //   this.overflow = "auto";
    // }
  }
  viewData() {
    let that = this;
    if (that.labelData == "View All") {

      $('.showLoader').show();
      let extraParams = {}
      that.httpService.getByParams(`${environment.nodeApiUrl}StaticData/employeeList`, extraParams)
        .subscribe(
          (data: any) => {
            $('.showLoader').hide();
            that.labelData = "Show Less";
            if (data.data.length > 0) {
              that.IsData = true;
              this.dataSource = new MatTableDataSource((data as any).data);
              that.setTableHeight((data as any).data);
            }
            else {
              this.data = [];
              this.IsData = false;
              this.setTableHeight(this.data);
            }
          },
          (error) => {
            $('.showLoader').hide();
          }
        );

    } else {
      $('.showLoader').show();
      that.labelData = "View All";
      that.loadData();
    }
  }
}
