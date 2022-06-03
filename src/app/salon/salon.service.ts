import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Barber, BarberPost, BarberPut } from './salon-details/salon-barbers/barber';
import { Booking, BookingGet, BookingResponse } from './booking';
import { Review, ReviewPost } from './salon-details/review';
import { Salon, SalonPut } from './salons/salon';
import { Service, ServicePost, ServicePut } from './salon-details/salon-services/service';

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

  addReview(review: ReviewPost): Observable<ReviewPost> {
    return this.httpService.post<ReviewPost>('https://localhost:44396/api/Review', review);
  }

  addBarber(barber: BarberPost): Observable<BarberPost> {
    return this.httpService.post<BarberPost>('https://localhost:44396/api/Barber', barber);
  }

  addService(service: ServicePost): Observable<ServicePost> {
    return this.httpService.post<ServicePost>('https://localhost:44396/api/Service', service);
  }

  updateBarber(barber: BarberPut, barberId: number): Observable<Barber> {
    return this.httpService.put<Barber>(`https://localhost:44396/api/Barber/${barberId}`, barber);
  }

  updateService(service: ServicePut, serviceId: number): Observable<Service> {
    return this.httpService.put<Service>(`https://localhost:44396/api/Service/${serviceId}`, service);
  }

  deleteBarber(barberId: number): Observable<Barber> {
    return this.httpService.delete<Barber>(`https://localhost:44396/api/Barber/${barberId}`);
  }

  deleteService(serviceId: number): Observable<Service> {
    return this.httpService.delete<Service>(`https://localhost:44396/api/Service/${serviceId}`);
  }

  getBookingsByUser(userId: number): Observable<Booking[]>{
    return this.httpService.get<Booking[]>(`https://localhost:44396/api/Booking/User/${userId}`);
  }

  getBookingsBySalon(salonId: number): Observable<BookingGet[]>{
    return this.httpService.get<BookingGet[]>(`https://localhost:44396/api/Booking/Salon/${salonId}`);
  }

  getBookingsByUserWithDetails(userId: number): Observable<BookingGet[]>{
    return this.httpService.get<BookingGet[]>(`https://localhost:44396/api/Booking/User/${userId}`);
  }

  updateSalon(salon: SalonPut, salonId: number): Observable<Salon> {
    return this.httpService.put<Salon>(`https://localhost:44396/api/Salon/${salonId}`, salon);
  }
}
