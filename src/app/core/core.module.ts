import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ConfirmedComponent } from './authentication/confirmed/confirmed.component';
import { ResetComponent } from './authentication/reset/reset.component';

import {UserService} from './services/user.service';
import { ActivationComponent } from './authentication/activation/activation.component';
import {AuthGuardService} from './guards/auth.guard';
import { PassrecoveryComponent } from './authentication/passrecovery/passrecovery.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ConfirmedComponent,
    ResetComponent,
    ActivationComponent,
    PassrecoveryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [UserService, AuthGuardService],
})
export class CoreModule { }
