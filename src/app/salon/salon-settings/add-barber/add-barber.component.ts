import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { BarberPost } from '../../salon-details/salon-barbers/barber';
import { BarberService } from '../../salon-details/salon-barbers/barber.service';
import { DialogData } from '../../salon-details/salon-reviews/salon-reviews.component';
import { SalonService } from '../../salon.service';

@Component({
  selector: 'app-add-barber',
  templateUrl: './add-barber.component.html',
  styleUrls: ['./add-barber.component.css']
})
export class AddBarberComponent implements OnInit {

  barberToAdd: BarberPost = {
    firstName: "",
    lastName: "",
    age: 0,
    salonId: parseInt(localStorage.getItem('userId')!),
    image: ""
  }

  isCreate: boolean = true;

  response!: { dbPath: ''; };


  firstnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  lastnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  ageFormControl = new FormControl('', [Validators.required, Validators.min(14), Validators.max(99)]);

  disabledButton: boolean = true;

  constructor(
    private salonService: SalonService,
    private barberService: BarberService,
    public dialogRef: MatDialogRef<AddBarberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.isCreate = true;
    this.checkFormControls();
    this.barberToAdd.salonId = this.data.salonId;
  }

  uploadFinished = (event:any) => { 
    this.response = event; 
    this.checkFormControls();
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:44396/${serverPath}`; 
  }

  addBarber() {
    if (this.checkFormControls() == false) {
      this.barberToAdd.image = this.response.dbPath;
      this.barberService.addBarber(this.barberToAdd).subscribe((barber) => {
        this.alertService.alertSuccess("Barber added successfully");
        this.isCreate = false;
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
