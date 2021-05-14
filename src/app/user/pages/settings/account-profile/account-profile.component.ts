import {Component, Directive, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {
  ChangeUserInfo, DashboardEmailReset,
  DashboardPasswordReset, DeleteUser,
  UserActionTypes
} from '../../../../core/store/actions/user.action';
import {takeUntil} from 'rxjs/operators';
import {MustMatch} from '../../../../core/helpers/must-match.validator';
import {GetTimeZones} from "../../../../core/store/actions/user-info.action";
@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
@Directive({
  selector: '[clickOutside]'
})
export class AccountProfileComponent implements OnInit {
  form: FormGroup;
  resetPassForm: FormGroup;
  resetEmailForm: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;
  private loading: boolean;
  private pass_loading: boolean;
  private email_loading: boolean;
  destroyed$ = new Subject<boolean>();
  destroyedPass$ = new Subject<boolean>();
  timezone: any[];
  selectedTimezone = null;
  userInfo: any[];
  menuDeletePosition =  {visibility: 'hidden'};
  public numberForDelete: number;
  public anotherNumberForDelete: number;
  rusultNum: number;
  constructor(private actions: Actions, private store: Store<UserState>, private formBuilder: FormBuilder) {
    this.getState = this.store.select(selectUserState);
    actions.pipe(ofType(UserActionTypes.SAVEUSER), takeUntil(this.destroyed$)).subscribe(() => {
        this.loading = false;
    });
    actions.pipe(ofType(UserActionTypes.CHANGE_USER_PASSWORD), takeUntil(this.destroyedPass$)).subscribe(() => {
      this.pass_loading = false;
      this.resetPassForm.reset();
    });
    actions.pipe(ofType(UserActionTypes.CHANGE_USER_EMAIL), takeUntil(this.destroyedPass$)).subscribe(() => {
      this.email_loading = false;
      this.resetEmailForm.reset();
    });
    this.getState.subscribe((state) => {
      this.userInfo = state.user;
      this.timezone = state.timeZones;
      this.errorMessage = state.errorMessage;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTimeZones());
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      timezone: new FormControl(this.selectedTimezone, [Validators.required]),
    });
    this.resetPassForm = this.formBuilder.group({
      currentPass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPass: new FormControl('', [Validators.required]),
    }, {
      validator: MustMatch('password', 'confirmPass')
    });
    this.resetEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }


  submitUserForm(): any {
    this.loading = true;
    const payload = {
      full_name	: this.form.value.name,
      timezone: this.form.value.timezone.name,
    };
   this.store.dispatch(new ChangeUserInfo(payload));
  }

  submitPasswordReset(): any {
    this.pass_loading = true;
    const routePassParams = {
        new_password: this.resetPassForm.value.password,
        re_new_password: this.resetPassForm.value.confirmPass,
        current_password: this.resetPassForm.value.currentPass
    };
    this.store.dispatch(new DashboardPasswordReset(routePassParams));
  }

  submitEmailReset(): any {
    this.email_loading = true;
    const routeEmailParams = {
      current_password: this.resetEmailForm.value.password,
      new_email: this.resetEmailForm.value.email,
    };
    this.store.dispatch(new DashboardEmailReset(routeEmailParams));
  }

  OpenDeleteMenu(e): any {
    this.numberForDelete = Math.floor(Math.random() * 10);
    this.anotherNumberForDelete = Math.floor(Math.random() * 10);
    e.preventDefault();
    this.menuDeletePosition.visibility = 'visible !important';
  }

  deleteUser(firstNumber, secondNumber, userResult, id): any {
    this.rusultNum = null;
    const trueValue = firstNumber + secondNumber;
    const userValue = parseInt(userResult, 10);
    if (userValue === trueValue) {
      this.store.dispatch(new DeleteUser(id));
    }
  }

  hideMenu(exists): any {
    if (!exists) {
      this.menuDeletePosition.visibility = 'hidden !important';
    }
  }
}
