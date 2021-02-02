import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClearAllFailureMessage, PasswordReset} from '../../store/actions/user.action';
import {Store} from '@ngrx/store';
import {UserState, selectUserState} from '../../store/state/user.state';
import {Observable} from 'rxjs';
import {MustMatch} from '../../helpers/must-match.validator';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  uid: string;
  token: string;
  form: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;
  modalID: string = 'resetPasswordFinish';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private store: Store<UserState>) {
    this.getState = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPass: new FormControl('', [Validators.required]),
    }, {
      validator: MustMatch('password', 'confirmPass')
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new ClearAllFailureMessage());
  }

  submitPasswordReset(): any {
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      this.token = params['token'];
      const routeParams = {
        uid: this.uid,
        token: this.token,
        new_password: this.form.value.password,
        re_new_password: this.form.value.confirmPass
      };
      this.store.dispatch(new PasswordReset(routeParams));
    });
  }

  closeResetPassword(): any {
    this.router.navigateByUrl('/login');
  }

}
