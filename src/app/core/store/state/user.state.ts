import { createFeatureSelector } from '@ngrx/store';

import * as user from '../reducers/user.reducer';


export interface UserState {
    userState: user.State;
}

export const reducers = {
    user: user.reducer
};

export const selectUserState = createFeatureSelector<UserState>('user');
