import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {forkJoin, Observable, of} from 'rxjs';
import {map, switchMap, catchError, tap, debounceTime} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {
    Activation,
    UserActionTypes,
    LogOut,
    LogIn,
    LogInSuccess,
    Register,
    PasswordResetSuccess,
    SaveUser,
    ChangeUserInfo,
    RegisterSuccess,
    PasswordRecoverySuccess,
    RefreshToken,
    ErrorsFailureMessage,
    DashboardPasswordReset,
    ChangeQuickStatus,
    DashboardEmailReset,
    DeleteUser
} from '../actions/user.action';
import {Utils} from '../../classes/utils';
import {ModalsService} from '../../../shared/services/modals.service';
import {GetQuickStatsInfo} from "../actions/user-info.action";
import {Store} from "@ngrx/store";
import {UserState} from "../state/user.state";


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
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( {...err, isAuth: true} ));
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
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( {...err, isAuth: true} ));
        }));
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
            this.router.navigateByUrl('/login');
        })
    );
    @Effect()
    PasswordRecovery: Observable<any> = this.actions.pipe(ofType(UserActionTypes.PASSWORDRECOVERY), map((action: Activation) => action.payload), switchMap(payload => {
        return this.userService.passwordRecovery(payload.email).pipe(map(() => {
            return new PasswordRecoverySuccess({});
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( {...err, isAuth: true} ));
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
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( {...err, isAuth: true} ));
        }));
    }));
    @Effect({ dispatch: false })
    PasswordResetSuccess: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.PASSWORDRESET_SUCCESS),
        tap(() => {
            return this.router.navigateByUrl('/login');
        })
    );
    @Effect()
    UserInfo: Observable<any> = this.actions.pipe(ofType(UserActionTypes.USERINFO),  switchMap(() => {
        return this.userService.userInfo().pipe(map((payload) => {
                return new SaveUser(payload);
            }), catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
    }));
    @Effect()
    ChangeUserInfo: Observable<any> = this.actions.pipe(ofType(UserActionTypes.CHANGE_USER_INFO),
        map((action: ChangeUserInfo) => action.payload),
        switchMap(payload => {
            return this.userService.changeUserInfo(payload).pipe(map((resp) => {
                return new SaveUser(resp);
            }), catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
        }));
    @Effect({ dispatch: false })
    ErrorsFailureMessage: Observable<any> = this.actions.pipe(
        ofType(UserActionTypes.ERRORS_FAILURE_MESSAGE),
        tap((error) => {
            this.helperClass.handleError(error.payload, error.payload.isAuth);
        })
    );
    @Effect()
    RefreshToken: Observable<any> = this.actions.pipe(ofType(UserActionTypes.REFRESH_TOKEN), map((action: RefreshToken) => action.payload), switchMap(payload => {
        return this.userService.refreshToken(payload.refresh).pipe(map((user) => {
            if (user.access) {
                localStorage.setItem('access', user.access);
                window.location.reload();
            }
        }), catchError(() => {
            return of(new LogOut());
        }));
    }));
    @Effect()
    DashboardPasswordReset: Observable<any> = this.actions.pipe(ofType(UserActionTypes.CHANGE_USER_PASSWORD), map((action: DashboardPasswordReset) => action.payload), switchMap(payload => {
        return this.userService.userPasswordReset(payload).pipe(
            catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    DashboardEmailReset: Observable<any> = this.actions.pipe(ofType(UserActionTypes.CHANGE_USER_EMAIL), map((action: DashboardEmailReset) => action.payload), switchMap(payload => {
        return this.userService.userEmailReset(payload).pipe(
            catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
    }));
    @Effect()
    ChangeQuickStatus: Observable<any> = this.actions.pipe(ofType(UserActionTypes.CHANGE_USER_QUICK_STATUS),
        map((action: ChangeQuickStatus) => action.payload),
        debounceTime(1000),
        switchMap(payload => {
            return this.userService.changeQuickStatus(payload).pipe(map((resp) => {
                return new SaveUser(resp);
            }), tap (() => {
                this.store.dispatch(new GetQuickStatsInfo());
                }), catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
        }));
    @Effect()
    DeleteUser: Observable<any> = this.actions.pipe(ofType(UserActionTypes.DELETE_USER), map((action: DeleteUser) => action.payload), switchMap(payload => {
        return this.userService.deleteUser(payload).pipe(
            catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
    }));
}
