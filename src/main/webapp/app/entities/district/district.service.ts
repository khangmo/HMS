import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDistrict } from 'app/shared/model/district.model';

type EntityResponseType = HttpResponse<IDistrict>;
type EntityArrayResponseType = HttpResponse<IDistrict[]>;

@Injectable({ providedIn: 'root' })
export class DistrictService {
    private resourceUrl = SERVER_API_URL + 'api/districts';

    constructor(private http: HttpClient) {}

    create(district: IDistrict): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(district);
        return this.http
            .post<IDistrict>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(district: IDistrict): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(district);
        return this.http
            .put<IDistrict>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDistrict>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDistrict[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(district: IDistrict): IDistrict {
        const copy: IDistrict = Object.assign({}, district, {
            createAt: district.createAt != null && district.createAt.isValid() ? district.createAt.format(DATE_FORMAT) : null,
            updateAt: district.updateAt != null && district.updateAt.isValid() ? district.updateAt.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createAt = res.body.createAt != null ? moment(res.body.createAt) : null;
        res.body.updateAt = res.body.updateAt != null ? moment(res.body.updateAt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((district: IDistrict) => {
            district.createAt = district.createAt != null ? moment(district.createAt) : null;
            district.updateAt = district.updateAt != null ? moment(district.updateAt) : null;
        });
        return res;
    }
}
