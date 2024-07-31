import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { AuthGuard } from './master/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./master/master.module').then((m) => m.MasterModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
