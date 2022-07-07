import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { AddressPost } from '../../address';
import { DialogData } from '../../salon-details/salon-reviews/salon-reviews.component';
import { SalonService } from '../../salon.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  addressToAdd: AddressPost = {
    country: "",
    city: "",
    street: "",
    number: "",
  }

  salonId: number = 0;

  isCreate: boolean = true;

  countryFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  cityFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  streetFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  numberFormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000)]);

  disabledButton: boolean = true;

  constructor(
    private salonService: SalonService,
    public dialogRef: MatDialogRef<AddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.isCreate = true;
    this.checkFormControls();
    this.salonId = this.data.salonId;
  }

  addAddress() {
    if (this.checkFormControls() == false) {
      console.log(this.addressToAdd);
      this.salonService.addAddress(this.addressToAdd).subscribe({
        next: (response) => {
          console.log(response);
          this.salonService.updateSalonAddress(response.id, this.salonId, null).subscribe((salon) => {
            this.alertService.alertSuccess("Salon updated");
          });
          this.alertService.alertSuccess("Address added successfully");
          this.isCreate = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.alertService.alertError("okokokokok");
        }
      })
    }
    else this.alertService.alertError("");
  }

  checkFormControls(): boolean {

    if (this.countryFormControl.errors != null || this.cityFormControl.errors != null || this.streetFormControl.errors != null || this.numberFormControl.errors != null) {
      this.disabledButton = true;
      return true;
    }
    this.disabledButton = false;
    return false;
  }

}

