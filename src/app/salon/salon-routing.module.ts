import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalonDetailsComponent } from './salon-details/salon-details.component';
import { SalonsComponent } from './salons/salons.component';

const routes: Routes = [
  { 
    path: 'detail/:id',
    component: SalonDetailsComponent
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
