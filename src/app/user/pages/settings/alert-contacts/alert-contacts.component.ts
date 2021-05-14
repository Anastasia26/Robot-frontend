import {Component, OnInit} from '@angular/core';
import {UserDashboardService} from '../../services/user-dashboard.service';
import {ModalsService} from '../../../../shared/services/modals.service';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {Observable} from 'rxjs';
import {
  GetAlertContacts,
  SendEditAlertContacts,
  SendAlertContacts, СhangeAlertAction,
} from '../../../../core/store/actions/user-info.action';
import cloneDeep from 'lodash.clonedeep';
import {pluck} from "rxjs/operators";
@Component({
  selector: 'app-alert-contacts',
  templateUrl: './alert-contacts.component.html',
  styleUrls: ['./alert-contacts.component.css']
})
export class AlertContactsComponent implements OnInit {
  alertInfo: any;
  getState: Observable<any>;
  headerAlertText: string;
  btnAlertName: string;
  currentEmail: string;
  constructor(private store: Store<UserState>,
              private userDashboardService: UserDashboardService,
              private modalsService: ModalsService) {
    this.getState = this.store.select(selectUserState).pipe(pluck('alertInfo'));
    this.getState.subscribe((alert) => {
      if (alert) {
        if (Object.keys(alert).length !== 0) {
            this.alertInfo = cloneDeep(alert);
        }
      }
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

  submitAlertContactData(id, event, isActive): any {
    if (id) {
      const routeParamsforEdit = {
        id: id.toString(),
        email: event,
        is_active: isActive,
      };
      this.store.dispatch(new SendEditAlertContacts(routeParamsforEdit));
    } else {
      this.store.dispatch(new SendAlertContacts(event));
    }
  }

  openEditContactModal(email): any {
    this.headerAlertText = 'Edit Alert Contact';
    this.btnAlertName = 'Edit Alert Contact';
    this.currentEmail = email;
    this.modalsService.open('alertFinish', email);
  }
  changeAlertAction(id, currentEmail, e): any {
    const paramsForChangeAction = {
      id: id.toString(),
      email: currentEmail,
      is_active: e.checked,
    };
    this.store.dispatch(new СhangeAlertAction(paramsForChangeAction));
  }
}
