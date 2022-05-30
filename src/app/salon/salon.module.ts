import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonRoutingModule } from './salon-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SalonsComponent } from './salons/salons.component';
import { SalonDetailsComponent } from './salon-details/salon-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalonServicesComponent } from './salon-details/salon-services/salon-services.component';
import { SalonBarbersComponent } from './salon-details/salon-barbers/salon-barbers.component';
import { SalonDescriptionComponent } from './salon-details/salon-description/salon-description.component';
import { SalonReviewsComponent } from './salon-details/salon-reviews/salon-reviews.component';
import { AddReviewDialogComponent } from './salon-details/salon-reviews/add-review-dialog/add-review-dialog.component';
import { SalonSettingsComponent } from './salon-settings/salon-settings.component';


@NgModule({
  declarations: [
    SalonsComponent,
    SalonDetailsComponent,
    SalonServicesComponent,
    SalonBarbersComponent,
    SalonDescriptionComponent,
    SalonReviewsComponent,
    SalonSettingsComponent,
    AddReviewDialogComponent
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
