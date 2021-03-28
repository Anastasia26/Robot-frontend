import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {interval, Observable, of} from 'rxjs';
import {map, switchMap, catchError, exhaustMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Utils} from '../../classes/utils';
import {UserDashboardService} from '../../../user/pages/services/user-dashboard.service';
import {ModalsService} from '../../../shared/services/modals.service';
import {UserState} from '../state/user.state';
import {
    UserInfoActionTypes,
    UpdateAlertContacts,
    CreateDomainsList,
    SendAlertContacts,
    SendEditAlertContacts,
    SaveAlertContacts,
    SaveDomainsList,
    DeleteDomainsItem,
    UpdateDeleteDomainsItem,
    ApplyEditedContactsList,
    GetResetsList,
    SaveResetsList,
    ResetDomainsList,
    UpdateResetDomainsList,
    GetIpAddressesList,
    SaveIpAddressesList,
    GetIpSettings,
    UpdateIpSettings,
    StartFastPortScan, GetFastScanId
} from '../actions/user-info.action';
import {ErrorsFailureMessage, UserActionTypes} from '../actions/user.action';


@Injectable()
export class UserInfoEffects {
    constructor(
        private actions: Actions,
        private userDashboardService: UserDashboardService,
        private router: Router,
        private helperClass: Utils,
        private modalsService: ModalsService,
        private store: Store<UserState>
    ) {}
    @Effect()
    GetAlertContacts: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_ALERT_CONTACTS), switchMap(() => {
        return this.userDashboardService.getAlertContacts().pipe(map((payload) => {
            return new SaveAlertContacts(payload);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    SendAlertContacts: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.SEND_ALERT_CONTACTS), map((action: SendAlertContacts) => action.payload), switchMap(payload => {
        return this.userDashboardService.sendAlertContacts(payload.email).pipe(map(() => {
            this.modalsService.close('alertFinish');
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    SendEditAlertContacts: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.SEND_EDIT_ALERT_CONTACTS), map((action: SendEditAlertContacts) => action.payload), switchMap(payload => {
        return this.userDashboardService.sendEditAlertContacts(payload.id, payload.email).pipe(map(() => {
            this.modalsService.close('alertFinish');
            return new UpdateAlertContacts(payload);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    CreateDomainsList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.CREATE_DOMAINS_LIST), map((action: CreateDomainsList) => action.payload), switchMap(payload => {
        return this.userDashboardService.applyDomainsResult(payload.domains_subdomains, payload.alert_contacts_ids).pipe(map((resp) => {
            this.modalsService.close('modalsSites');
            return new SaveDomainsList(resp.results);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    GetDomainsList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_DOMAINS_LIST), switchMap(() => {
        return this.userDashboardService.getDomainsList().pipe(map((payload) => {
                return new SaveDomainsList(payload);
            }), catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    DeleteDomainsItem: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.DELETE_DOMAINS_ITEM), map((action: DeleteDomainsItem) => action.payload), switchMap(payload => {
        return this.userDashboardService.deleteDomainsItem(payload.id).pipe(map(() => {
            return new UpdateDeleteDomainsItem(payload);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect({dispatch: false})
    SendDomainsContactList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.EDIT_DOMAINS_CONTACTS), map((action: ApplyEditedContactsList) => action.payload), switchMap(payload => {
        return this.userDashboardService.applyEditedAlertList(payload.id, payload.name, payload.alert_contacts).pipe(map(() => {
            this.modalsService.close('modalsEditSites');
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    GetResetsList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_RESETS_LIST), map((action: GetResetsList) => action.payload), switchMap(payload => {
        return this.userDashboardService.getResetsList(payload).pipe(map((resp) => {
            return new SaveResetsList(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    ResetDomainsList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.RESET_DOMAINS_LIST), map((action: ResetDomainsList) => action.payload), switchMap(payload => {
        return this.userDashboardService.resetDomainsList(payload.data, payload.id).pipe(map((resp) => {
            this.modalsService.close('modalsReset');
            return new UpdateResetDomainsList(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    GetIpAddressesList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_IP_ADDRESSES_LIST), map((action: GetIpAddressesList) => action.payload), switchMap(payload => {
        return this.userDashboardService.getIpAddressesList(payload).pipe(map((resp) => {
            return new SaveIpAddressesList(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    GetIpSettings: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_IP_SETTINGS), map((action: GetIpSettings) => action.payload), switchMap(payload => {
        console.log(payload);
        return this.userDashboardService.getIpSettings(payload).pipe(map((resp) => {
            const source = interval(1000);
            const subscribe = source.subscribe(val => console.log(resp));
            //console.log(resp);
            return new UpdateIpSettings(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    StartFastPortScan: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.START_FAST_PORT_SCAN), map((action: StartFastPortScan) => action.payload), switchMap(payload => {
        return this.userDashboardService.startFastPortScan(payload).pipe(map((resp) => {
            let data = resp;
            console.log(data);
            exhaustMap(action => interval(10000).pipe(
                 map(() => {console.log(data); } ),
            ));
            return new GetFastScanId(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    // @Effect({dispatch: false})
    // GetFastScanId: Observable<any> = this.actions.pipe(
    //     ofType(UserInfoActionTypes.GET_FAST_SCAN_ID),
    //     tap((fast_port_scan_id) => {
    //         console.log(fast_port_scan_id['payload']['fast_scan_id']);
    //         exhaustMap(action => interval(10000).pipe(
    //             // map(actions.everySecondAction()),
    //         ));
    //     }),
    //     // takeUntil(this.actions.pipe(ofType(actions.stop))),
    //     // repeat(),
    //     catchError((err) => {
    //         return of(new ErrorsFailureMessage( err ));
    //     }));
}



