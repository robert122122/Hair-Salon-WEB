import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSettingsComponent } from './user-settings.component';
import { UploadComponent } from '../upload/upload.component';
import { UploadModule } from '../upload/upload.module';


@NgModule({
  declarations: [
    UserSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialExampleModule,
    MatNativeDateModule,
    UserSettingsRoutingModule,
    ReactiveFormsModule,
    UploadModule
  ]
})
export class UserSettingsModule { }
