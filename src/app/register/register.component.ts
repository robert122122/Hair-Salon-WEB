import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { SalonPost } from '../salon/salons/salon';
import { RegisterRequest } from './register';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegistration: RegisterRequest = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  }

  salonRegistration: SalonPost = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  }

  role: string = '';

  confirmedPassword: string = "";

  constructor(private alertService: AlertService, private registerService: RegisterService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role')!;
  }


  images = ["https://images.squarespace-cdn.com/content/v1/5edee990a8696a7b8618fe6d/1592794368345-KP26O2DQ6O0SR8N0KOTN/DomMiguelPhotography6164+copy.jpg?format=2500w", "https://drive.google.com/uc?export=view&id=1W2Xr0IjbY2ptQ1NSQTgHmhWgLFIGnlBn", "https://drive.google.com/uc?export=view&id=1yPSclIuTaFqgTPNuUN-s5APXNlqVMutd"];

  register(): void {
    if (this.validateRegister()) {
      this.registerService.register(this.userRegistration).subscribe({
        next: () => {
          this.alertService.alertSuccess("Your account is ready!");
          this.router.navigate(["/login"]);
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.alertError(err.error.message);
        }
      })
    }
    else
      this.alertService.alertError("Error");
    return;
  }

  salonRegister(): void {
    if(this.confirmedPassword == this.salonRegistration.password)
    { 
      this.registerService.salonRegister(this.salonRegistration).subscribe({
        next: () => {
          this.alertService.alertSuccess("Your Salon is registered!")
          this.router.navigate(["/login"]);
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.alertError(err.error.message);
        }
      })
    }
    else{
      this.alertService.alertError("Passwords does not match!");
    }

  }

  validateRegister(): boolean {
    if (this.userRegistration.firstName.length && this.userRegistration.lastName.length > 3 && this.userRegistration.phoneNumber.length > 9 && this.userRegistration.email.indexOf("@") != -1 && this.userRegistration.password == this.confirmedPassword) {
      return true;
    }
    return false;
  }
}
