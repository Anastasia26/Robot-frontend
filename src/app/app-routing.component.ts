import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {NotFoundComponent} from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/pages/main.module').then(m => m.MainModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/pages/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/pages/user.module').then(m => m.UserModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
