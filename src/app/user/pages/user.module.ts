import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component';
import {CoreModule} from '../../core/core.module';
import {RouterModule} from '@angular/router';
import {UserRoutingModule} from './user-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DeleteComponent } from './delete/delete.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    UserDashboardComponent,
    DeleteComponent,
    SettingsComponent,
    SearchSidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
