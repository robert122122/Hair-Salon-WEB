import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberComponent } from './barber.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BarberRoutingModule } from './barber-routing.module';
import { MaterialExampleModule } from 'src/material.module';

@NgModule({
  declarations: [
    BarberComponent,
  ],
  imports: [
    CommonModule,
    BarberRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialExampleModule,
  ]
})
export class BarberModule { }
