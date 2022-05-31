import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { User } from 'src/app/login/login';
import { Barber, BarberPost } from '../salon-details/salon-barbers/barber';
import { Service, ServicePut } from '../salon-details/salon-services/service';
import { SalonService } from '../salon.service';
import { AddBarberComponent } from './add-barber/add-barber.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { UpdateBarberComponent } from './update-barber/update-barber.component';
import { UpdateServiceComponent } from './update-service/update-service.component';

export interface UpdateBarberDialogData {
  barber: Barber
}

export interface UpdateServiceDialogData {
  service: Service
}

@Component({
  selector: 'app-salon-settings',
  templateUrl: './salon-settings.component.html',
  styleUrls: ['./salon-settings.component.css']
})
export class SalonSettingsComponent implements OnInit {

  myBarbers: Barber[] = [];

  myServices: Service[] = [];

  myCustomers: User[] = [];

  mobWidth: any;


  constructor(
    private salonService: SalonService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.salonService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
      this.myBarbers = barbers;
      console.log(barbers);
    })

    this.salonService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
      this.myServices = services;
      console.log(services);
    })

    this.salonService.getSalon(parseInt(localStorage.getItem('userId')!)).subscribe((x) => {
      console.log(x);
    })

  }

  openBarberDialog(): void {
    let barberDialogRef = this.dialog.open(AddBarberComponent, {
      width: "50%",
      data: { salonId: parseInt(localStorage.getItem('userId')!) },
    });

    barberDialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.salonService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
          this.myBarbers = barbers;
        })
      }
    });
  }

  openUpdateBarberDialog(barberToUpdate: Barber): void {
    let barberDialogRef = this.dialog.open(UpdateBarberComponent, {
      width: "50%",
      data: { barber: barberToUpdate},
    });

    barberDialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.salonService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
          this.myBarbers = barbers;
        })
      }
    });
  }

  openServiceDialog(): void {
    let serviceDialogRef = this.dialog.open(AddServiceComponent, {
      width: "50%",
      data: { salonId: parseInt(localStorage.getItem('userId')!) },
    });

    serviceDialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.salonService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
          console.log(services);
          this.myServices = services;
        })
      }
    });
  }

  openUpdateServiceDialog(serviceToUpdate: Service): void {
    let serviceDialogRef = this.dialog.open(UpdateServiceComponent, {
      width: "50%",
      data: { service: serviceToUpdate },
    });

    serviceDialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.salonService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
          console.log(services);
          this.myServices = services;
        })
      }
    });
  }

  deleteBarber(barberId: number) {
    console.log(barberId);

    this.salonService.deleteBarber(barberId).subscribe(() => {
      this.salonService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
        this.myBarbers = barbers;
      })
      this.alertService.alertSuccess("Barber deleted successfully!");
    })
  }

  deleteService(serviceId: number) {
    this.salonService.deleteService(serviceId).subscribe(() => {
      this.salonService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
        this.myServices = services;
      })
      this.alertService.alertSuccess("Service deleted successfully!");
    })
  }

}
