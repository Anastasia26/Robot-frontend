import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Utils {

    constructor() {
    }

    public handleError(error): any {
        let errorMessage = '';
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
