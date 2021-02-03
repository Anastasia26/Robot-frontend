import { Component, OnInit } from '@angular/core';
import {state, trigger, animate, style, transition} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ display: 'block'})),
      state('false', style({ display: 'none' })),
      transition('false <=> true', [ animate(500) ]),
    ])
  ]
})
export class HeaderComponent implements OnInit {
  isOpen = false;

  openMobMenu() {
    this.isOpen = !this.isOpen;
  }
  constructor() { }

  ngOnInit(): void {
  }


}
