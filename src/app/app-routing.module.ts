import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },

  // {
  //   path: 'singer',
  //   loadChildren: () =>
  //     import('./modules/singer/singer.module').then((m) => m.SingerModule),
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
