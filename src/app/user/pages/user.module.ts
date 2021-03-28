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
import { AlertContactsComponent } from './settings/alert-contacts/alert-contacts.component';
import { AccountProfileComponent } from './settings/account-profile/account-profile.component';
import {UserDashboardService} from './services/user-dashboard.service';
import {TreeModule} from 'primeng/tree';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';
import {InputSwitchModule} from 'primeng/inputswitch';



@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    UserDashboardComponent,
    DeleteComponent,
    SettingsComponent,
    SearchSidebarComponent,
    AlertContactsComponent,
    AccountProfileComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        RouterModule,
        UserRoutingModule,
        TreeModule,
        ButtonModule,
        InputSwitchModule,
        FormsModule,
        AccordionModule,
    ],
  exports: [
    UserComponent,
  ],
  providers: [UserDashboardService]
})
export class UserModule { }
