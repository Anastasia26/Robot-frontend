import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BlogComponent} from './blog/blog.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from '../../core/authentication/login/login.component';
import {RegistrationComponent} from '../../core/authentication/registration/registration.component';
import {ResetComponent} from '../../core/authentication/reset/reset.component';
import {ConfirmedComponent} from '../../core/authentication/confirmed/confirmed.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'blog',
      component: BlogComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'registration',
      component: RegistrationComponent,
    },
    {
      path: 'confirmed',
      component: ConfirmedComponent,
    },
    {
      path: 'reset',
      component: ResetComponent,
    },
    ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
