import {UserActionTypes} from '../actions/user.action';
import {User} from '../../models/user.model';
import {UserInfoActionTypes} from '../actions/user-info.action';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // is a user activated?
    isActivate: boolean;
    // if authenticated, there should be a user object
    user: User;

    alertInfo?: any;
    domainsInfo?: any;
    resetStatuses?: any;
    ipAddresses?: any;
    ipSettings?: any;
    fastPortScanId?: any;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    isActivate: false,
    user: null,
    alertInfo: null,
    domainsInfo: null,
    resetStatuses: null,
    ipAddresses: null,
    ipSettings: null,
    fastPortScanId: null,
    errorMessage: null
};

export function deleteItems(array, ids) {
    let result = [];
    for (let item of array) {
        if (!ids.includes(item.id)) {
            result.push({
                ...item,
                subdomains: deleteItems(item.subdomains, ids),
            });
        }
    }
    return result;
}

export function reducer(state = initialState, action): State {
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
        case UserInfoActionTypes.SAVE_ALERT_CONTACTS: {
            return {
                ...state,
                alertInfo: action.payload,
                errorMessage: null
            };
        }
        case UserInfoActionTypes.UPDATE_ALERT_CONTACTS: {
            return {
                ...state,
                alertInfo: state.alertInfo.map(info => {
                    if (info.id === parseInt(action.payload.id, 10)) {
                        return {...info, email: action.payload.email.email ? action.payload.email.email : null};
                    } else {
                        return info;
                    }
                }),
                errorMessage: null
            };
        }

        case UserInfoActionTypes.SAVE_DOMAINS_LIST: {
            return {
                ...state,
                domainsInfo: action.payload,
                errorMessage: null
            };
        }

        case UserInfoActionTypes.UPDATE_DOMAINS_LIST: {
            return {
                ...state,
                domainsInfo: deleteItems(state.domainsInfo, [parseInt(action.payload.id, 10)]),
                errorMessage: null
            };
        }

        case UserInfoActionTypes.SAVE_RESETS_LIST: {
            return {
                ...state,
                resetStatuses: action.payload,
                errorMessage: null
            };
        }

        case UserInfoActionTypes.UPDATE_RESET_DOMAINS_LIST: {
            return {
                ...state,
                resetStatuses: action.payload,
                errorMessage: null
            };
        }

        case UserInfoActionTypes.SAVE_IP_ADDRESSES_LIST: {
            return {
                ...state,
                ipAddresses: action.payload,
                errorMessage: null
            };
        }

        case UserInfoActionTypes.UPDATE_IP_SETTINGS: {
            return {
                ...state,
                ipSettings: action.payload,
                errorMessage: null
            };
        }

        case UserInfoActionTypes.GET_FAST_SCAN_ID: {
            return {
                ...state,
                fastPortScanId: action.payload,
                errorMessage: null
            };
        }

        default: {
            return state;
        }
    }
}
