import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IAccounts } from 'app/shared/model/accounts.model';
import { AccountsService } from './accounts.service';

@Component({
    selector: 'jhi-accounts-update',
    templateUrl: './accounts-update.component.html'
})
export class AccountsUpdateComponent implements OnInit {
    private _accounts: IAccounts;
    isSaving: boolean;
    createdDateDp: any;
    lastModifiedDateDp: any;

    constructor(
        private dataUtils: JhiDataUtils,
        private accountsService: AccountsService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accounts }) => {
            this.accounts = accounts;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.accounts, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accounts.id !== undefined) {
            this.subscribeToSaveResponse(this.accountsService.update(this.accounts));
        } else {
            this.subscribeToSaveResponse(this.accountsService.create(this.accounts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccounts>>) {
        result.subscribe((res: HttpResponse<IAccounts>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get accounts() {
        return this._accounts;
    }

    set accounts(accounts: IAccounts) {
        this._accounts = accounts;
    }
}
