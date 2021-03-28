import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserState, selectUserState} from '../../../core/store/state/user.state';
import {UserInfo, LogOut} from '../../../core/store/actions/user.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topline',
  templateUrl: './topline.component.html',
  styleUrls: ['./topline.component.css']
})
export class ToplineComponent implements OnInit {
  getState: Observable<any>;
  errorMessage: string | null;
  user: object;
  isAuthenticated: boolean;

  constructor(private store: Store<UserState>, private router: Router) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state;
    });
  }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    if (accessToken && refreshToken) {
      this.store.dispatch(new UserInfo());
    }
  }

  logout(): any {
    this.store.dispatch(new LogOut());
    this.router.navigateByUrl('/');
  }
}
