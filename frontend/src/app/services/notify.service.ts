import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class NotifyMessage {
    public text: string;
    public type: 'notify' | 'warning' | 'error';
    public timeout: number;

    constructor(text: string, type?: 'notify' | 'warning' | 'error', timeout?: number) {
        this.text = text;
        this.type = type || 'notify';
        this.timeout = timeout || 2200;
    }
}

@Injectable()
export class NotifyService {
    public messageListener: Subject<NotifyMessage> = new Subject<NotifyMessage>();

    public show(message: string, type?: 'notify' | 'warning' | 'error', timeout?: number) {
        this.messageListener.next(new NotifyMessage(message, type, timeout));
    }
}
