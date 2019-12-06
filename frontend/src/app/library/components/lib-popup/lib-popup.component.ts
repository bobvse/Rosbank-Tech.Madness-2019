import {
    Component,
    ContentChildren,
    EventEmitter,
    HostListener,
    Input,
    Output,
    QueryList,
    ViewChild
} from '@angular/core';
import {LayoutService} from 'app/services/layout.service';
import {LibFieldComponent} from '../lib-field.component/lib-field.component';

export class PopupButton {
    public icon: string;
    public click: () => void;

    constructor(icon: string, click: () => void) {
        this.icon = icon;
        this.click = click;
    }
}

@Component({
    selector: 'lib-popup',
    templateUrl: './lib-popup.component.html',
    styleUrls: ['./lib-popup.component.scss'],
})

export class LibPopupComponent {
    public hasInvalidField: boolean;
    @ContentChildren(LibFieldComponent)
    public libFiends: QueryList<LibFieldComponent>;
    @ViewChild('overlay') public overlay: any;
    @Output() public onBeforeOpen = new EventEmitter();
    @Output() public onOpen = new EventEmitter();
    @Output() public onBeforeClose = new EventEmitter();
    @Output() public onClose = new EventEmitter();
    @Output() public openedChange = new EventEmitter();
    @Input() public size: number | string;
    @Input() public height: number | string;
    @Input() public header = '';
    @Input() public showCloseButton = true;
    @Input() public hideHeader: boolean;
    @Input() public overflow = 'auto';
    @Input() public padding = 12;
    @Input() public buttons: PopupButton[] = [];
    public _opened = false;
    public showed: boolean;

    get opened() {
        return this._opened;
    }

    @Input() set opened(value: boolean) {
        if (value === this._opened) {
            return;
        }
        if (value) {
            this.onBeforeOpen.emit();
            this._opened = value;
            this.showed = true;
            this.onOpen.emit();
            this.openedChange.emit(value);
        } else {
            this.onBeforeClose.emit();
            this.showed = false;
            this._opened = value;
            this.onClose.emit();
            this.openedChange.emit(value);
        }
    };

    constructor (private layoutService: LayoutService) {}
    @HostListener('mousedown', ['$event']) public mousedownListener (event) {
        this.layoutService.listeners.pageMouseDown.next(event);
    }
    @HostListener('click', ['$event']) public clickListener (event) {
        this.layoutService.listeners.pageMouseUp.next(event);
    }

    public getSize() {
        return (typeof this.size === 'number' || /^\d+(\.\d+)?$/.test(this.size)) && this.size + '%' ||
            typeof this.size === 'string' && this.size || 'auto';
    }

    public getHeight() {
        return (typeof this.height === 'number' || /^\d+(\.\d+)?$/.test(this.height)) && this.height + '%' ||
            typeof this.height === 'string' && this.height || 'auto';
    }

    public onOverlayClick(event: any) {
        if (event.target !== this.overlay.nativeElement) {
            return;
        }
        this.opened = false;
    }

    public show() {
        this.opened = true;
    }
}
