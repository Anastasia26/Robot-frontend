import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalConfirmComponent} from './modal-confirm/modal-confirm.component';
import {ModalContactsComponent} from './modal-contacts/modal-contacts.component';
import {ModalSitesComponent} from './modal-sites/modal-sites.component';
import {ModalSitesEditComponent} from './modal-sites-edit/modal-sites-edit.component';
import {ModalSitesResetComponent} from './modal-sites-reset/modal-sites-reset.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SpinnerComponent} from '../spinner/spinner.component';


@NgModule({
    declarations: [
        SpinnerComponent,
        ModalConfirmComponent,
        ModalContactsComponent,
        ModalSitesComponent,
        ModalSitesEditComponent,
        ModalSitesResetComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToggleButtonModule,
    ],
    exports: [
        SpinnerComponent,
        ModalConfirmComponent,
        ModalContactsComponent,
        ModalSitesComponent,
        ModalSitesEditComponent,
        ModalSitesResetComponent
    ],
})

export class ModalsModule { }
