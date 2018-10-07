import { Moment } from 'moment';
import { IDistrict } from 'app/shared/model//district.model';

export interface ICity {
    id?: number;
    name?: string;
    enabled?: boolean;
    createAt?: Moment;
    updateAt?: Moment;
    cities?: IDistrict[];
}

export class City implements ICity {
    constructor(
        public id?: number,
        public name?: string,
        public enabled?: boolean,
        public createAt?: Moment,
        public updateAt?: Moment,
        public cities?: IDistrict[]
    ) {
        this.enabled = false;
    }
}
