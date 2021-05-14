import {Component, Input, OnInit} from '@angular/core';
import {interval, Observable, timer} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {
  ChangeMonitoringStatus,
  SendMonitoringSettings,
  StartPortScan
} from '../../../../core/store/actions/user-info.action';
import cloneDeep from 'lodash.clonedeep';
import {pluck} from 'rxjs/operators';
import { curveLinear } from 'd3-shape';
import {Utils} from '../../../../core/classes/utils';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { noChartData } from './emtyChartData';
import {MessageService, PrimeNGConfig} from "primeng/api";
@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', [ animate(500) ])
    ])
  ],
  providers: [MessageService]
})
export class SiteInfoComponent implements OnInit {
  public domainDetails: any;
  DomainInfo: Observable<any>;
  checkPerfomMonitoring: boolean;
  domainId: string;
  @Input() clickCount: number;
  activeState: boolean[] = [];
  settingId: number;
  subscriptions: any = [];
  errorMessage: string | null;
  // options
  showLabels: boolean = true;
  animations: boolean = true;
  curve: any = curveLinear;
  noChartData: any[];
  constructor(private store: Store<UserState>, private helperClass: Utils, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.DomainInfo = this.store.select(selectUserState).pipe(pluck('domainDetails'));
    this.DomainInfo.subscribe((domain) => {
      Object.assign(this, { noChartData });
      this.domainId = domain[0].id;
      this.checkPerfomMonitoring = domain[0].perform_monitoring;
      if (Object.keys(domain[0]).length !== 0) {
        if (domain[0].ip_addresses.length > 0) {
          this.domainDetails = cloneDeep(domain);
          this.domainDetails[0].ip_addresses.forEach((address) => {
            if (address.fast_status || address.full_status) {
              this.addMonitoring(address.id);
            } else {
              this.removeMonitoring(address.id);
            }
          });
        }
      }
    });
  }

  ngOnInit(): void {
  }

  openDomainSetting(index: number): any {
    this.activeState[index] = !this.activeState[index];
  }

  FastPortScan(id, mode): any  {
    this.addMonitoring(id);
    this.store.dispatch(new StartPortScan({id: id.toString(), mode}));
  }

  FullPortScan(id, mode): any  {
    this.messageService.add({severity:'info', summary: 'Warning', detail: 'The scanning will be approximately 12 hours', life: 4000});
    timer(5000).subscribe(x => {
      this.addMonitoring(id);
      this.store.dispatch(new StartPortScan({id: id.toString(), mode}));
    });

  }

  resetDomainStats(childIp): any  {
    let available_ports = [];
    childIp.openedPorts.forEach(
        (port) => {
          available_ports.push({'number': port.number, "monitor": port.isActive });
        }
    );
    let availableDomainStats = {
      "ping": childIp.settings.ping,
      "http": childIp.settings.http,
      "https": childIp.settings.https,
      "ssl": childIp.settings.ssl,
      "available_ports": available_ports
    };
    this.store.dispatch(new SendMonitoringSettings({id: childIp.id, data: availableDomainStats}));
  }
  monitoringByIp(id): any {
    this.helperClass.GetIpInformation(id);
  }
  addMonitoring(id): any {
    let task = this.subscriptions.filter(x => x.taskId == id);
    if (task.length === 0) {
      this.subscriptions.push({taskId: id, stask: interval(10000).subscribe(() => this.monitoringByIp(id))});
    }
  }
  removeMonitoring(id): any {
    let task, delindex;
    task = this.subscriptions.filter(x => x.taskId == id);
    if (task.length > 0) {
      task[0].stask.unsubscribe();
      delindex = this.subscriptions.findIndex(x => x.taskId == id);
      this.subscriptions.splice(delindex, 1);
    }
  }

  changePerfomMonitoring(monitoringStatus): any {
    this.store.dispatch(new ChangeMonitoringStatus({id: this.domainId.toString(), perform_monitoring: monitoringStatus}));
  }
}
