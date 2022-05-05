import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpService: HttpClient) { }

  register(registerRequest: RegisterRequest) { 
    return this.httpService.post(`https://localhost:44396/api/User`, registerRequest)}

}
