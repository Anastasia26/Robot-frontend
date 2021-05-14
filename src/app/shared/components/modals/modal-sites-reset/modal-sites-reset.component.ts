import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ModalsService} from '../../../services/modals.service';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {UserDashboardService} from '../../../../user/pages/services/user-dashboard.service';
import {Actions} from '@ngrx/effects';
import {Observable} from 'rxjs';
import cloneDeep from 'lodash.clonedeep';
import {ClearAllFailureMessage} from '../../../../core/store/actions/user.action';
import {GetDomainsList, GetResetsList, ResetDomainsList} from '../../../../core/store/actions/user-info.action';

@Component({
  selector: 'app-modal-sites-reset',
  templateUrl: './modal-sites-reset.component.html',
  styleUrls: ['./modal-sites-reset.component.css']
})
export class ModalSitesResetComponent implements OnInit, OnDestroy {
  @Input() public id: string;
  @Input() mode: string;
  @Input() headertext: string;
  @Input() btnalertName: string;
  @Input() bodytext: string;
  @Output() closeModalEvent = new EventEmitter();
  @Output() submitAlertContactEvent = new EventEmitter();
  getState: Observable<any>;
  private errorMessage: string | null;
  private element: any;
  checked: boolean;
  private loading: boolean;
  private domainsName: string;
  private domainId: string;
  public resetInfo: object;
  public http: boolean;
  public https: boolean;
  public ping: boolean;
  public ssl: boolean;
  constructor(private modalService: ModalsService,
              private el: ElementRef,
              private store: Store<UserState>,
              private userDashboardService: UserDashboardService,
              private actions: Actions) {
    this.element = el.nativeElement;
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.resetInfo = cloneDeep(state.resetStatuses);
      this.errorMessage = state.errorMessage;
    });
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
    this.element.style.display = 'block';
    if (event) {
      this.domainsName = event.domainLabel;
      this.domainId = event.domainId;
      this.store.dispatch(new GetResetsList(this.domainId));
      this.getState = this.store.select(selectUserState);

    }
  }

  // close modal
  close(): void {
    this.closeModalEvent.emit(null);
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }


  ResetDomains(http, https, ping, ssl): any {
    let resetInfo = {
      'http': http,
      'https': https,
      'ping': ping,
      'ssl': ssl,
      "available_ports": []
    };
    this.store.dispatch(new ResetDomainsList( {data: resetInfo, id: this.domainId}));
  }



}
