import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  IBox,
  IBranch,
  IBuilding,
  ICabinet,
  IDrawer,
  IFlap,
  IFloor,
} from "../../../models/address.interface";
import { DropDownFieldService } from "../../../services/dropdown-fields-service";
import { PersonalFileSetupService } from "../../../services/personal-file-setup/personal-file-setup.service";
import { ToastService } from "../../../services/toast.service";
import { ObservableService } from "../../../util/observablefn.service";
//   import { IResponse } from "../models/response.interface";

@Component({
  selector: "category-field",
  templateUrl: "category-field-modal.html",
  styleUrls: ["category-field-modal.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [FormGroupDirective],
})
export class CategoryFieldModal {
  fieldName: string = "";
  clientId: number = this.os.getClientId();
  fieldId: number = 0;
  parentId: number = 0;
  categoryFields = [];
  newCategoryFields = [];

  submitted: boolean = false;

  addCategoryFieldForm: FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    public dialogRef: MatDialogRef<CategoryFieldModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pfSetup: PersonalFileSetupService,
    private os: ObservableService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.categoryFields = [];
    this.addCategoryFieldForm = this.fb.group({
      categoryField: ["", Validators.required],
    });

    this.getCategoryFields();
    console.log(this.data);
  }


  
  async getCategoryFields() {


    console.log('get data from services');
    const result = await this.pfSetup.getCategoryFields({
      cId : this.clientId,
      categoryId : this.data.categoryId
    });

    this.categoryFields = result.data;
    console.log(result);
    console.log(this.categoryFields);
  }

  get validation() {
    return this.addCategoryFieldForm.controls;
  }

  delete(id, index) {}

  categoryFieldAlreadyExists(name): Boolean {
    let exists = false;
    this.categoryFields.every((item) => {
      if (item.name == name) {
        exists = true;
        return false;
      }
      return true;
    });
    return exists;
  }

  async addCategoryField(event, value: string) {
    console.log(value);

    const exists = this.categoryFieldAlreadyExists(value);

    if (exists) {
      this.toastService.toast("Already exists!", "error-toast");
      return;
    }
    event.preventDefault();

    this.submitted = true;

    this.categoryFields.push({ id: 0, name: value });

    this.newCategoryFields.push({ name: value, cId: this.data.clientId });
    this.formGroupDirective.resetForm();
    Object.keys(this.addCategoryFieldForm.controls).forEach((key) => {
      this.addCategoryFieldForm.get(key).setErrors(null);
    });
  }


  async saveCategoryFields(){
    console.log(this.newCategoryFields);
    

    const body = {categoryFields : this.newCategoryFields}
    const result = await this.os.asPromised(

      this.pfSetup.addDocumentCategoriesBulk(this.data.categoryId , body)
    );
    

    const categoryFields = await this.pfSetup.getCategoryFields({
      cId : this.clientId , 
      categoryId : this.data.categoryId
    },true);
    
    if (!result.status) {
      console.log('here is any');
      console.log(result)
      this.toastService.toast('something went wrong!', 'error-toast');
      this.close();
      return;
    }

    
    this.toastService.toast('document categories added successfully','success-toast');
    this.close();
    return;
  }

  close() {
    this.newCategoryFields = [];
    const array = [];
    this.categoryFields = [];
    console.log('fkm')
    setTimeout(() => {
      this.dialogRef.close();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.categoryFields = [];
  }
}
