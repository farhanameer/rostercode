import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PersonalFileSetupService } from "../../../services/personal-file-setup/personal-file-setup.service";

@Component({
    selector: "confirm-dialog-remove",
    templateUrl: "./confirm-dialog-remove.modal.html",
    styleUrls: ['./confirm-dialog-remove.modal.scss'],
    encapsulation: ViewEncapsulation.None,
  })
  export class ConfirmDialogRemove {
    name = "";
  
    constructor(
      public dialogRef: MatDialogRef<ConfirmDialogRemove>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private pfSetup: PersonalFileSetupService
    ) {
      console.log(data);
      
      this.name = this.data.name;
    }
  
    close(): void {
      this.dialogRef.close();
    }
  
    removeCategoryField() {
      this.pfSetup.triggerDocumentRemove(this.data);
      this.close();
    }
  }
  