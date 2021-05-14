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
    domainDetails?: any;
    fastPortScanResults?: any;
    monitoringEvents?: any;
    quickStats?: any;
    blogPosts?: any;
    timeZones?: any;
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
    domainDetails: [{}],
    fastPortScanResults: [{}],
    monitoringEvents: [{}],
    quickStats: null,
    blogPosts: [],
    timeZones: [],
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

        case UserInfoActionTypes.ADD_ALERT_CONTACTS: {
            return {
                ...state,
                alertInfo: [...state.alertInfo, action.payload],
                errorMessage: null
            };
        }

        case UserInfoActionTypes.UPDATE_ALERT_CONTACTS: {
            return {
                ...state,
                alertInfo: state.alertInfo.map(info => {
                    if (info.id === parseInt(action.payload.id, 10)) {
                        return {...info, email: action.payload.email ? action.payload.email : null,
                            is_active: action.payload.is_active ? action.payload.is_active : false
                        };
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

        case UserInfoActionTypes.ADD_DOMAINS_ITEM: {
            return {
                ...state,
                domainsInfo: [...state.domainsInfo, action.payload[0]],
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
            let domains = [action.payload].map(domain => {
                return {...domain, ip_addresses: domain.ip_addresses.map(ipitem => {
                    return {...ipitem, loader: true};
                })
                };
            });
            return {
                ...state,
                domainDetails: domains,
                errorMessage: null
            };
        }
        case UserInfoActionTypes.UPDATE_IP_INFO: {
            return {
                ...state,
                domainDetails: state.domainDetails.map(address => {
                    let newAdresses, chartIpData, filterPortStatus, filterResult, resultFilteredPort, objItem, fastStatus, fullStatus;
                    if (address.ip_addresses.length > 0) {
                        newAdresses = address.ip_addresses.map(ipsettings => {
                            if (ipsettings.id == action.payload.id) {
                                filterPortStatus = action.payload.mData[6].filter(x => x.status === 'open');
                                resultFilteredPort = filterPortStatus.filter((port) => {
                                    return action.payload.mData[3].ports.some((currentPort) => port.number === currentPort.number );
                                });
                                filterResult = filterPortStatus.map(el => {
                                    objItem = Object.assign({}, el);
                                    resultFilteredPort.map(item => {
                                        if (item.number === el.number) {
                                           return objItem.isActive = true;
                                        }
                                    });
                                    return {...el, isActive: objItem.isActive};
                                   // return objItem;
                                });
                                chartIpData = [
                                    {
                                        'name': 'http',
                                        'series': action.payload.mData[0].http
                                    },
                                    {
                                        'name': 'https',
                                        'series': action.payload.mData[1].https
                                    },
                                    {
                                        'name': 'ping',
                                        'series': action.payload.mData[2].ping
                                    },
                                ];

                                if (!action.payload.mData[5].fast_port_scan_state) {
                                    fastStatus = false;
                                } else {
                                    fastStatus = action.payload.mData[5].fast_port_scan_state != 'done';
                                }
                                if (!action.payload.mData[5].full_port_scan_state) {
                                    fullStatus = false;
                                } else {
                                    fullStatus = action.payload.mData[5].full_port_scan_state != 'done';
                                }
                                return {...ipsettings,
                                    ports: action.payload.mData[3].ports,
                                    ssl: action.payload.mData[4].ssl,
                                    settings: ipsettings.settings ? ipsettings.settings : action.payload.mData[5],
                                    fast_status: fastStatus,
                                    full_status: fullStatus,
                                    monitorScanInfo: action.payload.mData[6],
                                    openedPorts: filterResult,
                                    chartIpResults: chartIpData,
                                    isChartIpResults: action.payload.mData[0].http.length == 0 && action.payload.mData[1].https.length == 0 && action.payload.mData[2].ping.length == 0 ? true : false,
                                    loader: false
                                };
                            } else {
                                return ipsettings;
                            }
                        });
                        return {...address, ip_addresses: newAdresses};
                    } else {
                        return address;
                    }
                }),
                errorMessage: null
            };
        }
        case UserInfoActionTypes.SAVE_MONITORING_EVENTS: {
            return {
                ...state,
                monitoringEvents: action.payload,
                errorMessage: null
            };
        }
        case UserInfoActionTypes.SAVE_QUICK_STATS_INFO: {
            return {
                ...state,
                quickStats: action.payload,
                errorMessage: null
            };
        }
        case UserInfoActionTypes.UPDATE_MONITORING_SETTINGS: {
            return {
                ...state,
                domainDetails: state.domainDetails.map(address => {
                    if (address.ip_addresses.length > 0) {
                        let newAdresses = address.ip_addresses.map(ipsettings => {
                            if (ipsettings.id == action.payload.id) {
                                return {...ipsettings,
                                    settings: action.payload.mData,
                                };
                            } else {
                                return ipsettings;
                            }
                        });
                        return {...address, ip_addresses: newAdresses, loader: false};
                    } else {
                        return address;
                    }
                }),
                errorMessage: null
            };
        }
        case UserInfoActionTypes.SAVE_SCAN_INFO: {
            return {
                ...state,
                domainDetails: state.domainDetails.map(address => {
                    if (address.ip_addresses.length > 0) {
                        let newAdresses = address.ip_addresses.map(ipsettings => {
                            if (ipsettings.id == action.payload.id) {
                                return {...ipsettings,
                                    fast_status: action.payload.mode == 'fast' ? true : ipsettings.fast_status,
                                    full_status: action.payload.mode == 'full' ? true : ipsettings.full_status,
                                };
                            } else {
                                return ipsettings;
                            }
                        });
                        return {...address, ip_addresses: newAdresses};
                    } else {
                        return address;
                    }
                }),
                errorMessage: null
            };
        }
        case UserInfoActionTypes.SAVE_BLOG_POSTS: {
            return {
                ...state,
                blogPosts: action.payload,
                errorMessage: null
            };
        }
        case UserInfoActionTypes.SAVE_RECENT_BLOG_POSTS: {
            return {
                ...state,
                blogPosts: {...state.blogPosts, recentPosts: action.payload},
                errorMessage: null
            };
        }
        case UserInfoActionTypes.SAVE_TIMEZONES: {
            return {
                ...state,
                timeZones: action.payload.map(name => ({name})),
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}