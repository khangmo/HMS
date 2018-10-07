import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LawerSharedModule } from 'app/shared';
import {
    AccountsComponent,
    AccountsDetailComponent,
    AccountsUpdateComponent,
    AccountsDeletePopupComponent,
    AccountsDeleteDialogComponent,
    accountsRoute,
    accountsPopupRoute
} from './';

const ENTITY_STATES = [...accountsRoute, ...accountsPopupRoute];

@NgModule({
    imports: [LawerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountsComponent,
        AccountsDetailComponent,
        AccountsUpdateComponent,
        AccountsDeleteDialogComponent,
        AccountsDeletePopupComponent
    ],
    entryComponents: [AccountsComponent, AccountsUpdateComponent, AccountsDeleteDialogComponent, AccountsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LawerAccountsModule {}
