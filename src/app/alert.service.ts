import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackbarService: SnackbarService
  ) { }

  alertSuccess(message: string): void {
    this.snackbarService.openSnackBar(message, 'Close', 'success-snackbar');
  }

  alertInfo(message: string): void {
    this.snackbarService.openSnackBar(message, 'Close', 'info-snackbar');
  }

  alertWarning(message: string): void {
    this.snackbarService.openSnackBar(message, 'Close', 'warning-snackbar');
  }

  alertError(message: string): void {
    this.snackbarService.openSnackBar(message, 'Close', 'error-snackbar');
  }
}
