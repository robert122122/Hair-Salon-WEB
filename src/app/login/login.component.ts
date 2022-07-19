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

  isRoleChecked = false;

  userRole: string = '';

  loginRequest: LoginRequest = {
    email: "",
    password: ""
  }

  constructor(private alertService: AlertService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  images = ["https://images.squarespace-cdn.com/content/v1/5edee990a8696a7b8618fe6d/1592794368345-KP26O2DQ6O0SR8N0KOTN/DomMiguelPhotography6164+copy.jpg?format=2500w", "https://drive.google.com/uc?export=view&id=1W2Xr0IjbY2ptQ1NSQTgHmhWgLFIGnlBn", "https://drive.google.com/uc?export=view&id=1yPSclIuTaFqgTPNuUN-s5APXNlqVMutd"];

  login() {
    if (this.isRoleChecked == true) {
      this.userRole = "Salon";
    }
    else {
      this.userRole = "User";
    }

    this.loginService.login(this.loginRequest, this.userRole).subscribe({
      next: (response: LoginResponse) => {
        const token = response.token;
        localStorage.setItem("jwt", token);
        localStorage.setItem("userId", response.id.toString());

        this.invalidLogin = false;
        this.router.navigate(["/salons"]);
        this.alertService.alertSuccess("Wellcome!");
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.alertError("Email or Password incorrect!");
        this.invalidLogin = true;
      }
    })

  }
}

