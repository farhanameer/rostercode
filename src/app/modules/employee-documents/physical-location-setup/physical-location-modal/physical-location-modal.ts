import {
  Component,
  Inject,
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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  IBox,
  IBranch,
  IBuilding,
  ICabinet,
  IDrawer,
  IFlap,
  IFloor,
} from "../../models/address.interface";
import { DropDownFieldService } from "../../services/dropdown-fields-service";
import { PhysicalLocationSetupService } from "../../services/physical-location-setup/physical-location-setup.service";
import { ToastService } from "../../services/toast.service";
import { LoaderService } from "../../util/loader.service";
import { ObservableService } from "../../util/observablefn.service";
import { ConfirmDialogRemove } from "./confirm-dialog-remove/confirm-dialog-remove.modal";
//   import { IResponse } from "../models/response.interface";

@Component({
  selector: "physical-location",
  templateUrl: "physical-location-modal.html",
  styleUrls: ["physical-location-modal.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [FormGroupDirective],
})
export class PhysicalLocationModal {
  placeholder: string = "";
  fieldName: string = "";
  clientId: number = this.os.getClientId();
  fieldId: number = 0;
  parentId: number = 0;
  parentIdName: string = "";
  bulkCompanyAddress = [];
  deleteAddress = {};
  submitted: boolean = false;
  control: string = "";
  inputType: string = "";
  addressesArray = [];
  tempId = 65; // refers to 'A' in ASCII to avoid conflicts with actual numeric ids
  disabledAddMore: boolean = true;

  // branches: Array<IBranch> = [];
  // buildings: Array<IBuilding> = [];
  // floors: Array<IFloor> = [];
  // boxes: Array<IBox> = [];
  // cabinets: Array<ICabinet> = [];
  // drawers: Array<IDrawer> = [];
  // flaps: Array<IFlap> = [];

  addLocationForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    public loader: LoaderService,
    public dialogRef: MatDialogRef<PhysicalLocationModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private plSetup: PhysicalLocationSetupService,
    private os: ObservableService,
    private dropDownService: DropDownFieldService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {
    this.control = this.data.control.ngControl.name.substring(
      0,
      this.data.control.ngControl.name.length - 2
    );
    this.placeholder = data.modalData.placeholder;
    this.fieldName = data.modalData.fieldName;
    console.log(this.fieldName);

    this.fieldId = data.modalData.idName;
    this.parentIdName = data.modalData.parentId;
    this.parentId = data.parentId;
    // console.log(this.snakeToCamel(data.modalData.locations));

    this.inputType = data.modalData.inputType;
    this.deleteAddress[`${this.control}Ids`] = [];

    this.getLocation();
  }

  ngOnInit() {
    this.addLocationForm = new FormGroup({});
    this.addLocationForm.addControl(
      this.fieldName,
      new FormControl("", [Validators.required])
    );
  }

  async getLocation() {
    this.loader.showLoader(this.control, true);
    let data = {};
    data[this.parentIdName] = this.parentId;
    console.log(data);

    this.bulkCompanyAddress = (
      await this.os.asPromised(
        this.plSetup.getLocations(this.control, this.clientId, data)
      )
    ).payload;

    console.log("bulk =>", this.bulkCompanyAddress);

    setTimeout(() => {
      this.bulkCompanyAddress = this.snakeToCamel(this.bulkCompanyAddress);
      this.loader.hideLoader();
    }, 0);
  }

  snakeToCamel(array: Array<any>) {
    console.log(array);

    array.map((val, index) => {
      array[index][this.fieldName] =
        val[
          this.fieldName.replace(
            /[A-Z]/g,
            (letter) => `_${letter.toLowerCase()}`
          )
        ];
      array[index][this.parentIdName] =
        val[
          this.parentIdName.replace(
            /[A-Z]/g,
            (letter) => `_${letter.toLowerCase()}`
          )
        ];
    });
    return array;
  }

  get validation() {
    return this.addLocationForm.controls[this.fieldName];
  }

  isDeletion: Boolean = false;
  deletedIndex: Number = -1;
  deletedId: any = null;
  deleteConfirm() {
    this.addressToBeDeleted(this.deletedId, this.deletedIndex, this);
  }

  async addressToBeDeleted(id, index, context) {
    context.loader.showLoader(context.control, true);

    let response;
    let dependency = false;

    if (id != null) {
      response = await context.os.asPromised(
        context.plSetup.checkDependency(
          "checkDependency",
          [id],
          context.control
        )
      );

      console.log(response);

      if (!response.status) {
        context.toastService.toast("something went wrong!", "error-toast");
        return;
      }

      console.log(response.data);
      if (response.payload.dependency)
        context.toastService.toast(
          "location will be disabled , because it is being used!",
          "error-toast"
        );
      dependency = response.payload.dependency;
    }

    if (id != null) {
      (context.deleteAddress[`${context.control}Ids`] as Array<number>).push(
        id
      );
    }
    let remainingArray = [];
    context.addressesArray.forEach((address, i) => {
      if (i == index && dependency) {
        address.is_disabled = 1;
        console.log("deleted Item above");
        remainingArray.push(address);
      } else {
        if (i != index) {
          remainingArray.push(address);
        }
      }
    });

    console.log("after math", remainingArray);
    let raminingCompanyAddresses = [];
    context.bulkCompanyAddress.forEach((cAddress, i) => {
      if (i == index && dependency) {
        cAddress.is_disabled = 1;
        raminingCompanyAddresses.push(cAddress);
      } else {
        if (i != index) raminingCompanyAddresses.push(cAddress);
      }
    });
    context.bulkCompanyAddress = raminingCompanyAddresses;
    context.loader.hideLoader();

    this.isDeletion = false;
    this.deletedIndex = -1;
    this.deletedId = null;
    this.submitted = true;
  }

  updateAddresses: any = {};

  removeElementFromArray(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  enableAddress(address) {
    
    this.loader.showLoader("",true);
    const array: Array<number> = this.deleteAddress[`${this.control}Ids`] || [];
    console.log(address, array);
    if (array.includes(address.id)) {
      address.is_disabled = 0;
      this.deleteAddress[`${this.control}Ids`] = this.removeElementFromArray(array , address.id);
      console.log(this.removeElementFromArray(array, address.id));
      console.log(this.deleteAddress[`${this.control}Ids`]);
      
    }else{
      const updatedIds = this.updateAddresses[`${this.control}Ids`] || [];
      updatedIds.push(address.id);
      this.updateAddresses[`${this.control}Ids`] = updatedIds;
    }
    address.is_disabled = 0;
    this.submitted = true;
    this.toastService.toast("Location and coresponditiong location will be enabled!", "success-toast");
    this.loader.hideLoader();
  }

  locationAlreadyExists(name, fieldName): Boolean {
    let exists = false;
    this.bulkCompanyAddress.every((address) => {
      if (address[fieldName] == name) {
        exists = true;
        return false;
      }
      return true;
    });
    return exists;
  }
  async addressToBeAdded(event, location: FormGroup) {
    let formData = {};
    formData[this.fieldName] = location.value[this.fieldName];
    formData["cId"] = this.clientId;
    formData[this.parentIdName] = this.parentId;
    formData["id"] = null;
    const exists = this.locationAlreadyExists(
      location.value[this.fieldName],
      this.fieldName
    );
    if (exists) {
      this.toastService.toast("Already exists!", "error-toast");
      return;
    }
    event.preventDefault();
    this.addressesArray.push(formData);
    this.bulkCompanyAddress.push(formData);
    this.tempId++;

    setTimeout(() => {
      this.formGroupDirective.resetForm();
      Object.keys(location.controls).forEach((key) => {
        location.get(key).setErrors(null);
      });
    }, 0);

    this.submitted = true;
    this.disabledAddMore = true;
  }

  async saveCompanyAddresses() {
    this.loader.showLoader(this.control, true);
    let response;
    let newAddresses = [];

    this.bulkCompanyAddress.forEach((cAddress) => {
      if (cAddress.id == null) newAddresses.push(cAddress);
    });
    if (newAddresses.length > 0) {
      newAddresses.map((val, index) => {
        delete newAddresses[index].id;
      });
      response = await this.os.asPromised(
        this.plSetup.saveCompanyAddresses(this.control, newAddresses)
      );
      this.loader.hideLoader();
      if (response.status)
        this.toastService.toast(
          `${this.control} created successfully`,
          "success-toast"
        );
      else this.toastService.toast(response.message, "error-toast");
    }
    if (this.deleteAddress[`${this.control}Ids`].length > 0) {
      this.dropDownService.locationDisabled(this.control , (this.deleteAddress[`${this.control}Ids`] || []));
      this.deleteAddress[`${this.control}Ids`].forEach((id) => {
        this.dropDownService.reset(id, this.control);
      });
      if (this.deleteAddress[`${this.control}Ids`].length > 0) {
        await this.os.asPromised(
          this.plSetup.deletePhysicalLocation(this.control, this.deleteAddress)
        );
        // this.toastService.toast(
        //   `${this.control} deleted successfully`,
        //   "success-toast"
        // );
      }
    }
    let updateAbleIds = [];
    if((this.updateAddresses[`${this.control}Ids`] || []).length > 0) {
      const data = await this.os.asPromised(
        this.plSetup.markLocationEnabled('enableLocations', this.control ,  this.updateAddresses[`${this.control}Ids`])
      );
      console.log('enableLocations Data',data);
      updateAbleIds = data.payload.ids;
    }

    this.dropDownService.locationEnabled(this.control , (updateAbleIds || []));
    

    this.dropDownService.makeDropDownApiCall(this.control);

    this.close();
  }
  openConfirmDialog(id, index): void {
    // const dialogRef = this.dialog.open(ConfirmDialogRemove, {
    //   width: "200px",
    //   panelClass: ['module-style', 'confirm-delete'],
    //   data: { id, index , cb:this.addressToBeDeleted, context: this },
    // });

    this.deletedId = id;
    this.deletedIndex = index;
    this.isDeletion = true;
  }
  close() {
    setTimeout(() => {
      this.dialogRef.close();
    });
  }
}
