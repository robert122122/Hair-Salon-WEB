import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { User } from 'src/app/login/login';
import { BookingGet } from '../booking';
import { Barber, BarberPost } from '../salon-details/salon-barbers/barber';
import { Service, ServicePut } from '../salon-details/salon-services/service';
import { SalonService } from '../salon.service';
import { SalonPut } from '../salons/salon';
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

  isCreate: boolean = true;

  mySalon: SalonPut = {
    name: "",
    description: "",
    email: "",
    phoneNumber: "",
    logo: "",
    image: ""
  }

  response!: { dbPath: ''; };


  myBarbers: Barber[] = [];

  myServices: Service[] = [];

  myCustomers: User[] = [];

  myBookings: BookingGet[] = [];

  mobWidth: any;

  imgPath: string = "";

  pipe = new DatePipe('en-US');

  disabledButton:boolean = true;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]);
  phonenumberFormControl = new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]);
  descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(1000)]);

  constructor(
    private salonService: SalonService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.salonService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
      this.myBarbers = barbers;
    })

    this.salonService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
      this.myServices = services;
    })

    this.salonService.getSalon(parseInt(localStorage.getItem('userId')!)).subscribe((salon) => {
      this.mySalon.name = salon.name;
      this.mySalon.email = salon.email;
      this.mySalon.phoneNumber = salon.phoneNumber; 
      this.mySalon.description = salon.description;
    })

    this.salonService.getBookingsBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((bookings) => {
      this.myBookings = bookings;
      this.dataSource = this.myBookings;
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
      data: { barber: barberToUpdate },
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
          this.myServices = services;
        })
      }
    });
  }

  deleteBarber(barberId: number) {

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

  public createImgPath = (serverPath: string): string => {
    this.imgPath = `https://localhost:44396/${serverPath}`;
    this.imgPath = this.imgPath.replace("\\", "/");
    this.imgPath = this.imgPath.replace("\\", "/");
    return this.imgPath;
  }

  updateSalon() {
    if(this.response!=undefined){
      this.mySalon.image = this.response.dbPath;
    }
    console.log(this.mySalon);
    this.salonService.updateSalon(this.mySalon, parseInt(localStorage.getItem('userId')!)).subscribe((salon) => {
      this.alertService.alertSuccess("Salon updated successfully");
      this.isCreate = false;

    })
  }

  returnToUpdate = () => {
    this.isCreate = true;
  }

  uploadFinished = (event:any) => { 
    this.response = event; 
    this.checkFormControls();
  }

  
  checkFormControls(): void {

    if (this.emailFormControl.errors != null || this.nameFormControl.errors != null || this.phonenumberFormControl.errors != null || this.descriptionFormControl.errors != null) {
      this.disabledButton = true;
      return;
    }
    this.disabledButton = false;
  }

  columns = [
    {
      columnDef: 'bookingId',
      header: 'No.',
      cell: (element: BookingGet) => `${element.id}`,
    },
    {
      columnDef: 'user',
      header: 'No.',
      cell: (element: BookingGet) => `${element.user}`,
    },
    {
      columnDef: 'service',
      header: 'Service',
      cell: (element: BookingGet) => `${element.service}`,
    },
    {
      columnDef: 'barber',
      header: 'Barber',
      cell: (element: BookingGet) => `${element.barber}`,
    },
    {
      columnDef: 'bookingDate',
      header: 'Booking Date',
      cell: (element: BookingGet) => `${this.formatDate(element.bookingDate)}`,
    },
  ];

  dataSource = this.myBookings;
  displayedColumns = this.columns.map(c => c.columnDef);

  formatDate(date: Date): string | null {
    return this.pipe.transform(date, 'MMMM d, y, h:mm:ss a');
  }
}
