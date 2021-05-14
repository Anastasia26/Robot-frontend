import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of} from 'rxjs';
import {map, switchMap, catchError, tap, debounceTime} from 'rxjs/operators';
import {Utils} from '../../classes/utils';
import {UserDashboardService} from '../../../user/pages/services/user-dashboard.service';
import {ModalsService} from '../../../shared/services/modals.service';
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
    GetMonitoringEvents,
    SaveMonitoringEvents,
    GetQuickStatsInfo,
    SaveQuickStatsInfo,
    SendMonitoringSettings,
    UpdateMonitoringSettings,
    StartPortScan,
    SaveScanInfo,
    AddAlertContacts,
    ChangeMonitoringStatus,
    SaveBlogPosts, SaveGetRecentBlogPosts, СhangeAlertAction, AddDomainsItem, SaveTimeZones
} from '../actions/user-info.action';
import {ErrorsFailureMessage} from '../actions/user.action';
import {BlogListService} from '../../../shared/services/blog-list.service';
import {Store} from '@ngrx/store';
import {UserState} from '../state/user.state';


@Injectable()
export class UserInfoEffects {
    constructor(
        private actions: Actions,
        private userDashboardService: UserDashboardService,
        private router: Router,
        private helperClass: Utils,
        private blogListService: BlogListService,
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
        return this.userDashboardService.sendAlertContacts(payload.email).pipe(map((resp) => {
            this.modalsService.close('alertFinish');
            return new AddAlertContacts(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    SendEditAlertContacts: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.SEND_EDIT_ALERT_CONTACTS), map((action: SendEditAlertContacts) => action.payload), switchMap(payload => {
        return this.userDashboardService.sendEditAlertContacts(payload).pipe(map(() => {
            this.modalsService.close('alertFinish');
            return new UpdateAlertContacts(payload);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    СhangeAlertAction: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.CHANGE_ALERT_ACTION),
        map((action: СhangeAlertAction) => action.payload),
        debounceTime(1000),
        switchMap(payload => {
        return this.userDashboardService.sendEditAlertContacts(payload).pipe(map((resp) => {
            return new UpdateAlertContacts(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    CreateDomainsList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.CREATE_DOMAINS_LIST), map((action: CreateDomainsList) => action.payload), switchMap(payload => {
        return this.userDashboardService.applyDomainsResult(payload.domains_subdomains, payload.alert_contacts_ids).pipe(map((resp) => {
            this.modalsService.close('modalsSites');
            return new AddDomainsItem(resp.results);
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
    GetResetsList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_RESETS_LIST),
        map((action: GetResetsList) => action.payload),
        switchMap(payload => {
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
    GetIpAddressesList: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_IP_ADDRESSES_LIST), map((action: GetIpAddressesList) => action.payload),
        switchMap(payload => {
        return this.userDashboardService.getIpAddressesList(payload).pipe(map((resp) => {
            return new SaveIpAddressesList(resp);
        }), tap ((resp) => {
            resp.payload.ip_addresses.forEach(
                    (dInfo) => {
                        if (resp.payload.perform_monitoring) {
                            this.helperClass.GetIpInformation(dInfo.id);
                        }
                    });
            }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    GetMonitoringEvents: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_MONITORING_EVENTS),
        map((action: GetMonitoringEvents) => action),
        switchMap(() => {
            return this.userDashboardService.getMonitoringEvents().pipe(map((resp) => {
                return new SaveMonitoringEvents(resp);
            }), catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
        }));
    @Effect()
    GetQuickStatsInfo: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_QUICK_STATS_INFO),
        map((action: GetQuickStatsInfo) => action),
        switchMap(() => {
        return this.userDashboardService.getQuickStatsData().pipe(map((resp) => {
            return new SaveQuickStatsInfo(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    SendMonitoringSettings: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.SEND_MONITORING_SETTINGS),
        map((action: SendMonitoringSettings) => action.payload),
        debounceTime(1000),
        switchMap(payload => {
        return this.userDashboardService.sendMonitoringSettings(payload.id, payload.data).pipe(map((resp) => {
            return new UpdateMonitoringSettings({id: payload.id, mData: resp});
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    StartFastPortScan: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.START_PORT_SCAN),
        map((action: StartPortScan) => action.payload),
        switchMap(payload => {
            return this.userDashboardService.startPortScan(payload).pipe(map((resp) => {
                 return new SaveScanInfo({id: resp.ip_id, mode: payload.mode});
            }), catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
        }));
    @Effect()
    ChangeMonitoringStatus: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.CHANGE_MONITORING_STATUS),
        map((action: ChangeMonitoringStatus) => action.payload),
        debounceTime(1000),
        switchMap(payload => {
            return this.userDashboardService.changeMonitoringStatus(payload.id, payload.perform_monitoring).pipe(map((resp) => {
                return new SaveIpAddressesList(resp);
            }), tap ((resp) => {
                this.store.dispatch(new GetQuickStatsInfo());
                if (resp.payload.perform_monitoring) {
                    resp.payload.ip_addresses.forEach(
                        (dInfo) => {
                            this.helperClass.GetIpInformation(dInfo.id);
                        });
                }
            }), catchError((err) => {
                return of(new ErrorsFailureMessage( err ));
            }));
        }));
    @Effect()
    GetBlogPosts: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_BLOG_POSTS), switchMap(() => {
        return this.blogListService.getPosts().pipe(map((resp) => {
            return new SaveBlogPosts(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    GetRecentBlogPosts: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_RECENT_BLOG_POSTS), switchMap(() => {
        return this.blogListService.getRecentPosts().pipe(map((resp) => {
            return new SaveGetRecentBlogPosts(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
    @Effect()
    GetTimeZones: Observable<any> = this.actions.pipe(ofType(UserInfoActionTypes.GET_TIMEZONES), switchMap(() => {
        return this.userDashboardService.getTimeZonesList().pipe(map((resp) => {
            return new SaveTimeZones(resp);
        }), catchError((err) => {
            return of(new ErrorsFailureMessage( err ));
        }));
    }));
}



