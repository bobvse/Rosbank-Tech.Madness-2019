import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'app-action',
    template: `
        <div class="button"
             [attr.data-hook-button]="title">
            <i class="fa" [ngClass]="faIcon" *ngIf="faIcon"></i>
            {{ title }}
        </div>
    `,
    styleUrls: ['page-action.scss'],
})
export class PageAction {
    @Output() public execute = new EventEmitter();
    @Input() public title: string;
    @Input() public faIcon: string;
    @Input() public enabled = true;
    @Input() public visible = true;
    @Input() public startsGroup = false;
    public type = PageAction;

    @HostListener('click', ['$event']) public onClick(event) {
        if (!this.enabled) {
            return;
        }
        this.execute.emit(event);
    }
}
