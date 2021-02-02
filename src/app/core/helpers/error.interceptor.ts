import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ErrorsFailureMessage, RefreshToken} from '../store/actions/user.action';
import {Store} from '@ngrx/store';
import {UserState} from '../store/state/user.state';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store<UserState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const params = {
            refresh: localStorage.getItem('refresh')
        };
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto refresh token if 401 response returned from api
                 this.store.dispatch(new RefreshToken(params));
            }
            this.store.dispatch(new ErrorsFailureMessage(err));
            return throwError(err);
        }));
    }
}
