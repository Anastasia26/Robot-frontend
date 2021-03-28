import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import {environment} from '../../../../environments/environment';
import {SitesListModel} from '../model/sites-list.model';
import {DomainsList} from '../model/user-info.model';
import {GetIpSettings} from '../../../core/store/actions/user-info.action';

@Injectable()
export class UserDashboardService {
    onScrollTo: EventEmitter<any> = new EventEmitter();
    constructor(private http: HttpClient) {}

    scrollToDomainDetails(param) {
        this.onScrollTo.emit(param);
    }

    getAlertContacts(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiEndpoint + `/monitoring/alert-contacts/`);
    }

    sendAlertContacts(alertData: string): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/alert-contacts/`;
        return this.http.post<any>(url, {email: alertData});
    }

    sendEditAlertContacts(id: string, email: string): Observable<any> {
        const url = environment.apiEndpoint + `/monitoring/alert-contact/${id}`;
        return this.http.put<any>(url, email);
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

    getIpSettings(id: string): Observable<any>  {
        return this.http.get<any>(environment.apiEndpoint + `/monitoring/ip/${id}/settings/`);
    }

    startFastPortScan(id: string): Observable<any>  {
        return this.http.get<any>(environment.apiEndpoint + `/monitoring/start-fast-port-scan/${id}`);
    }

}
