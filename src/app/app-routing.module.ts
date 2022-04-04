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
    path: 'login',
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import("./register/register.module").then(m => m.RegisterModule)
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
