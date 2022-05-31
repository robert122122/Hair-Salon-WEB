import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { DialogData } from '../../salon-details/salon-reviews/salon-reviews.component';
import { ServicePost } from '../../salon-details/salon-services/service';
import { SalonService } from '../../salon.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  disabledButton: boolean = true;

  serviceToAdd: ServicePost = {
    serviceName: "",
    description: "",
    cost: 0,
    serviceTime: 0,
    salonId: parseInt(localStorage.getItem('userId')!)
  };

  serviceNameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]);
  costFormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]);
  serviceTimeFormControl = new FormControl('', [Validators.required, Validators.min(10), Validators.max(180)]);

  constructor(
    public dialogRef: MatDialogRef<AddServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private salonService: SalonService, 
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.checkFormControls();
  }


  addService() {
    if (this.checkFormControls() == false) {
      this.salonService.addService(this.serviceToAdd).subscribe((service) => {
        console.log(service);
      })
    }
    else this.alertService.alertError("");
  }

  checkFormControls(): boolean {

    if (this.serviceNameFormControl.errors != null || this.descriptionFormControl.errors != null || this.costFormControl.errors != null || this.serviceTimeFormControl.errors != null) {
      this.disabledButton = true;
      return true;
    }
    this.disabledButton = false;
    return false;
  }

}
