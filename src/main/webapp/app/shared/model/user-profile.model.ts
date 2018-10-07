import { IUser } from 'app/core/user/user.model';

export interface IUserProfile {
    id?: number;
    avatarContentType?: string;
    avatar?: any;
    address?: string;
    user?: IUser;
}

export class UserProfile implements IUserProfile {
    constructor(public id?: number, public avatarContentType?: string, public avatar?: any, public address?: string, public user?: IUser) {}
}
