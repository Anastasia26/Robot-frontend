import {forkJoin, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {RefreshToken} from '../store/actions/user.action';
import {Store} from '@ngrx/store';
import {UserState} from '../store/state/user.state';
import {environment} from "../../../environments/environment";
import {UpdateIpInfo} from "../store/actions/user-info.action";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class Utils {

    constructor(private store: Store<UserState>, private http: HttpClient) {
    }

    public handleError(error, isAuth): any {

        let errorMessage = '';
        const params = {
            refresh: localStorage.getItem('refresh')
        };
        if (error.status === 401 && !isAuth) {
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

    public GetIpInformation(id): any {
        forkJoin([
            this.http.get(environment.apiEndpoint + `/monitoring/ip/${id}/statistics/http`),
            this.http.get(environment.apiEndpoint + `/monitoring/ip/${id}/statistics/https`),
            this.http.get(environment.apiEndpoint + `/monitoring/ip/${id}/statistics/ping`),
            this.http.get(environment.apiEndpoint + `/monitoring/ip/${id}/statistics/ports`),
            this.http.get(environment.apiEndpoint + `/monitoring/ip/${id}/statistics/ssl`),
            this.http.get(environment.apiEndpoint + `/monitoring/ip/${id}/settings/`),
            this.http.get(environment.apiEndpoint + `/monitoring/get-port-scan-results/${id}`)
        ]).subscribe((monitoringData) => {
            this.store.dispatch(new UpdateIpInfo({id: id, mData: monitoringData}));
        });
    }

}
