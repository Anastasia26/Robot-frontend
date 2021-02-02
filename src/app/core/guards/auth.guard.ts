import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: UserService, public router: Router) {}

    canActivate(): boolean {
        let access_token = localStorage.getItem('access');
        let refresh_token = localStorage.getItem('refresh');
        if (!access_token || !refresh_token) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
