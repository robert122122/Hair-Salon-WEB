import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../alert.service';
import { LoginRequest, LoginResponse, User } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;

  loginRequest: LoginRequest = {
    email: "",
    password: ""
  }

  constructor(private alertService: AlertService,
    private loginService: LoginService,
    private router: Router,
    private httpService: HttpClient
  ) { }

  ngOnInit(): void {
  }


  images = ["https://images.squarespace-cdn.com/content/v1/5edee990a8696a7b8618fe6d/1592794368345-KP26O2DQ6O0SR8N0KOTN/DomMiguelPhotography6164+copy.jpg?format=2500w", "https://drive.google.com/uc?export=view&id=1W2Xr0IjbY2ptQ1NSQTgHmhWgLFIGnlBn", "https://drive.google.com/uc?export=view&id=1yPSclIuTaFqgTPNuUN-s5APXNlqVMutd"];

  login() {
    this.loginService.login(this.loginRequest).subscribe({
      next: (response: LoginResponse) => {
        const token = response.token;
        localStorage.setItem("jwt", token); 
        localStorage.setItem("userId", response.id.toString());

        this.invalidLogin = false; 
        this.router.navigate(["/salons"]);
      },
      error: (err: HttpErrorResponse) => this.invalidLogin = true
    })

    // this.httpService.post<LoginResponse>("https://localhost:44396/api/authenticate/login", this.loginRequest, {
    //   headers: new HttpHeaders({ "Content-Type": "application/json"})
    // })
    // .subscribe({
    //   next: (response: LoginResponse) => {
    //     const token = response.token;
    //     localStorage.setItem("jwt", token); 
    //     localStorage.setItem("userId", response.id.toString());

    //     this.invalidLogin = false; 
    //     this.router.navigate(["/salons"]);
    //   },
    //   error: (err: HttpErrorResponse) => this.invalidLogin = true
    // })

  }
}

