import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salon } from '../salons/salon';
import { SalonService } from '../salon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AlertService } from 'src/app/alert.service';
import { Booking } from '../booking';
import { Review } from './salon-reviews/review';
import { Service } from './salon-services/service';
import { Barber } from './salon-barbers/barber';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReviewService } from './salon-reviews/review.service';
import { BarberService } from './salon-barbers/barber.service';
import { ServiceService } from './salon-services/service.service';

export interface serviceTime {
  hour: number,
  minute: number
}

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent implements OnInit {

  boo: boolean = true;

  opened = false;

  userRole:string = '';

  constructor(
    private route: ActivatedRoute,
    private salonService: SalonService,
    private reviewService: ReviewService,
    private barberService: BarberService,
    private serviceService: ServiceService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private alertService: AlertService,
    private jwtHelper: JwtHelperService,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }


  salon: Salon = {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "string",
    image: "string",
    address: {
      id: 0,
      country: "",
      city: "",
      street: "",
      number: "",
    },
    rating: 0,
    description: "",
    logo: ""
  };

  booking: Booking = {
    salonId: 0,
    serviceId: 0,
    barberId: 0,
    bookingDate: new Date(),
    userId: parseInt(localStorage.getItem('userId')!)
  }

  minDate: Date = new Date();
  maxDate: Date = new Date();

  availableTimes: serviceTime[] = [
    { hour: 9, minute: 0 },
    { hour: 9, minute: 30 },
    { hour: 10, minute: 0 },
    { hour: 10, minute: 30 },
    { hour: 11, minute: 0 },
    { hour: 11, minute: 30 },
    { hour: 12, minute: 0 },
    { hour: 12, minute: 30 },
    { hour: 13, minute: 0 },
    { hour: 13, minute: 30 },
    { hour: 14, minute: 0 },
    { hour: 14, minute: 30 },
    { hour: 15, minute: 0 },
    { hour: 15, minute: 30 },
    { hour: 16, minute: 0 },
    { hour: 16, minute: 30 },
  ];

  serviceCompleted = false;
  barberCompleted = false;
  bookingDateCompleted = false;


  menuItems: string[] = ['Appointment', 'Services', 'Barbers', 'About Us', 'Reviews'];

  reviews: Review[] = [];

  services: Service[] = [];

  barbers: Barber[] = [];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;

  stepperOrientation: Observable<StepperOrientation>;

  selected: Date | null = null;

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.reviewService.getReviewsBySalon(id).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    })

    this.salonService.getSalon(id).subscribe((salon: Salon) => {
      this.salon = salon;
    })

    this.maxDate.setDate(this.maxDate.getDate() + 2 * 7);

    this.serviceService.getServicesBySalon(id).subscribe((services: Service[]) => {
      this.services = services;
    })

    this.barberService.getBarbersBySalon(id).subscribe((barbers: Barber[]) => {
      this.barbers = barbers;
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });

    this.booking.salonId = id;
    if (localStorage.getItem("userId") != null) {
      const x = localStorage.getItem('userId');
    }

    const token = localStorage.getItem("jwt");
    const decode = this.jwtHelper.decodeToken(token!);
    let str;
    const newObj = {} as any;
    for (let prop in decode) {
      const val = decode[prop];
      if (prop.includes('/')) {
        str = prop.substring(prop.lastIndexOf('/') + 1, prop.length);
      }
      else {
        str = prop;
      }
      newObj[str] = val;
    }

    this.userRole = newObj.role;

  }

  setServiceId(id: number): void {
    this.booking.serviceId = id;
    this.serviceCompleted = true;
  }

  setBarberId(id: number): void {
    this.booking.barberId = id;
    this.barberCompleted = true;
  }

  setBookingDate(): void {
    if (this.selected != null) {
      this.booking.bookingDate = this.selected;
    }
    this.salonService.bookAppointment(this.booking).subscribe((booking: Booking) => {
    });
  }

  setTimeToDate(timeToSet: serviceTime): any {
    this.selected?.setHours(timeToSet.hour);
    this.selected?.setMinutes(timeToSet.minute);

    this.setBookingDate();


    this.bookingDateCompleted = true;

    // setTimeout(() => {                           // <<<---using ()=> syntax
    //   this.resetStepper();
    // }, 200);

    this.alertService.alertSuccess("Appointment success!");
  }

  resetStepper(): void {
    this.serviceCompleted = false;
    this.barberCompleted = false;
    this.bookingDateCompleted = false;
    this.selected = null;
  }

}
