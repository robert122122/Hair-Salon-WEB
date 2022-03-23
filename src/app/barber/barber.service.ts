import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  private barberUrl = 'https://localhost:44396/api/Barber';

  constructor(private http: HttpClient) { }


}
