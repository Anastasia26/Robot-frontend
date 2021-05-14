import { Action } from '@ngrx/store';

export enum UserInfoActionTypes {
    GET_ALERT_CONTACTS = '[User Info] Get Alert Contacts',
    UPDATE_ALERT_CONTACTS = '[User Info] Update Alert Contacts',
    ADD_ALERT_CONTACTS = '[User Info] Add Alert Contacts',
    SAVE_ALERT_CONTACTS = '[User Info] Save Alert Contacts',
    SEND_ALERT_CONTACTS = '[User Info] Send Alert Contacts',
    SEND_EDIT_ALERT_CONTACTS = '[User Info] Send Edit Alert Contacts',
    CHANGE_ALERT_ACTION = '[User Info] Change Alert Action',
    SAVE_CHANGED_ALERT_ACTION = '[User Info] Save Changed Alert Action',
    CREATE_DOMAINS_LIST = '[User Info] Create domains list',
    ADD_DOMAINS_ITEM = '[User Info] Add domains item to list',
    GET_DOMAINS_LIST = '[User Info] Get domains list',
    SAVE_DOMAINS_LIST = '[User Info] Save domains list',
    DELETE_DOMAINS_ITEM = '[User Info] Delete domains item',
    UPDATE_DOMAINS_LIST = '[User Info] Update domains list',
    EDIT_DOMAINS_CONTACTS = '[User Info] Edit domains contact list',
    GET_RESETS_LIST = '[User Info] Get resets list',
    SAVE_RESETS_LIST = '[User Info] Save resets list',
    RESET_DOMAINS_LIST = '[User Info] reset domains list',
    UPDATE_RESET_DOMAINS_LIST = '[User Info] Update reset domains list',
    GET_IP_ADDRESSES_LIST = '[User Info] Get ip addresses list',
    SAVE_IP_ADDRESSES_LIST = '[User Info] Save ip addresses list',
    GET_IP_SETTINGS = '[User Info] Get ip settings',
    START_PORT_SCAN = '[User Info] Start port scan',
    SAVE_SCAN_INFO = '[User Info] Save Scan Information',
    GET_MONITORING_EVENTS = '[User Info] Get monitoring events',
    SAVE_MONITORING_EVENTS = '[User Info] Save monitoring events',
    UPDATE_IP_INFO = '[User Info] UPDATE IP PARAMETERS',
    GET_QUICK_STATS_INFO = '[User Info] Get quick stats information',
    SAVE_QUICK_STATS_INFO = '[User Info] Save quick stats data',
    SEND_MONITORING_SETTINGS = '[User Info] Send monitoring settings',
    UPDATE_MONITORING_SETTINGS = '[User Info] Update reseting domains stats',
    CHANGE_MONITORING_STATUS = '[User Info] Change monitoring status',
    GET_BLOG_POSTS = '[User Info] Get blog posts',
    SAVE_BLOG_POSTS = '[User Info] Save blog posts',
    GET_RECENT_BLOG_POSTS = '[User Info] Get recent blog posts',
    SAVE_RECENT_BLOG_POSTS = '[User Info] Save recent blog posts',
    GET_TIMEZONES = '[User Info] Get timezones list',
    SAVE_TIMEZONES = '[User Info] Save timezones list',
}

export class GetAlertContacts implements Action {
    readonly type = UserInfoActionTypes.GET_ALERT_CONTACTS;
}

export class SaveAlertContacts implements Action {
    readonly type = UserInfoActionTypes.SAVE_ALERT_CONTACTS;
    constructor(public payload: any) {}
}

export class AddAlertContacts implements Action {
    readonly type = UserInfoActionTypes.ADD_ALERT_CONTACTS;
    constructor(public payload: any) {}
}

export class UpdateAlertContacts implements Action {
    readonly type = UserInfoActionTypes.UPDATE_ALERT_CONTACTS;
    constructor(public payload: any) {}
}

export class SendAlertContacts implements Action {
    readonly type = UserInfoActionTypes.SEND_ALERT_CONTACTS;
    constructor(public payload: any) {}
}

export class SendEditAlertContacts implements Action {
    readonly type = UserInfoActionTypes.SEND_EDIT_ALERT_CONTACTS;
    constructor(public payload: any) {}
}
export class СhangeAlertAction implements Action {
    readonly type = UserInfoActionTypes.CHANGE_ALERT_ACTION;
    constructor(public payload: any) {}
}
export class SaveСhangedAlertAction implements Action {
    readonly type = UserInfoActionTypes.SAVE_CHANGED_ALERT_ACTION;
    constructor(public payload: any) {}
}

export class CreateDomainsList implements Action {
    readonly type = UserInfoActionTypes.CREATE_DOMAINS_LIST;
    constructor(public payload: any) {}
}

export class AddDomainsItem implements Action {
    readonly type = UserInfoActionTypes.ADD_DOMAINS_ITEM;
    constructor(public payload: any) {}
}

export class GetDomainsList implements Action {
    readonly type = UserInfoActionTypes.GET_DOMAINS_LIST;
}

export class SaveDomainsList implements Action {
    readonly type = UserInfoActionTypes.SAVE_DOMAINS_LIST;
    constructor(public payload: any) {}
}

export class DeleteDomainsItem implements Action {
    readonly type = UserInfoActionTypes.DELETE_DOMAINS_ITEM;
    constructor(public payload: any) {}
}

export class UpdateDeleteDomainsItem implements Action {
    readonly type = UserInfoActionTypes.UPDATE_DOMAINS_LIST;
    constructor(public payload: any) {}
}

export class ApplyEditedContactsList implements Action {
    readonly type = UserInfoActionTypes.EDIT_DOMAINS_CONTACTS;
    constructor(public payload: any) {}
}

export class GetResetsList implements Action {
    readonly type = UserInfoActionTypes.GET_RESETS_LIST;
    constructor(public payload: any) {}
}

export class SaveResetsList implements Action {
    readonly type = UserInfoActionTypes.SAVE_RESETS_LIST;
    constructor(public payload: any) {}
}

export class ResetDomainsList implements Action {
    readonly type = UserInfoActionTypes.RESET_DOMAINS_LIST;
    constructor(public payload: any) {}
}

export class UpdateResetDomainsList implements Action {
    readonly type = UserInfoActionTypes.UPDATE_RESET_DOMAINS_LIST;
    constructor(public payload: any) {}
}

export class GetIpAddressesList implements Action {
    readonly type = UserInfoActionTypes.GET_IP_ADDRESSES_LIST;
    constructor(public payload: any) {}
}

export class SaveIpAddressesList implements Action {
    readonly type = UserInfoActionTypes.SAVE_IP_ADDRESSES_LIST;
    constructor(public payload: any) {}
}

export class GetIpSettings implements Action {
    readonly type = UserInfoActionTypes.GET_IP_SETTINGS;
    constructor(public payload: any) {}
}

export class StartPortScan implements Action {
    readonly type = UserInfoActionTypes.START_PORT_SCAN;
    constructor(public payload: any) {}
}

export class SaveScanInfo implements Action {
    readonly type = UserInfoActionTypes.SAVE_SCAN_INFO;
    constructor(public payload: any) {}
}

export class GetMonitoringEvents implements Action {
    readonly type = UserInfoActionTypes.GET_MONITORING_EVENTS;
}

export class SaveMonitoringEvents implements Action {
    readonly type = UserInfoActionTypes.SAVE_MONITORING_EVENTS;
    constructor(public payload: any) {}
}
export class UpdateIpInfo implements Action {
    readonly type = UserInfoActionTypes.UPDATE_IP_INFO;
    constructor(public payload: any) {}
}
export class GetQuickStatsInfo implements Action {
    readonly type = UserInfoActionTypes.GET_QUICK_STATS_INFO;
}
export class SaveQuickStatsInfo implements Action {
    readonly type = UserInfoActionTypes.SAVE_QUICK_STATS_INFO;
    constructor(public payload: any) {}
}
export class SendMonitoringSettings implements Action {
    readonly type = UserInfoActionTypes.SEND_MONITORING_SETTINGS;
    constructor(public payload: any) {}
}
export class UpdateMonitoringSettings implements Action {
    readonly type = UserInfoActionTypes.UPDATE_MONITORING_SETTINGS;
    constructor(public payload: any) {}
}
export class ChangeMonitoringStatus implements Action {
    readonly type = UserInfoActionTypes.CHANGE_MONITORING_STATUS;
    constructor(public payload: any) {}
}
export class GetBlogPosts implements Action {
    readonly type = UserInfoActionTypes.GET_BLOG_POSTS;
}
export class SaveBlogPosts implements Action {
    readonly type = UserInfoActionTypes.SAVE_BLOG_POSTS;
    constructor(public payload: any) {}
}
export class GetRecentBlogPosts implements Action {
    readonly type = UserInfoActionTypes.GET_RECENT_BLOG_POSTS;
}
export class SaveGetRecentBlogPosts implements Action {
    readonly type = UserInfoActionTypes.SAVE_RECENT_BLOG_POSTS;
    constructor(public payload: any) {}
}
export class GetTimeZones implements Action {
    readonly type = UserInfoActionTypes.GET_TIMEZONES;
}
export class SaveTimeZones implements Action {
    readonly type = UserInfoActionTypes.SAVE_TIMEZONES;
    constructor(public payload: any) {}
}