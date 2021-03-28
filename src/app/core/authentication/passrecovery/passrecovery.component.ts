import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {ModalsService} from '../../../shared/services/modals.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {UserState, selectUserState} from '../../store/state/user.state';
import {UserActionTypes, ClearAllFailureMessage, PasswordRecovery} from '../../store/actions/user.action';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-passrecovery',
  templateUrl: './passrecovery.component.html',
  styleUrls: ['./passrecovery.component.css']
})
export class PassrecoveryComponent implements OnInit {
  form: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;
  private loading: boolean;
  constructor(private actions: Actions, private modalsService: ModalsService, private router: Router, private store: Store<UserState>) {
    this.getState = this.store.select(selectUserState);
    this.errorMessage = null;
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new ClearAllFailureMessage());
  }

  submitPasswordRecovery(): any {
    this.loading = true;
    const payload = {
      email: this.form.value.email
    };
    this.store.dispatch(new PasswordRecovery(payload));
    this.actions.pipe(ofType(UserActionTypes.ERRORS_FAILURE_MESSAGE))
        .subscribe(() => {
          this.loading = false;
        });
  }

  closeResetPassword(): any {
    this.form.reset();
  }

}
