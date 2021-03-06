import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private readonly snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string, snackbarStyle: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackbarStyle]
    });
  }
}
