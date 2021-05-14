import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ModalsService} from '../../services/modals.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../core/store/state/user.state';
import {ClearAllFailureMessage} from '../../../core/store/actions/user.action';
import {AlertInfo, DomainsList} from '../../../user/pages/model/user-info.model';
import {UserDashboardService} from '../../../user/pages/services/user-dashboard.service';
import {SitesListModel} from '../../../user/pages/model/sites-list.model';
import {CreateDomainsList, UserInfoActionTypes} from '../../../core/store/actions/user-info.action';
import {Actions, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit, OnDestroy {
  formEmail: FormGroup;
  formDomains: FormGroup;
  alertInfo: AlertInfo[] = [];
  domainsList: DomainsList[] = [];
  editAlertList: AlertInfo[] = [];
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
  private domainsFlag: any = {};
  private domainsArray: string [] = [];
  private selectedAlertInfoArray: any [] = [];
  private domainsID: number;
  private domainsName: string;
  alertCategory = [];
  alertCategory2 = [];
  checked: boolean;
  public resetInfo = [
    {id: 1, name: 'ping', status: true},
    {id: 2, name: 'http', status: true},
    {id: 3, name: 'https', status: true},
    {id: 4, name: 'ssl', status: true},
    {id: 5, name: '22', status: true},
  ];
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
    this.formEmail = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.formDomains = new FormGroup({
      domain: new FormControl('', [Validators.required, Validators.pattern(/^([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/)]),
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new ClearAllFailureMessage());
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
        this.close();
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
    this.formEmail.get('email').setValue('');
    this.formDomains.reset();
    this.currentContactTypeId = 0;
    this.domainsID = null;
    this.selectedAlertInfoArray = [];
    this.domainsList = [];
    if (event) {
        this.currentContactTypeId = 1;
        this.formEmail.get('email').setValue(event);
        this.domainsID = event.editId;
        this.domainsName = event.domainLabel;
        this.userDashboardService.getEditAlertList(this.domainsID.toString())
          .subscribe(resp => {
            this.editAlertList = resp['alert_contacts'];
          });
    }
    this.element.style.display = 'block';
  }

  // close modal
  close(): void {
    this.closeModalEvent.emit(null);
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  ResetDomainName(name, e): any {
    var isName = name;
    var isChecked = e.checked;
  }
}
