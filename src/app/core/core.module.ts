import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ConfirmedComponent } from './authentication/confirmed/confirmed.component';
import { ResetComponent } from './authentication/reset/reset.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ConfirmedComponent,
    ResetComponent,
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
})
export class CoreModule { }
