import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {GetAlertContacts, GetIpSettings, StartFastPortScan} from '../../../core/store/actions/user-info.action';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../core/store/state/user.state';
import {Observable} from 'rxjs';
import {UserDashboardService} from '../services/user-dashboard.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  public ipAddresses: any;
  public ipSettings: object;
  getState: Observable<any>;
  private domainId: string;
  private domainName: string;
  @Input() clickCount: number;
  private element: any;
  activeState: boolean[] = [];
  settingId: number;
  pingStatus: boolean;
  httpStatus: boolean;
  httpsStatus: boolean;
  sslStatus: boolean;
  constructor(private store: Store<UserState>, private userDashboardService: UserDashboardService, private el: ElementRef) {
    this.getState = this.store.select(selectUserState);
    this.element = el.nativeElement;
    this.getState.subscribe((state) => {
      console.log(state);
      if (state.ipAddresses) {
        this.ipAddresses = state.ipAddresses.ip_addresses;
        this.domainId = state.ipAddresses.id;
        this.domainName = state.ipAddresses.name;
        if (this.domainId) {
          this.el.nativeElement.childNodes[2].scrollIntoView({behavior: 'smooth'});
        }
      }
      this.ipSettings = JSON.parse(JSON.stringify(state.ipSettings));
      if (state.ipSettings) {
        console.log(state.ipSettings);
        this.settingId = state.ipSettings.id;
        this.pingStatus = state.ipSettings.ping;
        this.httpStatus = state.ipSettings.http;
        this.httpsStatus = state.ipSettings.https;
        this.sslStatus = state.ipSettings.ssl;
      }
    });
    // this.userDashboardService.onScrollTo.subscribe(param => {
    //   this.domainId = param.domain_id;
    //   this.domainName = param.domain_name;
    //   if (this.domainId) {
    //     this.el.nativeElement.childNodes[2].scrollIntoView({behavior: 'smooth'});
    //   }
    // });
  }


  ngOnInit(): void {
    this.store.dispatch(new GetAlertContacts());
  }

  ngOnDestroy() {
   // this.store.dispatch(stopAction());
  }

  openDomainSetting(index: number, id: string): any {
    this.activeState[index] = !this.activeState[index];
    this.store.dispatch(new GetIpSettings(id.toString()));
  }

  FastPortScan (): any  {
    let settingsInfo = {
      'http':  this.httpStatus ? true : false,
      'https': this.httpsStatus ? true : false,
      'ping': this.pingStatus ? true : false,
      'ssl': this.sslStatus ? true : false,
      "available_ports": []
    };
    this.store.dispatch(new StartFastPortScan(this.settingId.toString()));
   // console.log(this.settingId);
  }
}
