export enum UserRolesEnum {
    Director = 'Director',
    Accountant = 'Accountant',
    Operator = 'Operator',
}

export interface IUserModel {
    name: string;
    surname: string;
    patronymic: string;
    companyId: string;
    role: UserRolesEnum;
}
