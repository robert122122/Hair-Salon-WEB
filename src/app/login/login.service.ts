import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.httpService.post<LoginResponse>(`https://localhost:44396/api/User/authenticate`, loginRequest)}


}


