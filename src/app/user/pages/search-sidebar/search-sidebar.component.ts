import {Component, Directive, OnInit, EventEmitter, Output} from '@angular/core';
import {ModalsService} from '../../../shared/services/modals.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../core/store/state/user.state';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SitesListModel} from '../model/sites-list.model';
import {GetDomainsList, GetIpAddressesList, DeleteDomainsItem} from '../../../core/store/actions/user-info.action';
import {Actions} from '@ngrx/effects';
import {UserDashboardService} from '../services/user-dashboard.service';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ display: 'block'})),
      state('false', style({ display: 'none' })),
      transition('false <=> true', [ animate(200) ]),
    ])
  ]
})
@Directive({
  selector: '[clickOutside]'
})
export class SearchSidebarComponent implements OnInit {
  domainsInfo: SitesListModel[] = [];
  hierarchy: SitesListModel[] = [];
  newHierarchy: any;
  getState: Observable<any>;
  errorMessage: string | null;
  menuTopLeftPosition =  {position: '', x: '0', y: '0', visibility: 'hidden'};
  menuDeletePosition =  {visibility: 'hidden'};
  public menuID: number;
  public domainName: string;
  public numberForDelete: number;
  public anotherNumberForDelete: number;
  public openedMenuCoordinate: number;
  rusultNum: number;
  private loading: boolean;
  isMainDomain: boolean;
  @Output() clickChange: EventEmitter<number> = new EventEmitter();
  constructor(private modalsService: ModalsService, private userDashboardService: UserDashboardService, private actions: Actions, private store: Store<UserState>) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.domainsInfo = state.domainsInfo;
      const convertToString = JSON.stringify(this.domainsInfo);
      var replaced_keys = {
        'name' : 'label',
        'subdomains' : 'children'
      };
      const convertToJsonData = this.replaceAll(convertToString, replaced_keys);
      this.hierarchy = JSON.parse(convertToJsonData);
      this.newHierarchy = this.hierarchy;
    });
  }

  replaceAll(str, map): any {
    for (let i in map){
      str = str.replaceAll(i, map[i]);
    }
    return str;
  }

  ngOnInit(): void {
    this.store.dispatch(new GetDomainsList());
  }

  scrollToDomain(id, name): any {
    this.userDashboardService.scrollToDomainDetails({domain_id: id, domain_name: name});
    this.store.dispatch(new GetIpAddressesList(id));
  }

  openModalsSitesForm(): any {
    this.modalsService.open('modalsSites');
  }

  hideMenu(exists): any {
    if (!exists) {
      this.menuTopLeftPosition.visibility = 'hidden !important';
      this.menuDeletePosition.visibility = 'hidden !important';
    }
  }

  searchDomain(value): any {
    if (value) {
      this.newHierarchy = this.hierarchy.filter(record => record.label.includes(value));
    } else {
      this.newHierarchy = this.hierarchy;
    }
  }
  OpenMenu(e, id, is_main, label): any {
    this.menuID = id;
    this.isMainDomain = is_main;
    this.domainName = label;
    e.preventDefault();
    this.menuTopLeftPosition.x = e.clientX - 185 + 'px';
    this.menuTopLeftPosition.y = e.pageY + 15 + 'px';
    this.menuTopLeftPosition.visibility = 'visible !important';
    this.openedMenuCoordinate = e.pageY;
  }

  OpenDeleteMenu(e): any {
    this.numberForDelete = Math.floor(Math.random() * 10);
    this.anotherNumberForDelete = Math.floor(Math.random() * 10);
    e.preventDefault();
    this.menuDeletePosition.visibility = 'visible !important';
  }

  deleteDomain(firstNumber, secondNumber, userResult): any {
    this.rusultNum = null;
    const trueValue = firstNumber + secondNumber;
    const userValue = parseInt(userResult, 10);
    if (userValue === trueValue) {
      this.store.dispatch(new DeleteDomainsItem({id: this.menuID.toString(), is_main: this.isMainDomain}));
    }
  }

  openEditSitesForm(): any {
    this.modalsService.open('modalsEditSites', {editId: this.menuID});
  }

  OpenResetMenu(): any {
    this.modalsService.open('modalsReset', {domainLabel: this.domainName, domainId: this.menuID.toString()});
  }
}
