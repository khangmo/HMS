import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Accounts } from 'app/shared/model/accounts.model';
import { AccountsService } from './accounts.service';
import { AccountsComponent } from './accounts.component';
import { AccountsDetailComponent } from './accounts-detail.component';
import { AccountsUpdateComponent } from './accounts-update.component';
import { AccountsDeletePopupComponent } from './accounts-delete-dialog.component';
import { IAccounts } from 'app/shared/model/accounts.model';

@Injectable({ providedIn: 'root' })
export class AccountsResolve implements Resolve<IAccounts> {
    constructor(private service: AccountsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accounts: HttpResponse<Accounts>) => accounts.body));
        }
        return of(new Accounts());
    }
}

export const accountsRoute: Routes = [
    {
        path: 'accounts',
        component: AccountsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lawerApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts/:id/view',
        component: AccountsDetailComponent,
        resolve: {
            accounts: AccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lawerApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts/new',
        component: AccountsUpdateComponent,
        resolve: {
            accounts: AccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lawerApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts/:id/edit',
        component: AccountsUpdateComponent,
        resolve: {
            accounts: AccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lawerApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountsPopupRoute: Routes = [
    {
        path: 'accounts/:id/delete',
        component: AccountsDeletePopupComponent,
        resolve: {
            accounts: AccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lawerApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
