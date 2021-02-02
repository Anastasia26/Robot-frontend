import {All, UserActionTypes} from '../actions/user.action';
import {User} from '../../models/user.model';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // is a user activated?
    isActivate: boolean;
    // if authenticated, there should be a user object
    user: User;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    isActivate: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case UserActionTypes.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                isActivate: false,
                errorMessage: null
            };
        }
        case UserActionTypes.ERRORS_FAILURE_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload.error
            };
        }
        case UserActionTypes.CLEAR_ERRORS_FAILURE_MESSAGE: {
            return {
                ...state,
                errorMessage: null
            };
        }
        case UserActionTypes.SAVEUSER: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                isActivate: true,
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}
