import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ErrorsFailureMessage, LogOut, RefreshToken} from '../store/actions/user.action';
import {Store} from '@ngrx/store';
import {UserState} from '../store/state/user.state';

@Injectable({
    providedIn: 'root'
})

export class Utils {

    constructor(private store: Store<UserState>) {
    }

    public handleError(error): any {

        let errorMessage = '';
        const params = {
            refresh: localStorage.getItem('refresh')
        };
        if (error.status === 401) {
            // auto refresh token if 401 response returned from api
            this.store.dispatch(new RefreshToken(params));
        }
        if (error.error) {
            if (error.error.error_code) {
                errorMessage = `Http Error Code: ${error.status}: ${error.statusText}\nInternal Error Code: ${error.error.code} \nInternal Error Desc: ${error.error.details}\n Message: ${error.message}`;
            } else {
                errorMessage = `Http Error Code: ${error.status}: ${error.statusText}\nMessage: ${error.message}`;
            }
        }
        return throwError(errorMessage);
    }

}
