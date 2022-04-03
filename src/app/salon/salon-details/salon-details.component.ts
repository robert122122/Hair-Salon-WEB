import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salon } from '../salons/salon';
import { SalonService } from '../salon.service';
import { Service } from '../service';
import { Review } from './review';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Barber } from '../barber';

export interface serviceTime{
  hour: number,
  minute: number
}

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent implements OnInit {

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
      number: 0,
    },
    rating: 0,
    description: "",
    logo: ""
  };

  minDate:Date = new Date();
  maxDate:Date = new Date();

  availableTimes: serviceTime[] = [
    {hour: 9, minute: 0},
    {hour: 9, minute: 30},
    {hour: 10, minute: 0},
    {hour: 10, minute: 30},
    {hour: 11, minute: 0},
    {hour: 12, minute: 30},
    {hour: 12, minute: 0},
    {hour: 13, minute: 30},
    {hour: 13, minute: 0},
    {hour: 14, minute: 30},
    {hour: 14, minute: 0},
    {hour: 15, minute: 30},
    {hour: 15, minute: 0},
    {hour: 16, minute: 30},
    {hour: 16, minute: 0},
  ];

  menuItems: string[] = ['Appointment', 'Services', 'Barbers', 'About Us', 'Reviews'];

  reviews: Review[] = [];

  services: Service[] = [];

  barbers: Barber[] = [];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  selected: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private salonService: SalonService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.salonService.getSalon(id).subscribe((salon: Salon) => {
      this.salon = salon;
    })

    this.maxDate.setDate(this.maxDate.getDate() + 2 * 7);

    this.salonService.getServicesBySalon(id).subscribe((services: Service[]) => {
      this.services = services;
    })

    this.salonService.getReviewsBySalon(id).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    })

    this.salonService.getBarbersBySalon(id).subscribe((barbers: Barber[]) => {
      this.barbers = barbers;
    })

  }

  setTimeToDate(timeToSet: serviceTime): any {
    this.selected?.setHours(timeToSet.hour);
    this.selected?.setMinutes(timeToSet.minute);
    console.log(this.selected);
  }

}
