import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Activation} from '../../store/actions/user.action';
import {Store} from '@ngrx/store';
import {UserState, selectUserState} from '../../store/state/user.state';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  uid: string;
  token: string;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<UserState>,
              private authenticationService: UserService,
              private route: ActivatedRoute) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      this.token = params['token'];
      const routeParams = {
        uid: this.uid,
        token: this.token
      };
      this.store.dispatch(new Activation(routeParams));
    });

  }

}
