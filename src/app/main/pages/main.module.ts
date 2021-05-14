import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../../core/core.module';
import {RouterModule} from '@angular/router';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import {MainComponent} from './main.component';
import {AboutComponent} from './about/about.component';
import {BlogComponent} from './blog/blog.component';
import {FaqComponent} from './faq/faq.component';
import {SupportComponent} from './support/support.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LocationsComponent } from './locations/locations.component';
import { PricingComponent } from './pricing/pricing.component';
import { ArticleComponent } from '../../shared/components/article/article.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {AccordionModule} from "primeng/accordion";
import {ButtonModule} from "primeng/button";



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
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    MainRoutingModule,
    AccordionModule,
    ButtonModule,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    MainComponent
  ]
})
export class MainModule { }
