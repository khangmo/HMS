import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAccounts } from 'app/shared/model/accounts.model';
import { Principal } from 'app/core';
import { AccountsService } from './accounts.service';

@Component({
    selector: 'jhi-accounts',
    templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit, OnDestroy {
    accounts: IAccounts[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountsService: AccountsService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accountsService.query().subscribe(
            (res: HttpResponse<IAccounts[]>) => {
                this.accounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccounts) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('accountsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
