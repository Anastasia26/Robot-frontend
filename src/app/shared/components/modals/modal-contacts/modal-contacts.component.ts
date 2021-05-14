import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ModalsService} from '../../../services/modals.service';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {UserDashboardService} from '../../../../user/pages/services/user-dashboard.service';
import {Actions} from '@ngrx/effects';
import {ClearAllFailureMessage} from '../../../../core/store/actions/user.action';

@Component({
  selector: 'app-modal-contacts',
  templateUrl: './modal-contacts.component.html',
  styleUrls: ['./modal-contacts.component.css']
})
export class ModalContactsComponent implements OnInit, OnDestroy {
  formEmail: FormGroup;
  getState: Observable<any>;
  @Input() public id: string;
  @Input() mode: string;
  @Input() headertext: string;
  @Input() btnalertName: string;
  @Input() bodytext: string;
  @Output() closeModalEvent = new EventEmitter();
  @Output() submitAlertContactEvent = new EventEmitter();
  private element: any;
  private errorMessage: string | null;
  private loading: boolean;
  constructor(private modalService: ModalsService,
              private el: ElementRef,
              private store: Store<UserState>,
              private userDashboardService: UserDashboardService,
              private actions: Actions) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.formEmail = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.errorMessage = null;
    //this.store.dispatch(new ClearAllFailureMessage());
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

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(event): void {
    this.loading = false;
    this.formEmail.get('email').setValue('');
    if (event) {
      this.formEmail.get('email').setValue(event);
    }
    this.element.style.display = 'block';
  }

  // close modal
  close(): void {
    this.closeModalEvent.emit(null);
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  createEmailAlertContact(): void {
    this.loading = true;
    this.submitAlertContactEvent.emit(this.formEmail.value.email);
  }

}
