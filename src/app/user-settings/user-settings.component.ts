import { Component, OnInit } from '@angular/core';
import { Booking } from '../salon/booking';
import { SalonService } from '../salon/salon.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  bookings: Booking [] = [];

  constructor(private salonService: SalonService) { }

  ngOnInit(): void {
    this.salonService.getBookingsByUser(2).subscribe((bookings: Booking[]) =>{
      this.bookings = bookings;
      console.log(bookings);
    })
  }

}