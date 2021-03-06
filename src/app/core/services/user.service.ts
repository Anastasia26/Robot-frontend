import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ofType} from '@ngrx/effects';
import {ChangeQuickStatus, UserActionTypes} from '../store/actions/user.action';


@Injectable()

export class UserService {

    constructor(private http: HttpClient) {}

    register(full_name: string, email: string, password: string): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/`;
        return this.http.post<any>(url, {full_name, email, password});
    }

    activateUser(uid: string, token: string): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/activation/`;
        return this.http.post<any>(url, {uid, token});
    }

    logIn(email: string, password: string): Observable<any> {
        const url = environment.apiEndpoint + `/auth/jwt/create/`;
        return this.http.post<any>(url, {email, password});
    }

    passwordRecovery(email: string): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/reset_password/`;
        return this.http.post<any>(url, {email});
    }

    passwordReset(uid: string, token: string, new_password: string, re_new_password: string): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/reset_password_confirm/`;
        return this.http.post<any>(url, {uid, token, new_password, re_new_password});
    }
    userInfo(): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/me/`;
        return this.http.get<any>(url);
    }

    changeUserInfo(user_data: object): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/me/`;
        return this.http.patch<any>(url, user_data);
    }

    refreshToken(refresh: string): Observable<any> {
        const url = environment.apiEndpoint + `/auth/jwt/refresh/`;
        return this.http.post<any>(url, {refresh});
    }

    userPasswordReset(password_data: object): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/set_password/`;
        return this.http.post<any>(url, password_data);
    }

    userEmailReset(email_data: object): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/set_email/`;
        return this.http.post<any>(url, email_data);
    }

    changeQuickStatus(quick_stats: boolean): Observable<any> {
        const url = environment.apiEndpoint + `/auth/users/me/`;
        return this.http.patch<any>(url, {use_quick_stats: quick_stats});
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(environment.apiEndpoint + `/auth/users/${id}/`);
    }
}
