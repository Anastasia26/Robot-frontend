import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../core/store/state/user.state';
import {Observable} from 'rxjs';
import {UserDashboardService} from '../services/user-dashboard.service';
import {
  GetAlertContacts,
  GetBlogPosts,
  GetMonitoringEvents,
  GetRecentBlogPosts
} from '../../../core/store/actions/user-info.action';
import saveAs from 'file-saver';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  private domainId: string;
  private element: any;
  getState: Observable<any>;
  public monitoringInfo: any;
  recentPosts: [];
  constructor(private store: Store<UserState>, private userDashboardService: UserDashboardService, private el: ElementRef) {
    this.element = el.nativeElement;
    this.userDashboardService.onScrollTo.subscribe(param => {
      this.domainId = param.domain_id;
      if (this.domainId) {
        this.el.nativeElement.childNodes[2].scrollIntoView({behavior: 'smooth'});
      }
    });
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.monitoringInfo = state.monitoringEvents;
      this.recentPosts = state.blogPosts.recentPosts;
    });
  }
  ngOnInit(): void {
    this.store.dispatch(new GetMonitoringEvents());
    this.store.dispatch(new GetAlertContacts());
    this.store.dispatch(new GetRecentBlogPosts());
  }

  exportLogs(e): any {
    e.preventDefault();
    this.userDashboardService.getExportLogs().subscribe(
        (response: any) => {
          saveAs(response, `logs.csv`);
        });
  }
}


