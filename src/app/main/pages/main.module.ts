import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from './main.component';
import {AboutComponent} from './about/about.component';
import {BlogComponent} from './blog/blog.component';
import {FaqComponent} from './faq/faq.component';
import {SupportComponent} from './support/support.component';
import {CoreModule} from '../../core/core.module';
import {RouterModule} from '@angular/router';
import {MainRoutingModule} from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LocationsComponent } from './locations/locations.component';
import { PricingComponent } from './pricing/pricing.component';
import { ArticleComponent } from './article/article.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    BlogComponent,
    FaqComponent,
    SupportComponent,
    HomeComponent,
    LocationsComponent,
    PrivacyComponent,
    LocationsComponent,
    PricingComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    MainRoutingModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
