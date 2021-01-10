import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-admin',
  template: `
    <div class="dashboard">
        <app-header></app-header>
        <div class="admin">
            <div class="admin__left">
            <app-sidebar></app-sidebar>
            </div>
            <div class="admin__right">
            <router-outlet></router-outlet>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
  `,
  // styleUrls: ['./footer.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
