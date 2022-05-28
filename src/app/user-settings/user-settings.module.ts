import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSettingsComponent } from './user-settings.component';
import { UploadComponent } from '../upload/upload.component';


@NgModule({
  declarations: [
    UserSettingsComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialExampleModule,
    MatNativeDateModule,
    UserSettingsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserSettingsModule { }
