import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressDTO, AddressPost } from './address';
import { Booking, BookingGet, BookingResponse } from './booking';
import { Address, Salon, SalonDTO, SalonPut } from './salons/salon';

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

  getSimpleSalon(id: number): Observable<SalonDTO> {
    return this.httpService.get<SalonDTO>(`https://localhost:44396/api/Salon/${id}`);
  }

  bookAppointment(booking: Booking): Observable<BookingResponse>{
    return this.httpService.post<BookingResponse>(`https://localhost:44396/api/Booking`, booking);
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

  updateSalon(salonId: number, salon: SalonPut): Observable<SalonDTO> {
    return this.httpService.put<SalonDTO>(`https://localhost:44396/api/Salon/${salonId}`, salon);
  }

  addAddress(address:AddressPost): Observable<AddressDTO> {
    return this.httpService.post<AddressDTO>(`https://localhost:44396/api/Address`, address);
  }

  updateSalonAddress(addressId: number, salonId: number, data:any): Observable<Salon> {
    return this.httpService.put<Salon>(`https://localhost:44396/api/Salon/${addressId}/${salonId}`, data);
  }

  getAddress(addressId: number): Observable<Address> {
    return this.httpService.get<Address>(`https://localhost:44396/api/Address/${addressId}`);
  }
}
