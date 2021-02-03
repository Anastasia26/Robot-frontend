import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import {FaqComponent} from './faq/faq.component';
import {AboutComponent} from './about/about.component';
import {BlogComponent} from './blog/blog.component';
import {SupportComponent} from './support/support.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from '../../core/authentication/login/login.component';
import {RegistrationComponent} from '../../core/authentication/registration/registration.component';
import {LocationsComponent} from './locations/locations.component';
import {PricingComponent} from './pricing/pricing.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {ResetComponent} from '../../core/authentication/reset/reset.component';
import {ConfirmedComponent} from '../../core/authentication/confirmed/confirmed.component';
import {ArticleComponent} from '../../shared/components/article/article.component';
import {ActivationComponent} from '../../core/authentication/activation/activation.component';
import {PassrecoveryComponent} from '../../core/authentication/passrecovery/passrecovery.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'faq',
      component: FaqComponent,
    },
    {
      path: 'about',
      component: AboutComponent,
    },
    {
      path: 'support',
      component: SupportComponent,
    },
    {
      path: 'blog',
      component: BlogComponent,
    },
    {
      path: 'article/:id',
      component: ArticleComponent,
    },
    {
      path: 'registration',
      component: RegistrationComponent,
    },
    {
      path: 'activation/:uid/:token',
      component: ActivationComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'passrecovery',
      component: PassrecoveryComponent,
    },
    {
      path: 'confirmed',
      component: ConfirmedComponent,
    },
    {
      path: 'resetpassword/:uid/:token',
      component: ResetComponent,
    },
    {
      path: 'locations',
      component: LocationsComponent,
    },
    {
      path: 'pricing',
      component: PricingComponent,
    },
    {
      path: 'privacy',
      component: PrivacyComponent,
    },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
