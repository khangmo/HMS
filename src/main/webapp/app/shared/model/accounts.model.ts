import { Moment } from 'moment';

export interface IAccounts {
    id?: number;
    login?: string;
    name?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    avatarContentType?: string;
    avatar?: any;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    password?: string;
}

export class Accounts implements IAccounts {
    constructor(
        public id?: number,
        public login?: string,
        public name?: string,
        public email?: string,
        public activated?: boolean,
        public langKey?: string,
        public avatarContentType?: string,
        public avatar?: any,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public password?: string
    ) {
        this.activated = false;
    }
}
