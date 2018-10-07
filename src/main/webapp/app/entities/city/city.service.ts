import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICity } from 'app/shared/model/city.model';

type EntityResponseType = HttpResponse<ICity>;
type EntityArrayResponseType = HttpResponse<ICity[]>;

@Injectable({ providedIn: 'root' })
export class CityService {
    private resourceUrl = SERVER_API_URL + 'api/cities';

    constructor(private http: HttpClient) {}

    create(city: ICity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(city);
        return this.http
            .post<ICity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(city: ICity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(city);
        return this.http
            .put<ICity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(city: ICity): ICity {
        const copy: ICity = Object.assign({}, city, {
            createAt: city.createAt != null && city.createAt.isValid() ? city.createAt.format(DATE_FORMAT) : null,
            updateAt: city.updateAt != null && city.updateAt.isValid() ? city.updateAt.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createAt = res.body.createAt != null ? moment(res.body.createAt) : null;
        res.body.updateAt = res.body.updateAt != null ? moment(res.body.updateAt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((city: ICity) => {
            city.createAt = city.createAt != null ? moment(city.createAt) : null;
            city.updateAt = city.updateAt != null ? moment(city.updateAt) : null;
        });
        return res;
    }
}
