import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'salons',
    loadChildren: () => import("./salon/salon.module").then(m => m.SalonsModule)
  },
  {
    path: '',
    loadChildren: () => import("./homepage/homepage.module").then(m => m.HomepageModule)
  },
  {
    path: '**',
    redirectTo: "",
    pathMatch: "full",

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
