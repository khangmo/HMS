import { Moment } from 'moment';
import { IDistrict } from 'app/shared/model//district.model';

export interface IStreet {
    id?: number;
    name?: string;
    enabled?: boolean;
    createAt?: Moment;
    updateAt?: Moment;
    district?: IDistrict;
}

export class Street implements IStreet {
    constructor(
        public id?: number,
        public name?: string,
        public enabled?: boolean,
        public createAt?: Moment,
        public updateAt?: Moment,
        public district?: IDistrict
    ) {
        this.enabled = false;
    }
}
