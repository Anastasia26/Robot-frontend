import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.component';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {AdminModule} from './admin/pages/admin.module';
import {MainModule} from './main/pages/main.module';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/pages/user.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MainModule,
    AdminModule,
    SharedModule,
    UserModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
