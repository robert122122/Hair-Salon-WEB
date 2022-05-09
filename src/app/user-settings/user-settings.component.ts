import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Booking, BookingGet } from '../salon/booking';
import { SalonService } from '../salon/salon.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  bookings: BookingGet [] = [];

  pipe = new DatePipe('en-US');

  constructor(private salonService: SalonService) { }

  ngOnInit(): void {
    this.salonService.getBookingsByUserWithDetails(4).subscribe((bookings: BookingGet[]) =>{
      this.bookings = bookings;
      this.dataSource = this.bookings;

      console.log(bookings);
    })
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