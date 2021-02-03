import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    // getUser(): Observable<any> {
    //     console.log(123123123);
    //     const url = environment.apiEndpoint + `/auth/users/me/`;
    //     return this.http.get<User>(url);
    // }
}
