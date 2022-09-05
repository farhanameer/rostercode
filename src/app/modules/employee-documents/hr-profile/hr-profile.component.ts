import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AddDocumentService } from "../services/add-document/add-document.service";
import { ToastService } from "../services/toast.service";
import { ObservableService } from "../util/observablefn.service";

@Component({
  selector: "app-hr-profile",
  templateUrl: "./hr-profile.component.html",
  styleUrls: ["./hr-profile.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("openClose", [
      state("maximize", style({ display: "block" })),
      state("minimize", style({ display: "none" })),
      transition("maximize => minimize", [animate("100ms ease-in-out")]),
      transition("minimize => maximize", [animate("100ms ease-in-out")]),
    ]),
  ],
})
export class HrProfileComponent implements OnInit {
  statePhysicalLocation: string = "maximize";
  locations = {
    branch: [],
    building: [],
    floor: [],
    box: [],
    cabinet: [],
    drawer: [],
    flap: [],
  };
  submitted: boolean = false;
  filter = {};
  physicalLocationForm: FormGroup;
  clientId: number;
  uploadedBy: number;
  documentFilesLocationId: number;
  drawers = [];
  flaps = [];
  isUpdating: boolean = false;
  disabledUpdate: boolean = true;
  isArrayEmpty: boolean = false;

  isLoaded = {
    branch: false,
    building: false,
    floor: false,
    box: false,
    cabinet: false,
    drawer: false,
    flap: false,
  };

  userId: number = 0;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private os: ObservableService,
    private addDocService: AddDocumentService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {
    this.uploadedBy = parseInt(localStorage.getItem("e_number"));
    this.clientId = parseInt(localStorage.getItem("client_id"));
  }

  get validation() {
    return this.physicalLocationForm.controls;
  }
  ngOnInit(): void {
    this.getEmployee();
    this.disabledUpdate = true;
    this.physicalLocationForm = this.fb.group({
      branchId: ["", Validators.required],
      buildingId: ["", Validators.required],
      floorId: ["", Validators.required],
      boxId: ["", Validators.required],
      cabinetId: ["", Validators.required],
      drawerId: [""],
      flapId: [""],
      fileNo: ["", Validators.required],
    });
    this.getDocumentFileLocation();
    this.getFilteredLocationForDocument({}, "branch");
  }

  getEmployee() {
    this.userId = parseInt(this.route.snapshot.paramMap.get("userId"));
  }

  isDisabledLocation:Boolean = false;
  documentLocation:any = null;
  isLoadedAll:Boolean = false;
  async getDocumentFileLocation() {
    const res = await this.os.asPromised(
      this.addDocService.getDocumentFileLocation(this.userId)
    );
    const data = res.payload ? res.payload[0] : null;
    console.log(data);


    this.resetLocationArray();

    if(!data) {
      this.isUpdating = true;
      this.isLoadedAll = true;
      return;
    }
    if (data) {
      for (const control in this.locations) {
        if (data[control]) {
          this.locations[control].push(data[control][0]);
          this.physicalLocationForm.controls[this.mapField(control)].setValue(
            data[control][0][this.mapField(control)]
          );
        }
      }
      this.documentLocation = data;
      this.physicalLocationForm.controls.fileNo.setValue(data.fileNo);
      this.documentFilesLocationId = data.id;
      this.isDisabledLocation = data.is_disabled;
      this.isUpdating = true;
      this.isLoadedAll = true;
    }
  }

  mapField(field) {
    const fields = {
      branch: "branchId",
      building: "buildingId",
      floor: "floorId",
      box: "boxId",
      cabinet: "cabinetId",
      drawer: "drawerId",
      flap: "flapId",
    };

    return fields[field];
  }

  toggle(event) {
    console.log(event);
    console.log("value of disable", this.disabledUpdate);
    this.disabledUpdate = true;

    console.log("value of disable", this.disabledUpdate);
  }
  onEditGetLocation(filter, location: string) {
    if (this.isUpdating) {
      this.getFilteredLocationForDocument(filter, location);
    }
  }
  async getFilteredLocationForDocument(filter, location: string) {
    let tempArray = [];
    this.isLoaded[location] = false;
    const res = (
      await this.os.asPromised(
        this.addDocService.getFilteredLocationForDocument(this.clientId, filter)
      )
    ).payload[0];

    if (res) this.isLoaded[location] = true;
    if(res[location].length == 0) return;
    this.locations[location] = res[location];
    // console.log('filter locs',this.locations[location]);
    // const distinctValues = [];
    // let index = 0;
    // const hash = {};
    // this.locations[location].forEach(loc =>{
    //   if(loc[`${location}Id`] && !hash[loc[`${location}Id`]]) {
    //     hash[loc[`${location}Id`]] = index;
    //     distinctValues.push(loc);
    //     index = index + 1;
    //   } else {
    //     if(!loc[`${location}Id`]) return;
    //     distinctValues[hash[loc[`${location}Id`]]] = loc
    //   }
    // });
    // console.log('loc',distinctValues);
    // console.log('loc' , location);
    // this.locations[location] = distinctValues;
    // this.physicalLocationForm.get('flapId').setValue(23)
    
    tempArray = this.locations[location].filter((val) => {
      return val[`${location}Id`] != null;
    });

    this.isArrayEmpty = tempArray.length == 0 ? true : false;
  }

  // selection change from drawer
  getFlapsByDrawers(drawerId, flapId) {
    console.log(this.locations);

    let tempArray = [];
    this.flaps = [];

    console.log(this.locations.drawer);

    this.locations.drawer.forEach(dr =>{
      if(dr.drawerId == drawerId) {
        if(dr.flap) {
          this.physicalLocationForm.controls.flapId.setValue(dr.flap);
        }else{
          this.physicalLocationForm.controls.flapId.setValue(null);
        }
      }
    })

    // for (const item of this.locations.drawer) {
    //   if (flapId && item.drawerId == drawerId && item.flap == flapId)
    //     this.flaps.push(item);
    // }
    // if (this.flaps.length == 0) {
    //   tempArray = this.locations.flap;
    //   this.locations.flap = [];
    //   this.physicalLocationForm.controls.flapId.setValue(null);
    //   this.physicalLocationForm.controls.flapId.setErrors(null);
    //   this.locations.flap = tempArray;
    // }

    // console.log('shouldnt be working here',this.flaps);
    // if(this.flaps.length == 1) {
    //   console.log('should be working here',this.flaps);
    // }
  }

  // selection change from flap
  getDrawersByFlaps(drawerId, flapId) {
    console.log(this.locations);
    let tempArray = [];
    this.drawers = [];



    this.locations.flap.forEach(fl =>{
      if(fl.flapId == flapId) {
        if(fl.drawer) {
          this.physicalLocationForm.controls.drawerId.setValue(fl.drawer);
        }else{
          this.physicalLocationForm.controls.drawerId.setValue(null);
        }
      }
    })
    // for (const item of this.locations.flap) {
    //   if (drawerId && item.flapId == flapId && item.drawer == drawerId)
    //     this.drawers.push(item);
    // }
    // if (this.drawers.length == 0) {
    //   tempArray = this.locations.drawer;
    //   this.locations.drawer = [];
    //   this.physicalLocationForm.controls.drawerId.setValue(null);
    //   this.physicalLocationForm.controls.drawerId.setErrors(null);
    //   this.locations.drawer = tempArray;
    // }
  }

  minMaxPhysicalLocation() {
    this.statePhysicalLocation =
      this.statePhysicalLocation == "maximize" ? "minimize" : "maximize";
  }

  resetFields(location) {
    this.resetPhysicalLocationFields(location);
  }

  resetLocationArray() {
    for (let location in this.locations) this.locations[location] = [];
  }

  async addRecord(form) {
    if (!this.isUpdating) {
      const res = await this.os.asPromised(
        this.addDocService.addFileInPhysicalLocation(
          this.clientId,
          this.userId,
          this.uploadedBy,
          form
        )
      );
      console.log(res);

      this.clientId = res.payload[0].cid;
      this.userId = res.payload[0].user_id;
      this.uploadedBy = res.payload[0].added_by;
      this.documentFilesLocationId = res.payload[0].id;
      this.isUpdating = true;
      this.disabledUpdate = true;
    } else this.updateRecord(form);
  }

  async updateRecord(form) {
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
  }

  resetPhysicalLocationFields(field) {
    const matFormNames = {
      branch: "branchId",
      building: "buildingId",
      floor: "floorId",
      box: "boxId",
      cabinet: "cabinetId",
      drawer: "drawerId",
      flap: "flapId",
    };
    const resetFields = [
      "branch",
      "building",
      "floor",
      "box",
      "cabinet",
      "drawer",
      "flap",
    ];
    let change = false;
    for (const key of resetFields) {
      if (key === field) {
        change = true;
        continue;
      }
      if (change) {
        console.log("after", key);
        this.isLoaded[key] = false;
        this[key] = [];

        if (matFormNames[key])
          this.resetPhysicalLocationMatSelect(matFormNames[key]);
      }
    }
  }

  resetPhysicalLocationMatSelect(name) {
    this.validation[name].setValue(null);
    this.physicalLocationForm.get(name).markAsUntouched();
  }

  inputChanged: boolean = false;
  enableUpdate() {
    this.inputChanged = true;
    if (this.isUpdating) {
      if (this.physicalLocationForm.valid && this.inputChanged)
        this.disabledUpdate = false;
      else this.disabledUpdate = true;
    }

    this.inputChanged = false;
    console.log("disabledUpdate in hr", this.disabledUpdate);
  }

  changeMessageAndDisabledClass(property){
    console.log(this.documentLocation);
    

    if(this.documentLocation[property]){
      this.documentLocation[property][0].isDisabled = false;
    }


    let toggler = false;
    if(this.documentLocation.building[0].isDisabled || this.documentLocation.cabinet[0].isDisabled && this.documentLocation.box[0].isDisabled || this.documentLocation.floor[0].isDisabled || (this.documentLocation.flap && this.documentLocation.flap[0].isDisabled) || (this.documentLocation.drawer && this.documentLocation.drawer[0].isDisabled)) {
      toggler = true;
    }
    if(!toggler) {
      this.isDisabledLocation = false;
    }
  }
}
