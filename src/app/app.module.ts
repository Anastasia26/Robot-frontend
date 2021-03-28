import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AppRoutingModule} from './app-routing.component';
import {CoreModule} from './core/core.module';
import {AdminModule} from './admin/pages/admin.module';
import {MainModule} from './main/pages/main.module';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/pages/user.module';
import {ArticleService} from './shared/services/article.service';
import { AppComponent } from './app.component';
import {reducers} from './core/store/state/user.state';
import {UserEffects} from './core/store/effects/user.effects';
import {UserInfoEffects} from './core/store/effects/user-info.effects';
import {JwtInterceptor} from './core/helpers/jwt.interceptor';
import {ErrorInterceptor} from './core/helpers/error.interceptor';
import {TreeModule} from 'primeng/tree';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    CoreModule,
    MainModule,
    AdminModule,
    SharedModule,
    UserModule,
    TreeModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([UserEffects, UserInfoEffects]),
  ],
  exports: [RouterModule],
  providers: [ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
