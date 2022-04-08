import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Barber } from './barber';
import { Booking, BookingResponse } from './booking';
import { Review } from './salon-details/review';
import { Salon } from './salons/salon';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(private httpService: HttpClient) { }

  getSalons(): Observable<Salon[]> {
    return this.httpService.get<Salon[]>('https://localhost:44396/api/Salon');
  }

  getSalon(id: number): Observable<Salon> {
    return this.httpService.get<Salon>(`https://localhost:44396/api/Salon/${id}`);
  }

  getServicesBySalon(salonId: number): Observable<Service[]>{
    return this.httpService.get<Service[]>(`https://localhost:44396/api/Service/Salon/${salonId}`);
  }

  getReviewsBySalon(salonId: number): Observable<Review[]>{
    return this.httpService.get<Review[]>(`https://localhost:44396/api/Review/Salon/${salonId}`);
  }

  getBarbersBySalon(salonId: number): Observable<Barber[]>{
    return this.httpService.get<Barber[]>(`https://localhost:44396/api/Barber/Salon/${salonId}`);
  }

  bookAppointment(booking: Booking): Observable<BookingResponse>{
    return this.httpService.post<BookingResponse>(`https://localhost:44396/api/Booking`, booking);
  }
}
