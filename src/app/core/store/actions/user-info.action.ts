import { Action } from '@ngrx/store';

export enum UserInfoActionTypes {
    GET_ALERT_CONTACTS = '[User Info] Get Alert Contacts',
    UPDATE_ALERT_CONTACTS = '[User Info] Update Alert Contacts',
    SAVE_ALERT_CONTACTS = '[User Info] Save Alert Contacts',
    SEND_ALERT_CONTACTS = '[User Info] Send Alert Contacts',
    SEND_EDIT_ALERT_CONTACTS = '[User Info] Send Edit Alert Contacts',
    CREATE_DOMAINS_LIST = '[User Info] Create domains list',
    GET_DOMAINS_LIST = '[User Info] Get domains list',
    SAVE_DOMAINS_LIST = '[User Info] Save domains list',
    DELETE_DOMAINS_ITEM = '[User Info] Delete domains item',
    UPDATE_DOMAINS_LIST = '[User Info] Update domains list',
    EDIT_DOMAINS_CONTACTS = '[User Info] Edit domains contact list',
 //   UPDATE_DOMAINS_CONTACTS = '[User Info] Update domains contact list',
    GET_RESETS_LIST = '[User Info] Get resets list',
    SAVE_RESETS_LIST = '[User Info] Save resets list',
    RESET_DOMAINS_LIST = '[User Info] reset domains list',
    UPDATE_RESET_DOMAINS_LIST = '[User Info] Update reset domains list',
    GET_IP_ADDRESSES_LIST = '[User Info] Get ip addresses list',
    SAVE_IP_ADDRESSES_LIST = '[User Info] Save ip addresses list',
    GET_IP_SETTINGS = '[User Info] Get ip settings',
    UPDATE_IP_SETTINGS = '[User Info] Update ip settings',
    START_FAST_PORT_SCAN = '[User Info] Start fast port scan',
    GET_FAST_SCAN_ID = '[User Info] Get fast scan id',
}

export class GetAlertContacts implements Action {
    readonly type = UserInfoActionTypes.GET_ALERT_CONTACTS;
}

export class SaveAlertContacts implements Action {
    readonly type = UserInfoActionTypes.SAVE_ALERT_CONTACTS;
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

export class CreateDomainsList implements Action {
    readonly type = UserInfoActionTypes.CREATE_DOMAINS_LIST;
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

export class UpdateIpSettings implements Action {
    readonly type = UserInfoActionTypes.UPDATE_IP_SETTINGS;
    constructor(public payload: any) {}
}

export class StartFastPortScan implements Action {
    readonly type = UserInfoActionTypes.START_FAST_PORT_SCAN;
    constructor(public payload: any) {}
}

export class GetFastScanId implements Action {
    readonly type = UserInfoActionTypes.GET_FAST_SCAN_ID;
    constructor(public payload: any) {}
}




