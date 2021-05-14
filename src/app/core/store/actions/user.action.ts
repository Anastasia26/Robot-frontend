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
    CHANGE_USER_INFO = '[User] Change User Information',
    REFRESH_TOKEN = '[User] Refresh Token',
    CHANGE_USER_PASSWORD = '[User] Change user password',
    CHANGE_USER_EMAIL = '[User] Change user email',
    CHANGE_USER_QUICK_STATUS = '[User] Change user quick status',
    DELETE_USER = '[User] Delete user account',
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
export class ChangeUserInfo implements Action {
    readonly type = UserActionTypes.CHANGE_USER_INFO;
    constructor(public payload: any) {}
}

export class RefreshToken implements Action {
    readonly type = UserActionTypes.REFRESH_TOKEN;
    constructor(public payload: any) {}
}

export class DashboardPasswordReset implements Action {
    readonly type = UserActionTypes.CHANGE_USER_PASSWORD;
    constructor(public payload: any) {}
}

export class DashboardEmailReset implements Action {
    readonly type = UserActionTypes.CHANGE_USER_EMAIL;
    constructor(public payload: any) {}
}

export class ChangeQuickStatus implements Action {
    readonly type = UserActionTypes.CHANGE_USER_QUICK_STATUS;
    constructor(public payload: any) {}
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DELETE_USER;
    constructor(public payload: any) {}
}