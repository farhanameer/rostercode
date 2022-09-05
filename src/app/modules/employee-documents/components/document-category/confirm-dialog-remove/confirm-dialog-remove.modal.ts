import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PersonalFileSetupService } from "../../../services/personal-file-setup/personal-file-setup.service";

@Component({
    selector: "confirm-dialog-remove",
    templateUrl: "confirm-dialog-remove.modal.html",
    styleUrls: ['confirm-dialog-remove.modal.scss'],
    encapsulation: ViewEncapsulation.None,
  })
  export class ConfirmDialogRemove {
    catField = "";
    id: Number = 0;
    categoryId: Number = 0;
  
    constructor(
      public dialogRef: MatDialogRef<ConfirmDialogRemove>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private pfSetup: PersonalFileSetupService
    ) {
      this.catField = this.data.catField;
      this.id = this.data.id;
      this.categoryId = this.data.categoryId;
    }
  
    close(): void {
      this.dialogRef.close();
    }
  
    removeCategoryField(id, categoryId) {
      this.pfSetup.removeCategoryField(this.data.id, categoryId);
      this.close();
    }
  }
  