import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { ServicePut } from '../../salon-details/salon-services/service';
import { ServiceService } from '../../salon-details/salon-services/service.service';
import { SalonService } from '../../salon.service';
import { UpdateServiceDialogData } from '../salon-settings.component';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {

  disabledButton: boolean = true;

  serviceUpdated: ServicePut = {
    serviceName: "",
    description: "",
    cost: 0,
    serviceTime: 0,
  };

  serviceNameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]);
  costFormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]);
  serviceTimeFormControl = new FormControl('', [Validators.required, Validators.min(10), Validators.max(180)]);

  constructor(    
    public dialogRef: MatDialogRef<UpdateServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateServiceDialogData, 
    private salonService: SalonService, 
    private serviceService: ServiceService,
    private alertService: AlertService) { }

  ngOnInit(): void {

      this.serviceUpdated = {
        serviceName: this.data.service.serviceName,
        description:this.data.service.description,
        cost:this.data.service.cost,
        serviceTime:this.data.service.serviceTime
      }
  }

  updateService() {
    if (this.checkFormControls() == false) {
      this.serviceService.updateService(this.serviceUpdated, this.data.service.id).subscribe((service) => {
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
