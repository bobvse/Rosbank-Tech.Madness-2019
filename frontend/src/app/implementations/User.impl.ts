import {IUserModel, UserRolesEnum} from 'app/models/IUser.model';

export class User implements IUserModel {
    public surname: string;
    public patronymic: string;
    constructor(
        public name: string,
        public companyId: string = null,
        public role: UserRolesEnum = UserRolesEnum.Operator,
    ) {}
}
