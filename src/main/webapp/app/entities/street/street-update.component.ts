import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStreet } from 'app/shared/model/street.model';
import { StreetService } from './street.service';
import { IDistrict } from 'app/shared/model/district.model';
import { DistrictService } from 'app/entities/district';

@Component({
    selector: 'jhi-street-update',
    templateUrl: './street-update.component.html'
})
export class StreetUpdateComponent implements OnInit {
    private _street: IStreet;
    isSaving: boolean;

    districts: IDistrict[];
    createAtDp: any;
    updateAtDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private streetService: StreetService,
        private districtService: DistrictService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ street }) => {
            this.street = street;
        });
        this.districtService.query().subscribe(
            (res: HttpResponse<IDistrict[]>) => {
                this.districts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.street.id !== undefined) {
            this.subscribeToSaveResponse(this.streetService.update(this.street));
        } else {
            this.subscribeToSaveResponse(this.streetService.create(this.street));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStreet>>) {
        result.subscribe((res: HttpResponse<IStreet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDistrictById(index: number, item: IDistrict) {
        return item.id;
    }
    get street() {
        return this._street;
    }

    set street(street: IStreet) {
        this._street = street;
    }
}
