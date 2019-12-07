import {Injectable} from '@angular/core';
import { Error } from 'tslint/lib/error';

export enum AppConfigEnum {
    Login = 'login',
}

export interface IConfigService {
    get<T>(name: AppConfigEnum): T;
    set<T>(name: AppConfigEnum, value: T): void
}

@Injectable()
export class ConfigService implements IConfigService {
    constructor () {
        localStorage.setItem('appConfig', localStorage.getItem('appConfig') || '{}');
    }

    public get<T>(name: AppConfigEnum): T {
        return JSON.parse(localStorage.getItem('appConfig') || '{}')[name];
    }

    public set<T>(name: AppConfigEnum, value: T): void {
        const appConfig = JSON.parse(localStorage.getItem('appConfig') || '{}');
        appConfig[name] = value;
        localStorage.setItem('appConfig', JSON.stringify(appConfig));
    }
}

@Injectable()
export class FakeConfigService implements IConfigService {
    private config: {[key: string]: any} = {};

    public get<T>(name: AppConfigEnum): T {
        return this.config[name];
    }

    public set<T>(name: AppConfigEnum, value: T): void {
        if (!value) {
            throw new Error(`You tried to set undefined value for config "${name}"`);
        }
        this.config[name] = value;
    }
}
