import {Component, OnInit, Pipe} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {GetQuickStatsInfo} from '../../../../core/store/actions/user-info.action';
import {Observable} from 'rxjs';
import cloneDeep from 'lodash.clonedeep';
import {ChangeQuickStatus} from '../../../../core/store/actions/user.action';
@Component({
  selector: 'app-quick-stats',
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.css']
})

export class QuickStatsComponent implements OnInit {
  quickStats: Observable<any>;
  checkQuickStats: boolean;
  public quickStatsDetails: any;
  constructor(private store: Store<UserState>) {
    this.quickStats = this.store.select(selectUserState);
    this.quickStats.subscribe((info) => {
      this.quickStatsDetails = info.quickStats;
      if (info.user) {
          this.checkQuickStats = cloneDeep(info.user);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetQuickStatsInfo());
  }

  changeQuickStats(quickStatus): any {
    this.store.dispatch(new ChangeQuickStatus(quickStatus));
  }

}
