import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {UserService} from '../../services/user.service';
import {UserState, selectUserState} from '../../store/state/user.state';
import {ClearAllFailureMessage, Register, UserActionTypes} from '../../store/actions/user.action';
import {takeUntil, tap} from 'rxjs/operators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;
  private loading: boolean;
  constructor(private actions: Actions, private store: Store<UserState>, private authenticationService: UserService, private router: Router) {
    this.getState = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      accept: new FormControl(true, [Validators.requiredTrue]),
      recaptcha: new FormControl(null),
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new ClearAllFailureMessage());
  }

  submitRegisterForm(): any {
    this.loading = true;
    const payload = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.store.dispatch(new Register(payload));
    this.actions.pipe(ofType(UserActionTypes.ERRORS_FAILURE_MESSAGE), ofType(UserActionTypes.REGISTER_SUCCESS))
        .subscribe((data: any) => {
        this.loading = false;
    });
  }

  closeRegisterForm(): any {
    this.router.navigateByUrl('/');
  }
}
