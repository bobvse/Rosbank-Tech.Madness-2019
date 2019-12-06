import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Pipe,
    PipeTransform,
    ViewChild,
} from '@angular/core';

export class StackItemControl<T> {
    constructor(
        public icon: string,
        public click: (
            control: StackItemControl<T>,
            item: StackItem<T>) => void,
        public hide?: boolean,
        public isHovered?: boolean
    ) {}
}

export class StackItem<T> {
    constructor(
        public value: T,
        public text: string,
        public onEdit?: (item: StackItem<T>) => void,
        public onDelete?: (item: StackItem<T>) => void,
        public controls?: StackItemControl<T>[],
    ) {}
}

@Pipe({
    name: 'toOptionlist',
})
export class ListPipe implements PipeTransform {
    public transform(value: any[], ...args: string[]): any {
        if (value === null) {
            return value;
        }
        return value.map(x => {
            return args.length === 2 ? {value: x[args[0]], text: x[args[1]]} : {value: x, text: x};
        });
    }
}


@Component({
    selector: 'lib-autocomplete-field',
    templateUrl: 'lib-autocomplete-field.component.html',
    styleUrls: ['lib-autocomplete-field.component.scss'],
})
export class LibAutocompleteFieldComponent implements OnInit {
    @ViewChild('input') public input: ElementRef;
    @ViewChild('list') public listElement: ElementRef;
    @Output() public valueChange = new EventEmitter();
    @Output() public onFocus = new EventEmitter();
    @Output() public onBlur = new EventEmitter();
    @Input() public name = '';
    @Input() public readonly = false;
    @Input() public turnOver = false;
    @Input() public validateByRegExp = '';
    @Input() public dataHook: string;
    @Input() public id: string;
    @Input() public sortDirection: 'asc' | 'desc' = 'asc';
    private componentIsDirty: boolean;
    private changeDetectorTimer: any;
    public filteredStack: StackItem<any>[] = [];
    public focused = false;
    private _heightCoeff: number;
    private _value: any;
    private _inputValue: string;
    private _stack: StackItem<any>[] = [];

    @Input()
    public get stack(): StackItem<any>[] {
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
        this.inputValue = checkedItem && checkedItem.text;
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
        this.inputValue = checkedItem && checkedItem.text;
    }

    public get inputValue() {
        return this._inputValue;
    }

    public set inputValue(value: string) {
        this._inputValue = value || '';
        this.search();
        if (!value && this._value) {
            this._value = undefined;
            this.valueChange.emit(this._value);
            return;
        }
        let checkedItem = this.stack.filter(item => value === item.text)[0];
        checkedItem = checkedItem && checkedItem.value;
        if (checkedItem) {
            this._value = checkedItem;
            this.valueChange.emit(checkedItem);
        }
    }

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    public ngOnInit() {
        this.search();
    }

    public focus(event) {
        const element = document.getElementById(this.id);
        const screenHeight = document.body.clientHeight;
        const offsetElemTop = element.getBoundingClientRect().bottom;
        const size = screenHeight - offsetElemTop;
        if (size < 90) {
            this.turnOver = true;
        }

        this.focused = true;
        this.onFocus.emit(event);
        this.search();
    }

    public blur(event) {
        this.focused = false;
        this.onBlur.emit(event);
    }

    public search() {
        const searchRegexp = new RegExp('(' + (this._inputValue || '').replace(/([()])/g, '\\$1').replace(' ', '|') + ')', 'i');
        this.filteredStack = (this.stack || []).filter(item => searchRegexp.test(item.text));
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
                    this._inputValue = this.stack[valueIndex].text;
                    this.valueChange.emit(this._value);
                }
            }
            if (event.keyCode === 38) {
                let valueIndex = 0;
                this.stack.forEach((item, index) => {
                    valueIndex = item.value === this.value && index - 1 || valueIndex;
                });
                if (valueIndex >= 0) {
                    this._value = this.stack[valueIndex].value;
                    this._inputValue = this.stack[valueIndex].text;
                    this.valueChange.emit(this._value);
                    this._heightCoeff = 0.1;
                }
            }
        } else {
            return;
        }
    }

    public checkItem(item: StackItem<any>) {
        this.inputValue = item.text;
        this.input.nativeElement.blur();
    }
}
