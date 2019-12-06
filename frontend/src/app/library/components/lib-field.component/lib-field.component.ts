import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {BackendService} from 'app/services/backend.service';
import {LayoutService} from 'app/services/layout.service';
import {NotifyService} from 'app/services/notify.service';
import masks from './common/masks.model';
import {FieldTypes} from './common/types.enum';

export class LibFieldControl {
    constructor(
        public icon: string,
        public click?: () => void,
    ) {}
}

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

@Component({
    selector: 'lib-field',
    templateUrl: './lib-field.component.html',
    styleUrls: ['lib-field.component.scss'],
})
export class LibFieldComponent {
    @ViewChild('uploadFileInput') public uploadFileInput: ElementRef;
    @Output() public valueChange = new EventEmitter();
    @Output() public exec = new EventEmitter();
    @Output() public onFocus = new EventEmitter();
    @Output() public onBlur = new EventEmitter();
    @Output() public onDelete = new EventEmitter();
    @Output() public onEdit = new EventEmitter();
    @Output() public onCreate = new EventEmitter();
    @Output() public onKeyUp = new EventEmitter<KeyboardEvent>();
    @Input() public deleteEnable: boolean;
    @Input() public editEnable: boolean;
    @Input() public createEnable: boolean;
    @Input() public placeholder = '';
    @Input() public hook = '';
    @Input() public formName = null;
    @Input() public formGroupName = null;
    @Input() public type: FieldTypes;
    @Input() public readonly = false;
    @Input() public hidden = false;
    @Input() public align: 'left' | 'right';
    @Input() public choices: [{ Value: string, Text: string }];
    @Input() public autoValue: string;
    @Input() public fileTypes: string;
    @Input() public checked = false;
    @Input() public minViewMode: string;
    @Input() public masked = false;
    @Input() public uploadInterceptor;
    @Input() public interceptorError;
    @Input() public required = false;
    @Input() public errorText = 'Field Is Required';
    @Input() public max: number | Date;
    @Input() public min: number | Date;
    @Input() public stack: StackItem<any>[] = [];
    @Input() public list: string[];
    @Input() public validateByRegExp = '';
    @Input() public validateExec: (value: any) => boolean;
    @Input() public trimExtension: boolean;
    @Input() public clearTime = true;
    @Input() public flag: 'right' | 'left' = 'left';
    @Input() public padding: 'left right' | 'right left' | 'right' | 'left' | false = 'left right';
    @Input() public _size: number | string = 100;
    @Input() public id: string;
    @Input() public maxDate: Date;
    @Input() public minDate: Date;
    @Input() public sortDirection: 'asc' | 'desc' = 'asc';
    @Input() public searchEnable: boolean;
    @Input() public size: number | string;
    @Input() public multicompleteCheckingDisable: boolean;
    @Input() public typingDisable: boolean;
    @Input() public actionAccesses: string[] = [];
    @Input() public viewAccesses: string[] = [];
    @Input() public urlUpload: string;
    @Input() public downloadFileDisabled = false;
    @Input() public controls: LibFieldControl[] = [];
    public actionAccess: boolean;
    public viewAccess: boolean;
    public isInvalid = false;
    public touched: boolean;
    public focused: boolean;
    private layoutFieldsSubscribe: any;
    private _value: any;
    private _label = '';
    private _date_value: any;
    public leftPaddingNone = false;
    public fileName: string;

    constructor(
        private layoutService: LayoutService,
        private notify: NotifyService,
        private backendService: BackendService,
    ) {
        this.id = '' + Math.random();
    }

    @HostBinding('style.display') public get displayStyle() {
        return this.viewAccess && 'block' || 'none';
    };
    @HostBinding('style.width') get getWidth() {
        return (typeof this.size === 'number' || /^\d+(\.\d+)?$/.test(this.size as string)) && this.size + '%' ||
            typeof this.size === 'string' && this.size || 'auto';
    }

    @HostBinding('style.float') get getFlag() {
        return this.flag;
    }

    @HostBinding('style.padding') get getPadding() {
        switch (this.padding) {
            case 'left right':
                this.leftPaddingNone = false;
                return '0 12px';
            case 'right left':
                this.leftPaddingNone = false;
                return '0 12px';
            case 'left':
                this.leftPaddingNone = false;
                return '0 0 0 12px';
            case 'right':
                this.leftPaddingNone = true;
                return '0 12px 0 0';
        }
        return '0';
    }

    @Input()
    get value(): any {
        let result = null;
        if (this.masked && masks[this.type]) {
            result = masks[this.type].getWithMask(this._value);
        }
        if (result !== null) {
            this._value = result;
        }
        if (this.type === 'multicomplete' && !this._value) {
            return [];
        }
        return this._value;
    }

    set value(value: any) {
        if (
            value === this._value ||
            this._value && value && this._value._id && value._id && this._value._id === value._id
        ) {
            return;
        }
        if (this.type === FieldTypes.File) {
            this.fileName = value && value.fileName || '';
        }
        this._value = value;
        if (this.masked && masks[this.type]) {
            this._value = masks[this.type].getWithoutMask(value);
        }
        this.validate();
        this.valueChange.emit(this._value);
    }

    @Input()
    public get label() {
        return this._label + (this.required && ' *' || '');
    }

    public set label(value: string) {
        this._label = value;
    };

    @HostBinding('class.invalid') get checkInvalidValue() {
        return this.isInvalid;
    }

    public validate() {
        if (this.validateExec) {
            this.isInvalid = this.validateExec(this._value);
            return this.isInvalid;
        }
        if (!this.required && !this._value && this._value !== 0 || !this.touched || this.type === 'button') {
            this.isInvalid = false;
            return false;
        }
        let isInvalid = this.required && !this._value && this._value !== 0;

        if ((!this.type || this.type === FieldTypes.Text) && !!this.validateByRegExp) {
            isInvalid = isInvalid || !new RegExp(this.validateByRegExp).test(this._value);
        }
        if (this.type === FieldTypes.ZIP && this.validateByRegExp) {
            isInvalid = isInvalid || !new RegExp(this.validateByRegExp).test(this._value);
        }
        if (this.masked && masks[this.type] && !!this.validateByRegExp) {
            isInvalid = isInvalid || !new RegExp(this.validateByRegExp, 'g').test(this.value);
        }
        isInvalid = isInvalid || this.required && !this._value && this._value !== 0;
        if (this.max || this.min || (this.max === 0 || this.min === 0) && this.type === FieldTypes.Number) {
            switch (this.type) {
                case FieldTypes.Text: {
                    isInvalid = isInvalid ||
                        (this.max || this.max === 0) && this._value.length > this.max ||
                        (this.min || this.min === 0) && this._value.length < this.min;
                    break;
                }
                case FieldTypes.Number: {
                    isInvalid = isInvalid ||
                        (this.max || this.max === 0) && +this._value > this.max ||
                        (this.min || this.min === 0) && +this._value < this.min;
                    break;
                }
                case 'date': {
                    const valueDate = new Date(this._value).getTime();
                    isInvalid = isInvalid ||
                        (this.max || new Date(this.max).getTime() === 0) && valueDate > new Date(this.max).getTime() ||
                        (this.min || new Date(this.min).getTime() === 0) && valueDate < new Date(this.min).getTime();
                    break;
                }
            }
        }
        if (
            (this.type === 'multicomplete' && this.touched && !this._value && this.required) ||
            (this.required && this._value && this._value.length === 0)
        ) {
            isInvalid = true;
        }

        this.isInvalid = isInvalid;
        return this.isInvalid;
    }

    public focus(event) {
        this.touched = true;
        this.focused = true;
        this.onFocus.emit(event);
    }

    public blur(event) {
        this.touched = true;
        this.validate();
        this.focused = false;
        this.onBlur.emit(event);
    }

    public toggleCheckbox() {
        if (this.readonly) {
            return;
        }
        this.value = !this.value;
    }

    public setNumberValue($event) {
        this.value = $event.target.value.replace(/,+/gi, '.').replace(/\.(.*\.)/gi, '$1').replace(/([^\-\d.])*/gi, '');
        $event.target.value = this.value;
        this.onKeyUp.emit($event);
    }

    public async uploadFile(event, urlUpload = 'documents') {
        if (this.uploadInterceptor && await this.uploadInterceptor(event) === false) {
            if (this.interceptorError) {
                this.interceptorError(event, this);
            }
            return;
        }
        const fileBrowser = event.target;
        if (fileBrowser.files && fileBrowser.files[0]) {
            try {
                const formData = new FormData();
                formData.append('files', fileBrowser.files[0]);
                this.backendService.post<any[]>(urlUpload, formData).then(files => {
                    this.value = files[0];
                });
                this.uploadFileInput.nativeElement.value = '';
            } catch (e) {
                console.error(`Upload file error. ${e}`);
            }
        }
    }
}
