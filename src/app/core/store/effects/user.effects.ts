import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of} from 'rxjs';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {
    Activation,
    UserActionTypes,
    LogIn,
    LogInSuccess,
    Register,
    PasswordResetSuccess,
    SaveUser, RegisterSuccess, PasswordRecoverySuccess, RefreshToken, RefreshTokenSuccess
} from '../actions/user.action';
import {Utils} from '../../classes/utils';
import {ModalsService} from '../../../shared/services/modals.service';
import {Store} from '@ngrx/store';
import {UserState} from '../state/user.state';


@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private userService: UserService,
        private router: Router,
        private helperClass: Utils,
        private modalsService: ModalsService,
        private store: Store<UserState>
    ) {}
    @Effect()
    Register: Observable<any> = this.actions.pipe(ofType(UserActionTypes.REGISTER), map((action: Register) => action.payload), switchMap(payload => {
        return this.userService.register(payload.name, payload.email, payload.password).pipe(map(() => {
            return new RegisterSuccess({});
        }));
    }));
    @Effect({ dispatch: false })
    RegisterSuccess: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.REGISTER_SUCCESS),
        tap(() => {
            this.modalsService.open('registerFinish');
        })
    );
    @Effect()
    Activation: Observable<any> = this.actions.pipe(ofType(UserActionTypes.ACTIVATION), map((action: Activation) => action.payload), switchMap(payload => {
        return this.userService.activateUser(payload.uid, payload.token);
    }));

    @Effect()
    LogIn: Observable<any> = this.actions.pipe(ofType(UserActionTypes.LOGIN), map((action: LogIn) => action.payload), switchMap(payload => {
        return this.userService.logIn(payload.email, payload.password).pipe(map((user) => {
            return new LogInSuccess({access: user.access, refresh: user.refresh});
        }));
    }));
    @Effect()
    PasswordRecovery: Observable<any> = this.actions.pipe(ofType(UserActionTypes.PASSWORDRECOVERY), map((action: Activation) => action.payload), switchMap(payload => {
        return this.userService.passwordRecovery(payload.email).pipe(map(() => {
            return new PasswordRecoverySuccess({});
        }));
    }));
    @Effect({ dispatch: false })
    PasswordRecoverySuccess: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.PASSWORDRECOVERY_SUCCESS),
        tap(() => {
            this.modalsService.open('resetPassFinish');
        })
    );
    @Effect()
    PasswordReset: Observable<any> = this.actions.pipe(ofType(UserActionTypes.PASSWORDRESET), map((action: Activation) => action.payload), switchMap(payload => {
        return this.userService.passwordReset(payload.uid, payload.token, payload.new_password, payload.re_new_password).pipe(map(() => {
            return new PasswordResetSuccess({});
        }));
    }));
    @Effect()
    UserInfo: Observable<any> = this.actions.pipe(ofType(UserActionTypes.USERINFO),  switchMap(() => {
        return this.userService.userInfo().pipe(map((payload) => {
                return new SaveUser(payload);
            })
        );
    }));
    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            if (user.payload.access && user.payload.refresh) {
                localStorage.setItem('access', user.payload.access);
                localStorage.setItem('refresh', user.payload.refresh);
                this.router.navigateByUrl('/user-dashboard');
            } else {
                return Promise.reject('Invalid Tokens!');
            }
            return user;
        })
    );
    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.LOGOUT),
        tap(() => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        })
    );

    @Effect({ dispatch: false })
    PasswordResetSuccess: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.PASSWORDRESET_SUCCESS),
        tap(() => {
            return this.router.navigateByUrl('/login');
        })
    );

    @Effect({ dispatch: false })
    ErrorsFailureMessage: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.ERRORS_FAILURE_MESSAGE),
        tap((error) => {
            this.helperClass.handleError(error.payload);
        })
    );

    @Effect()
    RefreshToken: Observable<any> = this.actions.pipe(ofType(UserActionTypes.REFRESH_TOKEN), map((action: RefreshToken) => action.payload), switchMap(payload => {
        return this.userService.refreshToken(payload.refresh).pipe(map((user) => {
            return new RefreshTokenSuccess({access: user.access});
        }));
    }));

    @Effect({ dispatch: false })
    RefreshTokenSuccess: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.REFRESH_SUCCESS),
        tap((user) => {
            if (user.payload.access) {
                localStorage.setItem('access', user.payload.access);
                window.location.reload();
            } else {
                this.store.dispatch({ type: 'LOGOUT' });
            }
            return user;
        })
    );
}
