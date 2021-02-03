import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  template: `
      <div class="header">
          <app-topline></app-topline>
          <app-header></app-header>
      </div>
      <div class="page">
          <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
  `,
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
