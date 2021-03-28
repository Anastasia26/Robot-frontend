import { Action } from '@ngrx/store';

export enum UserActionTypes {
    REGISTER = '[User] Register',
    REGISTER_SUCCESS = '[User] Register Success',
    ACTIVATION = '[User] Activation',
    LOGIN = '[User] Login',
    LOGIN_SUCCESS = '[User] Login Success',
    LOGOUT = '[User] Logout',
    PASSWORDRECOVERY = '[User] PasswordRecovery',
    PASSWORDRECOVERY_SUCCESS = '[User] PasswordRecovery Success',
    PASSWORDRESET = '[User] PasswordReset',
    PASSWORDRESET_SUCCESS = '[User] PasswordReset Success',
    ERRORS_FAILURE_FIELDS = '[User] Fields Failure',
    ERRORS_FAILURE_MESSAGE = '[User] Message Failure',
    CLEAR_ERRORS_FAILURE_MESSAGE = '[User] Clear Message Failure',
    USERINFO = '[User] Get User Information from API',
    SAVEUSER = '[User] Save User Information',
    REFRESH_TOKEN = '[User] Refresh Token',
}

export class Register implements Action {
    readonly type = UserActionTypes.REGISTER;
    constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
    readonly type = UserActionTypes.REGISTER_SUCCESS;
    constructor(public payload: any) {}
}

export class Activation implements Action {
    readonly type = UserActionTypes.ACTIVATION;
    constructor(public payload: any) {}
}

export class LogIn implements Action {
    readonly type = UserActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
    readonly type = UserActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LogOut implements Action {
    readonly type = UserActionTypes.LOGOUT;
}

export class PasswordRecovery implements Action {
    readonly type = UserActionTypes.PASSWORDRECOVERY;
    constructor(public payload: any) {}
}

export class PasswordRecoverySuccess implements Action {
    readonly type = UserActionTypes.PASSWORDRECOVERY_SUCCESS;
    constructor(public payload: any) {}
}

export class PasswordReset implements Action {
    readonly type = UserActionTypes.PASSWORDRESET;
    constructor(public payload: any) {}
}

export class PasswordResetSuccess implements Action {
    readonly type = UserActionTypes.PASSWORDRESET_SUCCESS;
    constructor(public payload: any) {}
}

export class ErrorsFailureFields implements Action {
    readonly type = UserActionTypes.ERRORS_FAILURE_FIELDS;
    constructor(public payload: any) {}
}

export class ErrorsFailureMessage implements Action {
    readonly type = UserActionTypes.ERRORS_FAILURE_MESSAGE;
    constructor(public payload: any) {}
}

export class ClearAllFailureMessage implements Action {
    readonly type = UserActionTypes.CLEAR_ERRORS_FAILURE_MESSAGE;
}
export class UserInfo implements Action {
    readonly type = UserActionTypes.USERINFO;
}
export class SaveUser implements Action {
    readonly type = UserActionTypes.SAVEUSER;
    constructor(public payload: any) {}
}

export class RefreshToken implements Action {
    readonly type = UserActionTypes.REFRESH_TOKEN;
    constructor(public payload: any) {}
}
