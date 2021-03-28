import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  template: `
      <div class="dashboard">
        <div class="personal">
          <div class="header">
            <app-topline></app-topline>
            <app-header></app-header>
          </div>
        </div>
          <div class="account">
              <div class="wrapper">
                  <div class="account__left">
                      <app-search-sidebar></app-search-sidebar>
                  </div>
                  <div class="account__right">
                      <router-outlet></router-outlet>
                  </div>
              </div>
          </div>
          <app-footer></app-footer>
      </div>
  `,
   styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
