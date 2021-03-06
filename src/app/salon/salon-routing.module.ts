import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SalonDetailsComponent } from './salon-details/salon-details.component';
import { SalonSettingsComponent } from './salon-settings/salon-settings.component';
import { SalonsComponent } from './salons/salons.component';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: SalonDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'salon-settings',
    component: SalonSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: SalonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalonRoutingModule { }
