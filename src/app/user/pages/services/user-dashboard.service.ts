import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import {environment} from '../../../../environments/environment';
import {SitesListModel} from '../model/sites-list.model';
import {DomainsList} from '../model/user-info.model';

@Injectable()
export class UserDashboardService {
    onScrollTo: EventEmitter<any> = new EventEmitter();
    constructor(private http: HttpClient) {}

    scrollToDomainDetails(param): any {
        this.onScrollTo.emit(param);
    }

    getAlertContacts(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiEndpoint + `/monitoring/alert-contacts/`);
    }

    sendAlertContacts(alertData: string): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/alert-contacts/`;
        return this.http.post<any>(url, {email: alertData});
    }

    sendEditAlertContacts(params: object): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/alert-contact/${params['id']}`;
        return this.http.put<any>(url, {email: params['email'], is_active: params['is_active']});
    }

    createDomainsList(domain: string): Observable<DomainsList[]> {
        return this.http.get<DomainsList[]>(environment.apiEndpoint + `/monitoring/domain/search/${domain}`);
    }

    applyDomainsResult(domainsList: string[], alertInfoList: number[]): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/domains/create`;
        return this.http.post<any>(url, {domains_subdomains: domainsList, alert_contacts_ids: alertInfoList});
    }

    getDomainsList(): Observable<SitesListModel[]> {
        return this.http.get<SitesListModel[]>(environment.apiEndpoint + `/monitoring/domains/`);
    }

    getEditAlertList(id: string): Observable<SitesListModel[]> {
        return this.http.get<SitesListModel[]>(environment.apiEndpoint + `/monitoring/domain/${id}`);
    }

    applyEditedAlertList(id: string, name: string, alert_contacts: []): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/domain/${id}`;
        return this.http.patch<any>(url, {name: name, alert_contacts: alert_contacts});
    }

    deleteDomainsItem(id: string): Observable<SitesListModel[]> {
        return this.http.delete<SitesListModel[]>(environment.apiEndpoint + `/monitoring/domain/${id}`);
    }

    getResetsList(id: string): Observable<any>  {
        return this.http.get<any>(environment.apiEndpoint + `/monitoring/retrive-available-domain-stats/${id}`);
    }

    resetDomainsList(resetInfo: object, id: string): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/reset-domain-stats/${id}`;
        return this.http.patch<any>(url, resetInfo);
    }

    getIpAddressesList(id: string): Observable<SitesListModel[]>  {
        return this.http.get<SitesListModel[]>(environment.apiEndpoint + `/monitoring/domain/${id}`);
    }

    getMonitoringEvents(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiEndpoint + `/monitoring/events/`);
    }

    getQuickStatsData(): Observable<any>  {
        return this.http.get<any>(environment.apiEndpoint + `/monitoring/quick-stats`);
    }
    sendMonitoringSettings(id: string, data: object): Observable<any>  {
        const url = environment.apiEndpoint + `/monitoring/ip/${id}/settings/`;
        return this.http.patch<any>(url, data);
    }

    getExportLogs(): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/events/export`;
        return this.http.get(url, { responseType: 'blob' });
    }
    startPortScan(payload): Observable<any> {
        if (payload.mode === 'fast') {
            return this.http.get<any>(environment.apiEndpoint + `/monitoring/start-fast-port-scan/${payload.id}`);
        }
        if (payload.mode === 'full') {
            return this.http.get<any>(environment.apiEndpoint + `/monitoring/start-full-port-scan/${payload.id}`);
        }
    }
    changeMonitoringStatus(id: string, monitoringStatus: boolean): Observable<any>  {
        const url = environment.apiEndpoint + `/monitoring/domain/${id}`;
        return this.http.patch<any>(url, {perform_monitoring: monitoringStatus});
    }

    getTimeZonesList(): Observable<any> {
        return this.http.get<any>(environment.apiEndpoint + `/core/timezones/`);
    }

}
