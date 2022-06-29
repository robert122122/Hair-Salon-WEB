import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barber, BarberPost, BarberPut } from './barber';

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  constructor(private httpService: HttpClient) { }

  getBarbersBySalon(salonId: number): Observable<Barber[]>{
    return this.httpService.get<Barber[]>(`https://localhost:44396/api/Barber/Salon/${salonId}`);
  }

  addBarber(barber: BarberPost): Observable<BarberPost> {
    return this.httpService.post<BarberPost>('https://localhost:44396/api/Barber', barber);
  }

  updateBarber(barber: BarberPut, barberId: number): Observable<Barber> {
    return this.httpService.put<Barber>(`https://localhost:44396/api/Barber/${barberId}`, barber);
  }
  
  deleteBarber(barberId: number): Observable<Barber> {
    return this.httpService.delete<Barber>(`https://localhost:44396/api/Barber/${barberId}`);
  }
}
