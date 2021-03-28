import {Component, OnInit,} from '@angular/core';
import {UserDashboardService} from '../../services/user-dashboard.service';
import {ModalsService} from '../../../../shared/services/modals.service';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {Observable} from 'rxjs';
import {
  GetAlertContacts,
  SendEditAlertContacts,
  SendAlertContacts,
} from '../../../../core/store/actions/user-info.action';
import {AlertInfo} from '../../model/user-info.model';
import {UserInfoEffects} from '../../../../core/store/effects/user-info.effects';
import {Actions, ofType} from '@ngrx/effects';
@Component({
  selector: 'app-alert-contacts',
  templateUrl: './alert-contacts.component.html',
  styleUrls: ['./alert-contacts.component.css']
})
export class AlertContactsComponent implements OnInit {
  alertInfo: AlertInfo[] = [];
  getState: Observable<any>;
  headerAlertText: string;
  btnAlertName: string;
  editId: string;
  currentEmail: string;
  private loading: boolean;
  constructor(private store: Store<UserState>,
              private userInfoEffects: UserInfoEffects,
              private userDashboardService: UserDashboardService,
              private modalsService: ModalsService,
              private actions: Actions) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.alertInfo = state.alertInfo;
    });
  }

  ngOnInit(): void {
   this.store.dispatch(new GetAlertContacts());
  }

  openAlertContactModal(): any {
    this.headerAlertText = 'New Alert Contact';
    this.btnAlertName = 'Create Alert Contact';
    this.modalsService.open('alertFinish');
  }

  submitAlertContactData($event): any {
    if (this.editId) {
      const routeParamsforEdit = {
        id: this.editId.toString(),
        email: $event,
      };
      this.store.dispatch(new SendEditAlertContacts(routeParamsforEdit));
    } else {
      this.store.dispatch(new SendAlertContacts($event));
    }
  }

  openEditContactModal(id, email): any {
    this.headerAlertText = 'Edit Alert Contact';
    this.btnAlertName = 'Edit Alert Contact';
    this.editId = id;
    this.currentEmail = email;
    this.modalsService.open('alertFinish', email);
  }
}
