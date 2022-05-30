import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, User } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }

  login(loginRequest: LoginRequest, role: string) {
    return this.httpService.post<LoginResponse>(`https://localhost:44396/api/authenticate/login?role=${role}`, loginRequest);
  }
}