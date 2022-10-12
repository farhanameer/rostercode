import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class RosterToastService {
  constructor(private snackBar: MatSnackBar) {}

  toast(
    message: string,
    cssClass: "error-toast" | "success-toast",
    duration = 2000
  ) {
    this.snackBar.open(message, "×", {
      duration,
      panelClass: cssClass,
    });
  }
}
