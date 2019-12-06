import { Input, Component, EventEmitter, Output, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {StackItem} from '../lib-autocomplete-field.component/lib-autocomplete-field.component';
import {LayoutService} from 'app/services/layout.service';

@Component({
    selector: 'lib-dropdown-field',
    templateUrl: 'lib-dropdown-field.component.html',
    styleUrls: ['lib-dropdown-field.component.scss'],
})

export class LibDropdownFieldComponent {
    @ViewChild('input') public input: ElementRef;
    @ViewChild('list') public listElement;
    @Output() public valueChange = new EventEmitter();
    @Output() public onFocus = new EventEmitter();
    @Output() public onBlur = new EventEmitter();
    @Output() public onCreate = new EventEmitter();
    @Input() public name = '';
    @Input() public formName = null;
    @Input() public readonly = false;
    @Input() public validateByRegExp = '';
    @Input() public dataHook: string;
    @Input() public createDefaultText = 'Create';
    @Input() public createEnable: boolean;
    @Input() public emptyMessage = 'Result Is Not Defined';
    @Input() public id: string;
    @Input() public turnOver = false;
    @Input() public sortDirection: 'asc' | 'desc' = 'asc';
    public editingItem: StackItem<any>;
    public inputValue: string;
    public _value: any;
    public _stack: StackItem<any>[] = [];
    public focused = false;
    public createValue = 'Create';
    private mouseUpSubscriber;
    private _heightCoeff: number;

    @Input()
    public get stack() {
        return this._stack;
    }

    public set stack(stack: StackItem<any>[]) {
        if (!!stack && typeof this.sortDirection === 'string' && /^(desc|asc)$/gi.test(this.sortDirection)) {
            stack.sort((a, b) => {
                return this.sortDirection === 'asc' &&
                    (a.text < b.text && -1 || a.text > b.text && 1 || 0) ||
                    (a.text > b.text && -1 || a.text < b.text && 1 || 0);
            });
        }
        this._stack = stack;
        if (!stack || !stack.length) {
            return;
        }
        const checkedItem = (stack || []).filter(item => {
            return item.value === this._value ||
                this._value && this._value._id && item.value && item.value._id && item.value._id === this._value._id ||
                JSON.stringify(item.value) === JSON.stringify(this._value);
        })[0];
        this._value = checkedItem && checkedItem.value;
        this.inputValue = checkedItem && checkedItem.text;
        this.valueChange.emit(checkedItem && checkedItem.value);
    }

    @Input()
    get value(): any {
        return this._value;
    }

    set value(value: any) {
        if (value === this._value) {
            return;
        }
        if (!this.stack || !this.stack.length) {
            this._value = value;
            return;
        }
        const checkedItem = (this.stack || []).filter(item => {
            return item.value === value ||
                value && value._id && item.value && item.value._id && item.value._id === value._id ||
                JSON.stringify(item.value) === JSON.stringify(value);
        })[0];
        this.inputValue = checkedItem && checkedItem.text || typeof value === 'string' && value || '';
        if (checkedItem && (checkedItem.value || checkedItem.value === 0)) {
            this._value = checkedItem.value;
            this.valueChange.emit(checkedItem.value);
        } else {
            this._value = undefined;
            this.valueChange.emit(undefined);
        }
    }

    constructor(private element: ElementRef, private layoutService: LayoutService) {
    }

    public ngOnInit() {
        this.mouseUpSubscriber = this.layoutService.listeners.pageMouseDown.subscribe(event => {
            if (
                this.focused && event && event.target &&
                (event.target as Element).closest('lib-dropdown-field') !== this.element.nativeElement ||
                this.focused && event && event.target &&
                (event.target as Element).closest('lib-dropdown-field') === this.element.nativeElement &&
                (event.target as Element).closest('.autocomplete__item') &&
                !(event.target as Element).closest('.autocomplete__item-controls') &&
                !this.editingItem
            ) {
                this.blur(event);
            }
        });
    }

    public itemClick(item: StackItem<any>, event: MouseEvent) {
        if ((event.target as Element).closest('.autocomplete__item-controls') || this.editingItem) {
            return;
        }
        this.value = item.value;
    }

    public focus(event) {
        const screenHeight = document.body.clientHeight;
        const offsetElemTop = this.element.nativeElement.getBoundingClientRect().bottom;
        const size = screenHeight - offsetElemTop;

        if (size < 90) {
            this.turnOver = true;
        }

        this.focused = true;
        this.onFocus.emit(event);
    }

    public blur(event) {
        this.focused = false;
        this.onBlur.emit(event);
    }

    public deleteItem(item: StackItem<any>) {
        this.stack = this.stack.filter(itemByFilter => itemByFilter !== item);
        item.onDelete(item);
    }

    public confirmEdit(item: StackItem<any>) {
        this.editingItem = null;
        item.onEdit(item);
    }

    public createInputKeyListener(event) {
        if (event.keyCode === 13) {
            this.onCreate.emit(this.createValue);
            this.createValue = '';
        }
    }

    public keyDownListener(event) {
        if (event.keyCode === 13 || event.keyCode === 9) {
            this.focused = false;
        }
        if (event.keyCode === 40 || event.keyCode === 38) {
            const listItems = this.listElement.nativeElement;
            listItems.scrollTop = 0;
            this._heightCoeff = 2.2;

            if (event.keyCode === 40) {
                let valueIndex = 0;
                this.stack.forEach((item, index) => valueIndex = item.value === this.value && index + 1 || valueIndex);
                if (valueIndex <= this.stack.length - 1) {
                    this._value = this.stack[valueIndex].value;
                    this.inputValue = this.stack[valueIndex].text;
                    this.valueChange.emit(this._value);
                }
            }
            if (event.keyCode === 38) {
                let valueIndex = 0;
                this.stack.forEach((item, index) => {
                    valueIndex = item.value === this.value && index - 1 || valueIndex
                });
                if (valueIndex >= 0) {
                    this._value = this.stack[valueIndex].value;
                    this.inputValue = this.stack[valueIndex].text;
                    this.valueChange.emit(this._value);
                    this._heightCoeff = 0.1;
                }
            }
        } else {
            return;
        }
    }

    // public listItemsChange(listItems) {
    //     const listHeight = listItems.clientHeight;
    //     const checkedItem = this.listElement.nativeElement.getElementsByClassName('checked')[0];
    //     listItems.scrollTop = checkedItem.offsetTop - (listHeight - (checkedItem.clientHeight * this._heightCoeff));
    // }
}
