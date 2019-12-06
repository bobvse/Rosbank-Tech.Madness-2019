import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutService {
    public onStackChange: BehaviorSubject<any> = new BehaviorSubject({});
    public onStackClear: BehaviorSubject<any> = new BehaviorSubject({});
    public listeners = {
        pageMouseUp: new BehaviorSubject<any>(null),
        pageMouseDown: new BehaviorSubject<any>(null),
        pageMouseMove: new BehaviorSubject<any>(null),
    };
    private stack: any = {};

    public get(name: string) {
        return this.stack[name];
    }

    public set(name: string, value: any) {
        const stackEvent = {name: name, value: value, event: 'set'};
        if (this.listeners[name]) {
            this.listeners[name].next(stackEvent);
        }
        this.onStackChange.next(stackEvent);
        this.stack[name] = value;
    }

    public remove(name: string) {
        const stackEvent = {name: name, value: this.stack[name], event: 'remove'};
        if (this.listeners[name]) {
            this.listeners[name].next(stackEvent);
        }
        this.onStackChange.next(stackEvent);
        delete this.stack[name];
    }

    public clear() {
        this.onStackClear.next(this.stack);
        this.stack = {};
    }
}
