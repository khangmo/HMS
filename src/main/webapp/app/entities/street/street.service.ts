import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStreet } from 'app/shared/model/street.model';

type EntityResponseType = HttpResponse<IStreet>;
type EntityArrayResponseType = HttpResponse<IStreet[]>;

@Injectable({ providedIn: 'root' })
export class StreetService {
    private resourceUrl = SERVER_API_URL + 'api/streets';

    constructor(private http: HttpClient) {}

    create(street: IStreet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(street);
        return this.http
            .post<IStreet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(street: IStreet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(street);
        return this.http
            .put<IStreet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStreet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStreet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(street: IStreet): IStreet {
        const copy: IStreet = Object.assign({}, street, {
            createAt: street.createAt != null && street.createAt.isValid() ? street.createAt.format(DATE_FORMAT) : null,
            updateAt: street.updateAt != null && street.updateAt.isValid() ? street.updateAt.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createAt = res.body.createAt != null ? moment(res.body.createAt) : null;
        res.body.updateAt = res.body.updateAt != null ? moment(res.body.updateAt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((street: IStreet) => {
            street.createAt = street.createAt != null ? moment(street.createAt) : null;
            street.updateAt = street.updateAt != null ? moment(street.updateAt) : null;
        });
        return res;
    }
}
