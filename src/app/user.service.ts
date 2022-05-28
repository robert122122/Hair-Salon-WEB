import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user-settings/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }

  getUserDetails(): Observable<User> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.httpService.get<User>(`https://localhost:44396/api/User/${parseInt(localStorage.getItem('userId')!)}`, {headers: headers});
  }

  updateUser(updatedUser: User): Observable<User>{
    return this.httpService.put<User>(`https://localhost:44396/api/User/${parseInt(localStorage.getItem('userId')!)}`, updatedUser);
  }
  
}
