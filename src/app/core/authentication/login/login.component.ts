import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClearAllFailureMessage, LogIn} from '../../store/actions/user.action';
import {Store} from '@ngrx/store';
import {UserState, selectUserState} from '../../store/state/user.state';
import {Observable} from 'rxjs';
import {Actions} from '@ngrx/effects';
import {ModalsService} from '../../../shared/services/modals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private actions: Actions, private modalsService: ModalsService, private router: Router, private store: Store<UserState>) {
    this.getState = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new ClearAllFailureMessage());
  }

  submitLoginForm(): any {
    const payload = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.store.dispatch(new LogIn(payload));
  }

}
