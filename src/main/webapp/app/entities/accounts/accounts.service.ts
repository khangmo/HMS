import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccounts } from 'app/shared/model/accounts.model';

type EntityResponseType = HttpResponse<IAccounts>;
type EntityArrayResponseType = HttpResponse<IAccounts[]>;

@Injectable({ providedIn: 'root' })
export class AccountsService {
    private resourceUrl = SERVER_API_URL + 'api/accounts';

    constructor(private http: HttpClient) {}

    create(accounts: IAccounts): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(accounts);
        return this.http
            .post<IAccounts>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(accounts: IAccounts): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(accounts);
        return this.http
            .put<IAccounts>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAccounts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAccounts[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(accounts: IAccounts): IAccounts {
        const copy: IAccounts = Object.assign({}, accounts, {
            createdDate: accounts.createdDate != null && accounts.createdDate.isValid() ? accounts.createdDate.format(DATE_FORMAT) : null,
            lastModifiedDate:
                accounts.lastModifiedDate != null && accounts.lastModifiedDate.isValid()
                    ? accounts.lastModifiedDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((accounts: IAccounts) => {
            accounts.createdDate = accounts.createdDate != null ? moment(accounts.createdDate) : null;
            accounts.lastModifiedDate = accounts.lastModifiedDate != null ? moment(accounts.lastModifiedDate) : null;
        });
        return res;
    }
}
