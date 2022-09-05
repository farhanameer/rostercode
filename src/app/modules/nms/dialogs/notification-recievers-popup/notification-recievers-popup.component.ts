import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { NotificationSettingsService } from "../../services/notification-settings.service";
import { ObservableService } from "../../util/observablefn.service";

@Component({
  selector: "app-notification-recievers-popup",
  templateUrl: "./notification-recievers-popup.component.html",
  styleUrls: ["./notification-recievers-popup.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationRecieversPopupComponent implements OnInit {
  employeesList = [];
  userCountAll: number = 0;
  userCount: number = 0;
  indeterminate: boolean = false;
  check: boolean = true;
  pageSize: number = 8;
  pageNumber: number = 1;
  disableInfinitScroll: Boolean = false;
  isCheckAll: boolean = false;
  include: string = "0";
  isSearching: boolean = false;
  clientId: number;
  includedUsers = [];
  excludedUsers = [];
  isExcluded = false;
  isIncluded = false;
  searchTerm: string = "";

  @ViewChild("checkAll") checkAll;

  constructor(
    public dialogRef: MatDialogRef<NotificationRecieversPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private os: ObservableService,
    private nss: NotificationSettingsService
  ) {
    this.clientId = data.clientId;
  }


  dbUsersCount = null;
  componentLoadedFirstTime : Boolean = true;
  ngOnInit(): void {



    this.include = this.data.include;
    
    if(this.data.include == 0) {
      this.includeUsers = false;
    }else { 
      this.includeUsers = true;
    }
    if (this.include == "include") {
      this.includedUsers = this.data.users;
      this.isIncluded = true;
      this.isExcluded = false;
      this.check = false;
    } else if (this.include == "exclude") {
      this.excludedUsers = this.data.users;
      this.isExcluded = true;
      this.isIncluded = false;
      this.check = true;
    }
    if (this.data.users.length == 0) {
      this.check = true;
      this.indeterminate = false;
    } else this.indeterminate = true;


    this.employees = [...this.data.users];
    this.employees.forEach(emp =>{
      this.userHash[emp.userId] = emp;
    })
    this.getUserCount();
    this.getEmployees();
    this.getUserCountAll();
    
  }

  async getEmployees(
    pageNumber = this.pageNumber,
    pageSize = this.pageSize,
    searchTerm = ""
  ) {
    if (this.disableInfinitScroll) return;

    Object.keys(this.data.filters).map((val) => {
      if (!this.data.filters[val]) delete this.data.filters[val];
    });
    const response = await this.os.asPromised(
      this.nss.getEmployees(
        this.clientId,
        this.data.filters,
        this.data.portal,
        pageNumber,
        pageSize,
        searchTerm
      )
    );
    if (this.employeesList.length == 0 && response.payload.pageNumber == 1)
      this.employeesList = response.payload.data;
    else if (
      response.payload.pageNumber == 1 &&
      response.payload.data.length == 0
    )
      this.employeesList = [];
    else if (this.employeesList.length > 0 && response.payload.pageNumber > 1)
      this.employeesList = this.employeesList.concat(response.payload.data);
    else if (
      response.payload.pageNumber > 1 &&
      response.payload.data.length == 0
    )
      this.disableInfinitScroll = true;
    // this.initialCheckAll(this.check);

    console.log(this.includeUsers);
    if(this.includeUsers) {

      this.employeesList.forEach(emp =>{
        emp.checked = false;
        this.employees.forEach(em =>{
          if(emp.userId == em.userId) {
            emp.checked = true;
          }
        });
      });
    }
    else {
      this.employeesList.forEach(emp =>{
        emp.checked = true;
        this.employees.forEach(em =>{
          if(emp.userId == em.userId) {
            emp.checked = false;
          }
        });
      });
    }

    this.componentLoadedFirstTime = false;
    
  }
  initialCheckAll(check) {
    this.employeesList.forEach((val) => {
      if (check) {
        val.checked = true;
        this.excludedUsers.forEach((userId) => {
          if (val.userId == userId) val.checked = false;
          console.log(val.userId, userId, this.employeesList);
        });
      } else {
        val.checked = false;
        this.includedUsers.forEach((userId) => {
          if (val.userId == userId) val.checked = true;
        });
      }
    });
  }

  async search(searchTerm) {
    this.pageNumber = 1;
    this.employeesList = [];
    if (searchTerm.length == 0) this.isSearching = false;
    else this.isSearching = true;
    await this.getEmployees(this.pageNumber, this.pageSize, searchTerm);
  }

  getDataOnScroll() {
    this.pageNumber = this.pageNumber + 1;
    this.getEmployees(this.pageNumber, this.pageSize, this.searchTerm);
  }



  async getUserCountAll() {

    const response = await this.os.asPromised(
      this.nss.getUserCount(this.clientId, this.data.filters, this.data.portal)
    );
    this.dbUsersCount = response.payload[0].userCount;
    return response.payload[0].userCount;
  }



  async getUserCount() {
    this.userCount = this.data.userCount;
    this.userCountAll = this.data.userCount;
  }






  userHash = {};
  inderminatState : Boolean = false;
  employees : any =[];
  includeUsers : Boolean = false;
  selectionChanged(empCheck , index) {
    console.log(this.employees);
    console.log(this.userHash);
    this.indeterminate = true;


    if(!this.userHash[this.employeesList[index].userId]){
      this.userHash[this.employeesList[index].userId] = this.employeesList[index];
      this.employees.push(this.employeesList[index]);
      if(!this.includeUsers && !empCheck) {
        this.userCount--;  
      }
      else {

        this.userCount++;
      }

      if(this.employees.length == this.dbUsersCount) {
        this.inderminatState = false;
        this.employees = [];
        this.userHash = {};
      }
    
    } else {
      delete this.userHash[this.employeesList[index].userId];
      const array = [];
      
      this.employees.forEach(emp =>{

        if(emp.userId == this.employeesList[index].userId) {
          if(!this.includeUsers && empCheck) {
            this.userCount++;
          }
          else {
            this.userCount--;
          }
        }
        if(emp.userId != this.employeesList[index].userId) {
          array.push(emp);
        }
      });
      this.employees = array;
    }



    console.log('include users' , this.includeUsers);
    console.log('user Ids' , this.employees);
    console.log('inderminant State' , this.inderminatState);


    // if(empCheck) {
    //   if(!this.userHash[this.employeesList[index].userId]){
    //     this.userHash[this.employeesList[index].userId] = this.employeesList[index];
    //     this.employees.push(this.employeesList[index]);

    //     if(this.employees.length == this.dbUsersCount) {
    //       this.inderminatState = false;
    //       this.employees = [];
    //       this.userHash = {};
    //     }
      
    //   }
    //   return;
    // }

    // if(this.userHash[this.employeesList[index].userId]) {
    //   delete this.userHash[this.employeesList[index].userId];
    //   const array = [];
    //   this.employees.forEach(emp =>{
    //     if(emp.userId != this.employeesList[index]) {
    //       array.push(emp);
    //     }
    //   });
    //   this.employees = array;
    // }


    console.log(this.employees);
    console.log(this.userHash);
    

    

  }


  getEmployeeId(id){
    let userId = 0;
    this.employeesList.forEach(emp =>{
      if(emp.userId == id) {
        userId = emp.userId;
      }
    });

    return userId;
  }
  indeterminateCheck(empCheck, index) {
    this.isCheckAll = false;
    const userId = this.employeesList[index].userId;
    this.employeesList[index].checked = empCheck;

    if (this.check) {
      if (empCheck)
        this.excludedUsers.splice(this.excludedUsers.indexOf(userId), 1);
      else this.excludedUsers.push(userId);
    } else {
      if (empCheck) this.includedUsers.push(userId);
      else this.includedUsers.splice(this.includedUsers.indexOf(userId), 1);
    }
    if (this.excludedUsers.length == 0) this.isExcluded = false;
    else this.isExcluded = true;
    if (this.includedUsers.length == 0) this.isIncluded = false;
    else this.isIncluded = true;
    this.indeterminate = this.isExcluded || this.isIncluded;
    // !this.employeesList.every((val) => {
    //   return val.checked == this.employeesList[0].checked;
    // });

    if (!this.indeterminate) {
      if (this.employeesList[0].checked) {
        this.check = true;
        this.include = "exclude";
      } else {
        this.check = false;
        this.include = "include";
      }
    }
    if (empCheck) this.userCount++;
    else this.userCount--;
  }

  async toggleCheck(checkAll) {
    this.excludedUsers = [];
    this.includedUsers = [];
    this.check = checkAll;

    console.log(checkAll);
    
    this.includeUsers = checkAll;

    if(checkAll) {
      this.employees = [];
      this.userHash = {};
      this.includeUsers = false;
      this.userCount = this.dbUsersCount;
      this.indeterminate = false;
    }
    else{
      this.includeUsers = true;
      this.employees = [];
      this.userHash = {};
      this.userCount = 0;
      this.indeterminate = false;
    }
    this.initialCheckAll(this.check);


    console.log('include users' , this.includeUsers);
    console.log('user Ids' , this.employees);

    return;

    if (checkAll) {
      this.include = "exclude";
      this.isCheckAll = true;
    } else {
      this.include = "include";
      this.userCount = 0;
      this.isCheckAll = false;
    }
    this.indeterminate = false;
    this.employeesList.map((val) => {
      return (val.checked = checkAll);
    });
    if (checkAll) this.userCount = this.employeesList.length;
    this.initialCheckAll(this.check);
    if (this.check) this.userCount = await this.getUserCountAll();
    else this.userCount = 0;
  }

  submit() {
    this.close();
  }

  close() {


    console.log('is included' , this.includeUsers);
    console.log('employees' , this.employees);


    let users = [];
    if (this.include == "include") users = this.includedUsers;
    else if (this.include == "exclude") users = this.excludedUsers;
    else users = [];
    this.data.users
    users = this.employees;
    this.dialogRef.close({
      userCount: this.userCount,
      users,
      include: this.includeUsers,
    });
  }

  closeButton(){


    console.log('is included' , this.includeUsers);
    console.log('employees' , this.employees);



    const users = this.data.users;
    this.dialogRef.close({
      userCount: this.data.userCount,
      users,
      include: this.data.include,
    });
  }
}
