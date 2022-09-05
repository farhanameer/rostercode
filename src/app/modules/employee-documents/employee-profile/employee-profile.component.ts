import { Component, OnInit } from "@angular/core";
import { AddDocumentService } from "../services/add-document/add-document.service";
import { ObservableService } from "../util/observablefn.service";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.scss"],
})
export class EmployeeProfileComponent implements OnInit {
  constructor(
    private addDocService: AddDocumentService,
    private os: ObservableService
  ) {}

  ngOnInit(): void {}
}
