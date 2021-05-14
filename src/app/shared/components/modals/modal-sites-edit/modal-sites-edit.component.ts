import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AlertInfo} from '../../../../user/pages/model/user-info.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';
import {ModalsService} from '../../../services/modals.service';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {UserDashboardService} from '../../../../user/pages/services/user-dashboard.service';
import {ClearAllFailureMessage} from '../../../../core/store/actions/user.action';
import {
  ApplyEditedContactsList,
  GetAlertContacts,
  UserInfoActionTypes
} from '../../../../core/store/actions/user-info.action';
@Component({
  selector: 'app-modal-sites-edit',
  templateUrl: './modal-sites-edit.component.html',
  styleUrls: ['./modal-sites-edit.component.css']
})
export class ModalSitesEditComponent implements OnInit, OnDestroy {
  alertInfo: AlertInfo[] = [];
  selectedAlertList: any [] = [];
  selectedDomainName: string;
  getState: Observable<any>;
  @Input() public id: string;
  @Input() mode: string;
  @Input() headertext: string;
  @Input() btnalertName: string;
  @Input() bodytext: string;
  @Output() closeModalEvent = new EventEmitter();
  @Output() submitAlertContactEvent = new EventEmitter();
  private element: any;
  private currentContactTypeId: number;
  private errorMessage: string | null;
  private loading: boolean;
  private applyLoading: boolean;
  private domainsID: number;
  checked: boolean;
  constructor(private modalService: ModalsService,
              private el: ElementRef,
              private store: Store<UserState>,
              private userDashboardService: UserDashboardService,
              private actions: Actions) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.alertInfo = state.alertInfo;
      this.errorMessage = state.errorMessage;
    });
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
   // this.store.dispatch(new ClearAllFailureMessage());
    this.element.style.display = 'none';
    // ensure id attribute exists
    if (!this.id) {
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close('modal');
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(event): void {
    this.loading = false;
    this.applyLoading = false;
    this.domainsID = null;
    if (event) {
      this.currentContactTypeId = 1;
      this.domainsID = event.editId;
      this.userDashboardService.getEditAlertList(this.domainsID.toString())
          .subscribe(resp => {
            this.selectedAlertList = resp['alert_contacts'];
            this.selectedDomainName = resp['name'];
          });
    }
    this.element.style.display = 'block';
  }

  // close modal
  close(event): void {
    this.closeModalEvent.emit(event);
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  getDimensionsByFind(id): any {
    let result = false;
    let a = this.selectedAlertList.find(x => x.id === id);
    if (a) {
      result = true;
    }
    return result;
  }

  // choose email checkboxes
  AddAlertsInfoName(id): any {
    let contactsFromStore, checkedContacts;
    if (this.alertInfo) {
      contactsFromStore = this.alertInfo.find(x => x.id === id);
      checkedContacts = this.selectedAlertList.find(item => {
        return item.id == id;
      });
      if (checkedContacts) {
        this.selectedAlertList = this.selectedAlertList.filter(item => {
          return item.id !== id;
        });
      } else {
        this.selectedAlertList.push(contactsFromStore);
      }
    }
  }

  ApplyCheckedResults(): any {
    this.applyLoading = true;
    let obj = {
      id: this.domainsID.toString(),
      name: this.selectedDomainName,
      alert_contacts: this.selectedAlertList
    };
    this.store.dispatch(new ApplyEditedContactsList(obj));
  }
}
