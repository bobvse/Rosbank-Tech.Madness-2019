import {ICompanyModel} from 'app/models/ICompany.model';

export class Company implements ICompanyModel {
    public id: string;
    constructor(
        public name: string,
        public balance: number,
    ) {}
}
