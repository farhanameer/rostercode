import { Component, Inject, NgZone, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "allow-notification",
  templateUrl: "./allow-notification.modal.html",
  styleUrls: ["./allow-notification.modal.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllowNotification {
  constructor(
    public dialogRef: MatDialogRef<AllowNotification>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone : NgZone
  ) {}
  ngOnInit() {
    const alignTop = document.getElementsByClassName("align-top")[0];
    alignTop["style"].alignSelf = "flex-start";
    alignTop.parentElement.style.padding = "0px";
  }
  close(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  allow() {
    const btn = document.getElementById("one-signal-popu-notification");
    const button = btn.childNodes[0] as HTMLButtonElement;

    console.log(button);
    
    button.click();
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
}
