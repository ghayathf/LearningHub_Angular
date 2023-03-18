import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path : '',
    loadChildren : () => import('./home/home.module').then(x => x.HomeModule)
  },
  {
    path: 'Auth',
    loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  },
  {
    path: 'Admin',
    loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'Trainer',
    loadChildren: () => import('./trainer/trainer.module').then(x => x.TrainerModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'Trainee',
    loadChildren: () => import('./trainee/trainee.module').then(x => x.TraineeModule),
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
