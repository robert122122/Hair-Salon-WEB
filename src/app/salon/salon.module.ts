import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonRoutingModule } from './salon-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SalonsComponent } from './salons/salons.component';
import { SalonDetailsComponent } from './salon-details/salon-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SalonsComponent,
    SalonDetailsComponent
  ],
  imports: [
    CommonModule,
    SalonRoutingModule,
    FormsModule,
    MaterialExampleModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SalonsModule { }
