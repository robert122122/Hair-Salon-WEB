import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from '../alert.service';
import { BookingGet } from '../salon/booking';
import { SalonService } from '../salon/salon.service';
import { UserService } from '../user.service';
import { User } from './user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  isCreate: boolean = true;

  user: User = {
    firstName: '',
    lastName: '',
    phoneNumber:'',
    email: '',
    image: '',
  };

  response!: { dbPath: ''; };

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]);
  lastnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]);
  phonenumberFormControl = new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]);

  disabledButton: boolean = true;

  bookings: BookingGet [] = [];

  pipe = new DatePipe('en-US');

  constructor(private salonService: SalonService, private userService: UserService,private httpService: HttpClient, private alertService: AlertService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.isCreate = true;

    this.salonService.getBookingsByUserWithDetails(parseInt(localStorage.getItem('userId')!)).subscribe((bookings: BookingGet[]) =>{
      this.bookings = bookings;
      this.dataSource = this.bookings;
    })

    this.userService.getUserDetails().subscribe((user: User) => {
      this.user = user;
      console.log(user);
    })
    
  }

  updateUser() {
    if(this.response!=undefined) {
      this.user.image = this.response.dbPath;
    }
    
    this.userService.updateUser(this.user).subscribe({
      next: _ => {
        this.alertService.alertSuccess("User updated succesfully!");
        this.isCreate = false;
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  returnToUpdate = () => {
    this.isCreate = true;
  }

  uploadFinished = (event:any) => { 
    this.response = event; 
    this.checkFormControls();
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:44396/${serverPath}`; 
  }

  checkFormControls(): void {
    console.log(this.response);
    console.log(this.emailFormControl.errors);
    console.log(this.firstnameFormControl.errors);

    console.log(this.lastnameFormControl.errors);

    console.log(this.phonenumberFormControl.errors);


    if (this.emailFormControl.errors != null || this.firstnameFormControl.errors != null || this.lastnameFormControl.errors != null || this.phonenumberFormControl.errors != null ) {
      this.disabledButton = true;
      console.log(true);
      return;
    }
    console.log(false);
    this.disabledButton = false;
  }

  columns = [
    {
      columnDef: 'bookingId',
      header: 'No.',
      cell: (element: BookingGet) => `${element.id}`,
    },
    {
      columnDef: 'salon',
      header: 'Salon',
      cell: (element: BookingGet) => `${element.salon}`,
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

  dataSource = this.bookings;
  displayedColumns = this.columns.map(c => c.columnDef);

  formatDate(date: Date): string | null {
    return this.pipe.transform(date, 'MMMM d, y, h:mm:ss a');
  }
}