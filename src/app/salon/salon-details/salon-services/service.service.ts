import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, ServicePost, ServicePut } from './service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpService: HttpClient) { }

  getServicesBySalon(salonId: number): Observable<Service[]>{
    return this.httpService.get<Service[]>(`https://localhost:44396/api/Service/Salon/${salonId}`);
  }

  addService(service: ServicePost): Observable<ServicePost> {
    return this.httpService.post<ServicePost>('https://localhost:44396/api/Service', service);
  }

  updateService(service: ServicePut, serviceId: number): Observable<Service> {
    return this.httpService.put<Service>(`https://localhost:44396/api/Service/${serviceId}`, service);
  }

  deleteService(serviceId: number): Observable<Service> {
    return this.httpService.delete<Service>(`https://localhost:44396/api/Service/${serviceId}`);
  }
}
