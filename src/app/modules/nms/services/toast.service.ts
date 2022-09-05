import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  toast(message: string, cssClass: "success-toast" | "error-toast", duration = 2000) {
    this.snackBar.open(message, '×', {
      duration,
      panelClass: cssClass
    });
  }
}
