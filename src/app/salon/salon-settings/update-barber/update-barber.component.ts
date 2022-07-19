import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { BarberPut } from '../../salon-details/salon-barbers/barber';
import { BarberService } from '../../salon-details/salon-barbers/barber.service';
import { DialogData } from '../../salon-details/salon-reviews/salon-reviews.component';
import { SalonService } from '../../salon.service';
import { UpdateBarberDialogData } from '../salon-settings.component';

@Component({
  selector: 'app-update-barber',
  templateUrl: './update-barber.component.html',
  styleUrls: ['./update-barber.component.css']
})
export class UpdateBarberComponent implements OnInit {

  barberUpdated: BarberPut = {
    firstName: "",
    lastName: "",
    age: 0,
    image: ""
  }

  firstnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  lastnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  ageFormControl = new FormControl('', [Validators.required, Validators.min(14), Validators.max(99)]);

  disabledButton: boolean = true;

  constructor(
    private salonService: SalonService,
    private barberService: BarberService,
    public dialogRef: MatDialogRef<UpdateBarberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateBarberDialogData,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.barberUpdated = {
      firstName: this.data.barber.firstName,
      lastName: this.data.barber.lastName,
      age: this.data.barber.age,
      image: this.data.barber.image
    }
  }

  addBarber() {
    if (this.checkFormControls() == false) {
      this.barberService.updateBarber(this.barberUpdated, this.data.barber.id).subscribe((barber) => {
      })
    }
    else this.alertService.alertError("");
  }

  checkFormControls(): boolean {

    if (this.firstnameFormControl.errors != null || this.lastnameFormControl.errors != null || this.ageFormControl.errors != null) {
      this.disabledButton = true;
      return true;
    }
    this.disabledButton = false;
    return false;
  }

}
