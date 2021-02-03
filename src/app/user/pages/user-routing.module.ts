import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import {LoginComponent} from '../../core/authentication/login/login.component';
import {RegistrationComponent} from '../../core/authentication/registration/registration.component';
import {ResetComponent} from '../../core/authentication/reset/reset.component';
import {ConfirmedComponent} from '../../core/authentication/confirmed/confirmed.component';
import {SettingsComponent} from './settings/settings.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {DeleteComponent} from './delete/delete.component';
import {AuthGuardService} from '../../core/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  canActivate: [ AuthGuardService ],
  children: [
    {
      path: 'user-dashboard',
      component: UserDashboardComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
    {
      path: 'delete-user',
      component: DeleteComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
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
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
