import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  activeState: boolean[] = [false, false, false, false, false, false];
  constructor() { }

  ngOnInit(): void {
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

}
