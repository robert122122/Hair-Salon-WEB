import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert.service';
import { User } from 'src/app/login/login';
import { AddressDTO } from '../address';
import { BookingGet } from '../booking';
import { Barber } from '../salon-details/salon-barbers/barber';
import { BarberService } from '../salon-details/salon-barbers/barber.service';
import { Service } from '../salon-details/salon-services/service';
import { ServiceService } from '../salon-details/salon-services/service.service';
import { SalonService } from '../salon.service';
import { SalonDTO, SalonPut } from '../salons/salon';
import { AddAddressComponent } from './add-address/add-address.component';
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

  mySalon: SalonDTO = {
    id: 0,
    name: "",
    description: "",
    email: "",
    phoneNumber: "",
    addressId: 0,
    logo: "",
    image: "",
    rating: 0
  }

  salonAddress: AddressDTO = {
    id: 0,
    country: "",
    city: "",
    street: "",
    number: "",
  }

  salonPut: SalonPut = {
    name: "",
    description: "",
    email: "",
    image: "",
    phoneNumber: "",
  }

  response!: { dbPath: ''; };


  myBarbers: Barber[] = [];

  myServices: Service[] = [];

  myCustomers: User[] = [];

  myBookings: BookingGet[] = [];

  mobWidth: any;

  imgPath: string = "";

  pipe = new DatePipe('en-US');

  disabledButton: boolean = true;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
  phonenumberFormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]);

  constructor(
    private salonService: SalonService,
    private barberService: BarberService,
    private serviceService: ServiceService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.barberService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
      this.myBarbers = barbers;
    })

    this.serviceService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
      this.myServices = services;
    })

    this.salonService.getSimpleSalon(parseInt(localStorage.getItem('userId')!)).subscribe((salon) => {
      this.mySalon = salon;

      this.salonPut.name = salon.name;
      this.salonPut.email = salon.email;
      this.salonPut.phoneNumber = salon.phoneNumber;
      this.salonPut.description = salon.description;
      this.salonPut.image = salon.image;

      if (salon.addressId != null) {
        this.salonService.getAddress(salon.addressId).subscribe((address) => {
          this.salonAddress = address;
        })
      }
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
        this.barberService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
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
        this.barberService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
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
        this.serviceService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
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
        this.serviceService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
          this.myServices = services;
        })
      }
    });
  }

  openAddressDialog(): void {
    let addressDialogRef = this.dialog.open(AddAddressComponent, {
      width: "50%",
      data: { salonId: parseInt(localStorage.getItem('userId')!) },
    });

    addressDialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.serviceService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
          this.myServices = services;
        })
      }
    });
  }

  deleteBarber(barberId: number) {

    this.barberService.deleteBarber(barberId).subscribe(() => {
      this.barberService.getBarbersBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((barbers: Barber[]) => {
        this.myBarbers = barbers;
      })
      this.alertService.alertSuccess("Barber deleted successfully!");
    })
  }

  deleteService(serviceId: number) {
    this.serviceService.deleteService(serviceId).subscribe(() => {
      this.serviceService.getServicesBySalon(parseInt(localStorage.getItem('userId')!)).subscribe((services: Service[]) => {
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
    if (this.response != undefined) {
      this.salonPut.image = this.response.dbPath;
    }
    this.salonService.updateSalon(this.salonPut, parseInt(localStorage.getItem('userId')!)).subscribe((salon) => {
      
      this.mySalon = salon;
      this.alertService.alertSuccess("Salon updated successfully");
      this.isCreate = false;

    })
  }

  returnToUpdate = () => {
    this.isCreate = true;
  }

  uploadFinished = (event: any) => {
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
