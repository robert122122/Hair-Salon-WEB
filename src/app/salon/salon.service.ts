import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
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
    return this.httpService.get<Service[]>(`https://localhost:44396/api/Service/Salon/${salonId}`)
  }
}
