import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from 'app/services/notify.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'lib-notify',
    templateUrl: 'lib-notify.component.html',
    styleUrls: ['lib-notify.component.scss']
})
export class LibNotifyComponent implements OnInit, OnDestroy {
    @HostBinding('class.shown') public shown: boolean;
    @HostBinding('class.error') get isError () {
        return this.type === 'error';
    };
    @HostBinding('class.warning') get isWarning () {
        return this.type === 'warning';
    };
    @HostBinding('attr.data-hook-message') public text: string;
    private timeout: any;
    private messageSubscriber: Subscription;
    public type: string;

    constructor (private notify: NotifyService) {}

    public ngOnInit () {
        this.messageSubscriber = this.notify.messageListener.subscribe(message => {
            if (message === null) {
                return;
            }
            clearTimeout(this.timeout);
            this.text = message.text;
            this.type = message.type;
            this.shown = true;
            this.timeout = setTimeout(() => {
                this.shown = false;
            }, message.timeout);
        });
    }

    public ngOnDestroy () {
        if (this.messageSubscriber) {
            this.messageSubscriber.unsubscribe();
        }
    }
}
