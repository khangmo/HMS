import { Moment } from 'moment';
import { ICity } from 'app/shared/model//city.model';
import { IStreet } from 'app/shared/model//street.model';

export interface IDistrict {
    id?: number;
    name?: string;
    enabled?: boolean;
    createAt?: Moment;
    updateAt?: Moment;
    city?: ICity;
    districts?: IStreet[];
}

export class District implements IDistrict {
    constructor(
        public id?: number,
        public name?: string,
        public enabled?: boolean,
        public createAt?: Moment,
        public updateAt?: Moment,
        public city?: ICity,
        public districts?: IStreet[]
    ) {
        this.enabled = false;
    }
}
