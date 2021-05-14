import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertInfo, DomainsList} from '../../../../user/pages/model/user-info.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';
import {ModalsService} from '../../../services/modals.service';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {UserDashboardService} from '../../../../user/pages/services/user-dashboard.service';
import {ClearAllFailureMessage} from '../../../../core/store/actions/user.action';
import {CreateDomainsList, UserInfoActionTypes} from '../../../../core/store/actions/user-info.action';

@Component({
  selector: 'app-modal-sites',
  templateUrl: './modal-sites.component.html',
  styleUrls: ['./modal-sites.component.css']
})
export class ModalSitesComponent implements OnInit, OnDestroy {
  formDomains: FormGroup;
  alertInfo: AlertInfo[] = [];
  domainsList: DomainsList[] = [];
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
    this.formDomains.reset();
    this.currentContactTypeId = 0;
    this.domainsID = null;
    this.selectedAlertInfoArray = [];
    this.domainsList = [];
    this.domainsFlag = {};
    if (event) {
      this.currentContactTypeId = 1;
      this.domainsID = event.editId;
      this.domainsName = event.domainLabel;
    }
    this.element.style.display = 'block';
  }

  // close modal
  close(): void {
    this.closeModalEvent.emit();
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  // scan sites in input
  createMonitoringDomains(): any {
    this.loading = true;
    this.userDashboardService.createDomainsList(this.formDomains.value.domain)
        .subscribe((domainsList: DomainsList[]) => {
          this.loading = false;
          this.domainsList = domainsList['domains'];
        });
  }

  // add domain's name in the list
  AddDomainName(index, name): any {
    this.domainsFlag[index] = !this.domainsFlag[index];
    this.domainsArray.push(name);
    if (this.domainsFlag[index]) {
      this.domainsArray.push(name);
      this.errorMessage = '';
    } else {
      this.domainsArray = this.domainsArray.filter(item => {
        return item !== name;
      });
    }
  }

  // choose email checkboxes
  AddAlertsInfoName(id): any {
    if (this.alertCategory[id]){
      this.alertCategory[id] = !this.alertCategory[id];
      this.selectedAlertInfoArray = this.selectedAlertInfoArray.filter(item => {
        return item !== id;
      });
    } else {
      this.alertCategory[id] = true;
      this.selectedAlertInfoArray.push(id);
    }
  }

  ApplyAllResults(): any {
    this.applyLoading = true;
    if (this.domainsArray.length === 0) {
      this.errorMessage = "Choose domain's name";
      this.applyLoading = false;
    } else {
      this.errorMessage = '';
      let obj = {
        domains_subdomains: this.domainsArray,
        alert_contacts_ids: this.selectedAlertInfoArray
      };
        this.store.dispatch(new CreateDomainsList(obj));
        this.actions.pipe(ofType(UserInfoActionTypes.CREATE_DOMAINS_LIST),
            tap(() => {
              this.loading = false;
            }));
      }
    }
}
