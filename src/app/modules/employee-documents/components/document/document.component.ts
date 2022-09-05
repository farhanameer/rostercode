import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import moment from "moment";
import { dateFormat } from "src/app/modules/nms/util/date-format.enum";
import { AddDocumentService } from "../../services/add-document/add-document.service";
import { FileUploadService } from "../../services/file-upload/file-upload.service";
import { PersonalFileSetupService } from "../../services/personal-file-setup/personal-file-setup.service";
import { ToastService } from "../../services/toast.service";
import { ObservableService } from "../../util/observablefn.service";
import { ConfirmDialogRemove } from "./confirm-dialog-remove/confirm-dialog-remove.modal";
import { DocumentViewerModal } from "./document-viewer-modal/document-viewer-modal";

@Component({
  selector: "document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("openClose", [
      state("maximize", style({ display: "block" })),
      state("minimize", style({ display: "none" })),
      transition("maximize <=> minimize", [animate("100ms ease-in-out")]),
    ]),
  ],
})
export class DocumentComponent implements OnInit {

  recruitementPack = null;
  stateDocumentList: string = "maximize";
  stateAddDocument: string = "maximize";

  submitted: boolean = false;
  documentForm: FormGroup;
  documentList = [];

  filter = {};

  categoriesWithFields = [];
  documentCategoryFields = [];

  allCategoryFields = [];
  allUserDocuments = [];

  fileUrl: string = "";
  fileName: string = "";
  fileFormat: string = "";

  disabledUpdate: boolean = true;
  isNoRecord: boolean = false;
  isUpdating: boolean = false;

  uploadedBy = 54323;
  clientId = this.os.getClientId();
  portalType = this.os.getPortal();
  documentCategoryFieldTitle = "";

  disabledSave: boolean = true;

  validateIfChecked: ValidatorFn;
  validateDateIfLesser: ValidatorFn;


  @ViewChild("documentRefForm") documentRefForm: FormGroupDirective;

  @Input() form: NgForm;
  @Input() action: boolean;
  @Input() disable: boolean;
  @Input() userId: number;
  @Input() canDelete: boolean;
  @Input() validForm: boolean;
  @Input() documentFilesLocationId: number;

  @Output() toggleDisable = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private os: ObservableService,
    private fileUploadService: FileUploadService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private addDocService: AddDocumentService,
    private pfs: PersonalFileSetupService // private formGroupDirective: FormGroupDirective
  ) {
    this.disabledUpdate = this.disable == undefined ? true : this.disable;
    this.isUpdating = this.action == undefined ? false : this.action;
    this.validateIfChecked = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const validity = control.get("validity").value;
      const validTill = control.get("validTill").value;

      if (validity && !validTill)
        control.get("validTill").setErrors({ requiredIfNotValid: true });
      else if (!(validity && validTill))
        control.get("validTill").setErrors(null);
      return null;
    };

    this.validateDateIfLesser = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const validity = control.get("validity").value;
      const issueDate = new Date(control.get("issueDate").value);
      const validTill = new Date(control.get("validTill").value);
      if (validity)
        if (issueDate >= validTill)
          control.get("validTill").setErrors({ dateLesserThen: true });
        else control.get("validTill").setErrors(null);
      return null;
    };
  }

  ngOnInit(): void {
    
    this.disabledSave = this.form ? !this.validForm : this.disabledSave;
    this.documentForm = this.fb.group(
      {
        documentCategoryId: ["", Validators.required],
        documentCategoryFieldId: ["", Validators.required],
        issueDate: ["", Validators.required],
        validity: [false, false],
        validTill: [""],
        attachment: ["", Validators.required],
      },
      { validators: [this.validateIfChecked, this.validateDateIfLesser] }
    );

    this.getUserDocuments(this.userId);
    this.getAllCategoriesWithFields();
    setTimeout(() => {
      const missingDocuments = this.arrayDifference(
        this.allUserDocuments,
        this.allCategoryFields
      );
    }, 0);
  }

  ngOnChanges(changes: SimpleChange) {
    console.log("value updating", this.disable);
    if (this.disable != undefined) {
      this.disabledUpdate = this.disable;
      this.newDocumentAdded = false;
    }

    if (this.action != undefined) this.isUpdating = this.action;

    // if (this.form && this.validForm && this.allUserDocuments.length > 0) {
    //   this.disabledUpdate = false;
    // }

    this.disabledSave = this.allUserDocuments.length == 0 ? true : false;
    console.log("disable update value", this.disabledUpdate);
  }
  file: any;

  async upload() {
    let result;
    result = await this.fileUploadService.uploadFile(this.file);
    if (!result["success"]) {
      this.toastService.toast(result["error"], "error-toast");
      return;
    }
    this.fileUrl = result["data"].url;
    this.toastService.toast("File Uploaded Successfully!", "success-toast");
  }
  async uploadFile(event) {
    let file;
    let result;
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileName = this.file.name.split(".")[0];
      this.fileFormat = this.file.name.split(".")[1];
      console.log(this.file);
    }
    return;
  }

  minMaxAddDocument() {
    this.stateAddDocument =
      this.stateAddDocument == "maximize" ? "minimize" : "maximize";
  }

  minMaxDocumentList() {
    this.stateDocumentList =
      this.stateDocumentList == "maximize" ? "minimize" : "maximize";
  }
  get validation() {
    return this.documentForm.controls;
  }
  resetFields(field) {
    const matFormNames = {
      documentCategories: "documentCategoryId",
      documentCategoryFields: "documentCategoryFieldId",
    };
    const resetFields = ["documentCategories", "documentCategoryFields"];
    let change = false;
    for (const key of resetFields) {
      if (key === field) {
        change = true;

        continue;
      }
      if (change) {
        this[key] = [];

        if (matFormNames[key]) this.resetMatSelect(matFormNames[key]);
      }
    }
  }

  resetMatSelect(name) {
    this.documentForm.get(name).reset();
  }

  buttonEnabled() {
    let required = false;
    this.allCategoryFields.forEach((val) => {
      if (this.documentsHash[val]) {
        required = true;
      }
    });

    if (required || this.disabledUpdate) {
      console.log(this.disabledUpdate);

      return true;
    }
    return false;
  }
  save() {
    if (this.form && this.validForm && this.validForm)
      this.saveFileLocation(this.form.value);
    this.validateDocuments(this.allUserDocuments, this.allCategoryFields);

    this.disabledSave = false;
  }

  update() {
    if (this.form && this.form.valid && this.form.dirty) {
      if (this.documentFilesLocationId) {
        this.updateFileLocation(this.form.value);
      } else {
        this.saveFileLocation(this.form.value);
      }
    }
    this.validateDocuments(this.allUserDocuments, this.allCategoryFields);
    this.disabledUpdate = true;
  }
  async getDocumentFileLocation() {
    const res = await this.os.asPromised(
      this.addDocService.getDocumentFileLocation(this.userId)
    );
    const data = res.payload ? res.payload[0] : null;
    console.log(data);

    if (data) {
      this.documentFilesLocationId = data.id;
    }
  }
  async saveFileLocation(form) {
    console.log("saveFileLocation");
    const res = await this.os.asPromised(
      this.addDocService.addFileInPhysicalLocation(
        this.clientId,
        this.userId,
        this.uploadedBy,
        form
      )
    );

    this.getDocumentFileLocation();
    // this.clientId = res.payload[0].cid;
    // this.userId = res.payload[0].user_id;
    // this.uploadedBy = res.payload[0].added_by;
  }

  async updateFileLocation(form) {
    if (!form.drawerId) form.drawerId = null;
    if (!form.flapId) form.flapId = null;
    const res = await this.os.asPromised(
      this.addDocService.updateFileLocation(
        this.documentFilesLocationId,
        this.clientId,
        this.userId,
        this.uploadedBy,
        form
      )
    );

    console.log(res);

    if (res.status) this.toastService.toast(res.message, "success-toast");
    this.disabledUpdate = true;
    console.log(this.disabledUpdate);

    this.toggleDisable.emit(true);
  }

  validateDocuments(allUserDocuments, allCategoryFields) {
    const missingDocuments = this.arrayDifference(
      allCategoryFields,
      allUserDocuments
    );
    let validationMsg = `Some Documents are missing: ${missingDocuments.join(
      ", "
    )}`;
    if (missingDocuments.length > 0) {
      this.toastService.toast(validationMsg, "error-toast");
    } else {
      this.disabledUpdate = true;
      console.log(this.disabledUpdate);

      this.toastService.toast(
        "Documents uploaded successfully!",
        "success-toast"
      );
    }
  }

  async getAllCategoriesWithFields(reset = true) {
    const ids = {
      clientId: this.clientId,
      userId: this.userId,
    };
    if (this.portalType == "hrportal") ids["portalType"] = this.portalType;
    this.categoriesWithFields = (
      await this.os.asPromised(
        this.addDocService.getAllCategoriesWithFields(ids)
      )
    ).payload;
    console.log(this.categoriesWithFields);
    this.getAllCategoryFields(this.categoriesWithFields);
    if (reset) {
      this.resetFields("documentCategory");
      this.resetMatSelect("documentCategoryId");
    }
  }

  async getDocumentCategoryField(categoryId) {
    this.categoriesWithFields.every((val) => {
      if (categoryId == val.id) {
        this.documentCategoryFields = val.subCatFields;
        return false;
      }
      return true;
    });
  }

  openDoc(documentsList, currentDocument): void {
    const dialogRef = this.dialog.open(DocumentViewerModal, {
      width: "600px",
      panelClass: ["module-style", "popup-doc"],
      data: {
        documentsList,
        currentDocument,
      },
    });
    dialogRef.afterOpened().subscribe(() => {
      document
        .getElementsByClassName("popup-doc")[0]
        .parentElement.classList.add("doc-viewer-padding");
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  documentsHash = {};

  async getUserDocuments(userId) {
    this.documentList = (
      await this.os.asPromised(this.addDocService.getUserDocuments(userId))
    ).payload;

    this.isNoRecord = this.documentList.every((document) => {
      return document.documents.length == 0;
    });
    this.documentList.forEach((document) => {
      document.documents.forEach((doc) => {
        if (!this.documentsHash[doc.category_field_name]) {
          this.documentsHash[doc.category_field_name] = true;
        }
      });
    });
    this.getAllUserData(this.documentList);
  }

  newDocumentAdded: boolean = false;
  async addDocument() {
    try {
      console.log("add call");
      await this.upload();
      let validTill = "";

      if (!this.documentForm.valid) return;
      if (!this.fileUrl || this.fileUrl == "") {
        this.toastService.toast("invalid file is selected!", "error-toast");
        return;
      }

      
      // const issueDate = new Date(this.documentForm.value.issueDate)
      //   .toISOString()
      //   .split("T")[0]
      //   .replace(/\//g, "-");

      const issueDate = moment(this.documentForm.value.issueDate).format('YYYY-MM-DD');

      if (this.documentForm.value.validTill)
        // validTill = new Date(this.documentForm.value.validTill)
        //   .toISOString()
        //   .split("T")[0]
        //   .replace(/\//g, "-");

        validTill = moment(this.documentForm.value.validTill).format('YYYY-MM-DD')
      else delete this.documentForm.value.validTill;
      let singleDocument = {};

      this.documentForm.value.userId = this.userId;
      this.documentForm.value["fileUrl"] = this.fileUrl;
      this.documentForm.value["fileName"] = this.fileName;
      this.documentForm.value["fileFormat"] = this.fileFormat;
      this.documentForm.value.issueDate = issueDate;

      if (this.documentForm.value.validTill)
        this.documentForm.value.validTill = validTill;
      else delete this.documentForm.value.validTill;
      delete this.documentForm.value.attachment;

      const res = await this.os.asPromised(
        this.addDocService.addDocument(this.documentForm.value)
      );

      if (res.status) {
        this.newDocumentAdded = true;
        if (!this.disabledUpdate) {
          this.disabledUpdate = false;
        }

        console.log(this.disabledUpdate);
        this.isNoRecord = false;
        this.toastService.toast(
          "Document saved successfully!",
          "success-toast"
        );
        this.recruitementPack = null;
      }
      singleDocument = res.payload[0];
      // this.docService.addDocument(this.documentForm.value).subscribe(res => {

      //   console.log(res);
      // }, err => {
      //   console.error(err);

      // })

      let title = "";
      this.documentsHash[this.documentCategoryFieldTitle] = true;
      this.documentCategoryFields.forEach((category) => {
        if (
          category.documentCategoryFieldId == this.documentCategoryFieldTitle
        ) {
          title = category.categoryFieldName;
        }
      });

      console.log(title);
      this.documentList.forEach((val, index) => {
        if (val.id == singleDocument["document_category_id"]) {
          singleDocument["category_field_name"] = title;
          singleDocument["uploaded_on"] = singleDocument["created_at"];
          singleDocument["uploaded_by"] = singleDocument["uploaded_by_string"];
          this.documentList[index].documents.push(singleDocument);
        }
      });
      // const exisitsAlready = this.allUserDocuments.every((val) => {
      //   return val == singleDocument["category_field_name"];
      // });
      // if (!exisitsAlready)
      this.allUserDocuments.push(singleDocument["category_field_name"]);
      console.log(this.allUserDocuments);

      this.documentRefForm.resetForm();
      Object.keys(this.documentForm.controls).forEach((key) => {
        this.documentForm.get(key).setValue(null);
        this.documentForm.get(key).setErrors(null);
      });
      this.documentForm.controls.validity.setValue(false);
      this.fileName = "";
      this.fileFormat = "";
      // this.documentCategories = [];
      this.documentCategoryFields = [];

      this.submitted = true;
      this.disabledSave = false;
    } catch (error) {
      this.disabledSave = true;
    }
    this.isUpdating = this.allUserDocuments.length == 0 ? false : true;
    this.disabledUpdate = this.allUserDocuments.length == 0 ? true : false;
  }
  resetTitle(control) {
    this.validation[control].setValue(null);
    this.validation[control].setErrors(null);
    this.documentCategoryFields = [];
  }
  markAsTouched(control) {
    this.validation[control].markAsTouched();
  }
  transformDate(date) {
    return moment(date).format(dateFormat);
  }

  openConfirmDialog(name, id, index, parentIndex) {
    this.pfs.subscribeDocumentCB(this.deleteDocument, this);
    const dialogRef = this.dialog.open(ConfirmDialogRemove, {
      width: "350px",
      panelClass: "module-style",
      data: { name, id, index, parentIndex },
    });
  }

  async deleteDocument({ name, id, index, parentIndex }, context) {
    context.documentList[parentIndex].documents.splice(index, 1);
    const fieldIndex = context.allUserDocuments.indexOf(name);
    context.allUserDocuments.splice(fieldIndex, 1);
    this.disabledUpdate = false;

    const res = await context.os.asPromised(
      context.addDocService.deleteDocument(context.userId, id)
    );

    if (res.status) {
      this.disabledSave = context.allUserDocuments.length == 0 ? true : false;
      context.toastService.toast(res.message, "success-toast");
    }
    console.log(this.documentList);
    if (!this.documentList) {
      this.isNoRecord = true;
    }
  }

  arrayDifference(leftArray: Array<any>, rightArray: Array<any>) {
    const isSameField = (a, b) => a == b;

    const onlyInLeft = (compareFunction) =>
      leftArray.filter(
        (leftValue) =>
          !rightArray.some((rightValue) =>
            compareFunction(leftValue, rightValue)
          )
      );

    const onlyInA = onlyInLeft(isSameField);
    const result = [...onlyInA];
    return result;
  }

  getAllUserData(allDocuments: Array<any>) {
    allDocuments.map((val) => {
      val["documents"].filter((field) => {
        this.allUserDocuments.push(field.category_field_name);
      });
    });
    this.isUpdating = this.allUserDocuments.length == 0 ? false : true;
    console.log(this.allUserDocuments);
  }

  getAllCategoryFields(categories: Array<any>) {
    categories.map((val) => {
      val["subCatFields"].filter((field) => {
        if (field["isRequired"])
          this.allCategoryFields.push(field.categoryFieldName);
      });
    });
  }


  changeSelectedItem(item){
    this.recruitementPack = item;
  }


  async downloadFile(url, name, ext) {
    console.log(url, name, ext);

    this.fileUploadService.downloadFile(url).subscribe(
      success =>{
        console.log(success);
        const blob = new Blob([success]);
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${name}.${ext}`;
        console.log(link.download);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    );
  }
}
