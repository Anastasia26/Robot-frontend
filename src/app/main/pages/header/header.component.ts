import {Component, Directive, EventEmitter, OnInit, Output} from '@angular/core';
import {state, trigger, animate, style, transition} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
@Directive({
  selector: '[clickOutside]'
})
export class HeaderComponent implements OnInit {
  menuTopLeftPosition =  {visibility: 'hidden'};
  @Output() clickChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  openMobMenu() {
    this.menuTopLeftPosition =  {visibility: 'visible'};
  }
  hideMenu(exists): any {
    if (!exists) {
      this.menuTopLeftPosition.visibility = 'hidden';
    }
  }

}
