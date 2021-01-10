import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  template: `
      <app-header></app-header>
      <div class="page">
          <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
  `,
  // styleUrls: ['./footer.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
