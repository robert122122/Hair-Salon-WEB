import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule, 
    HomepageRoutingModule,
    FormsModule,
    MaterialExampleModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],

})
export class HomepageModule { }
