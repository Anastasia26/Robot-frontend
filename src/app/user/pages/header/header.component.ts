import { Component, OnInit } from '@angular/core';
import {LogOut} from '../../../core/store/actions/user.action';
import {Store} from '@ngrx/store';
import {UserState, selectUserState} from '../../../core/store/state/user.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  getState: Observable<any>;
  constructor(private store: Store<UserState>) {
    this.getState = this.store.select(selectUserState);
  }

  ngOnInit(): void {
  }

}
