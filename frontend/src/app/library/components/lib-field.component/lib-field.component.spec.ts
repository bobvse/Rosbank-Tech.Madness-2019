import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NKDatetime } from '../../common/ng2-datetime/ng2-datetime';
import { AuthenticationService, FakeAuthenticationService } from '../../services/authentication.service';
import { BackendService, FakeBackendService } from '../../services/backend.service';
import { LayoutService } from '../../services/layout.service';
import { NotifyService } from '../../services/notify.service';
import { MoneyInputComponent } from '../input/money/money-input.component';
import { LibAutocompleteFieldComponent, StackItem } from '../lib-autocomplete-field.component/lib-autocomplete-field.component';
import { LibDropdownFieldComponent } from '../lib-dropdown-field.component/lib-dropdown-field.component';
import { LibMulticompleteComponent } from '../lib-multicomplete.component/lib-multicomplete.component';
import { FieldTypes } from './common/types.enum';
import { LibFieldComponent } from './lib-field.component';

describe('Library field component test', () => {
    let component: LibFieldComponent;
    let fixture: ComponentFixture<LibFieldComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                CommonModule,
                FormsModule,
                HttpClientModule,
            ],
            declarations: [
                LibFieldComponent,
                MoneyInputComponent,
                LibAutocompleteFieldComponent,
                LibMulticompleteComponent,
                LibDropdownFieldComponent,
                NKDatetime
            ],
            providers: [
                LayoutService,
                NotifyService,
                {provide: BackendService, useClass: FakeBackendService},
                {provide: AuthenticationService, useClass: FakeAuthenticationService},
                {
                    provide: 'API',
                    useValue: environment.apiUrl,
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LibFieldComponent) as ComponentFixture<LibFieldComponent>;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set size', () => {
        component.size = 100;
        expect(component.getWidth).toEqual('100%');
        component.size = '100';
        expect(component.getWidth).toEqual('100%');
        component.size = '100.01';
        expect(component.getWidth).toEqual('100.01%');
        component.size = '100px';
        expect(component.getWidth).toEqual('100px');
        component.size = 'calc(100% - 100px)';
        expect(component.getWidth).toEqual('calc(100% - 100px)');
    });

    it('should mask number type value', function () {
        component.type = FieldTypes.Number;
        component.masked = true;
        component.value = 1000;
        expect(component.value).toEqual('1,000');
        component.value = 1000000;
        expect(component.value).toEqual('1,000,000');
    });

    it('should mask phone type value', function () {
        component.type = FieldTypes.Phone;
        component.masked = true;
        component.value = '1112223333';
        expect(component.value).toEqual('(111) 222-3333');
    });

    it('should mask zip type value', function () {
        component.type = FieldTypes.ZIP;
        component.masked = true;
        component.value = '11111';
        expect(component.value).toEqual('11111');
        component.value = '111112222';
        expect(component.value).toEqual('11111-2222');
    });

    describe('Masked value is cleared in emitted events value test', function () {
        let valueChangeSubscription: Subscription;
        let fieldValue: any;
        beforeEach(() => {
            component.masked = true;
            valueChangeSubscription = component.valueChange.subscribe(value => fieldValue = value);
        });
        afterEach(() => {
            valueChangeSubscription.unsubscribe();
        });
        it('should clear number mask', function () {
            component.type = FieldTypes.Number;
            component.value = 11111;
            expect(fieldValue).toEqual(11111);
        });
        it('should clear phone mask', function () {
            component.type = FieldTypes.Phone;
            component.value = '1112223333';
            expect(fieldValue).toEqual('1112223333');
        });
        it('should clear zip mask', function () {
            component.type = FieldTypes.ZIP;
            component.value = '11111';
            expect(fieldValue).toEqual('11111');
            component.value = '111112222';
            expect(fieldValue).toEqual('111112222');
        });
    });

    describe('Check for not emitting new event for the same value', function () {
        let valueChangeSubscription: Subscription;
        let emitCounter: number;
        beforeEach(() => {
            emitCounter = 0;
            valueChangeSubscription = component.valueChange.subscribe(value => emitCounter++);
        });
        afterEach(() => {
            valueChangeSubscription.unsubscribe();
        });
        it('should not emit new valueChange event for number value', function () {
            component.value = 11111;
            expect(emitCounter).toEqual(1);
            component.value = 11111;
            expect(emitCounter).toEqual(1);
        });
        it('should not emit new valueChange event for string value', function () {
            component.value = '';
            expect(emitCounter).toEqual(1);
            component.value = '';
            expect(emitCounter).toEqual(1);
        });
        it('should not emit new valueChange event for undefined value', function () {
            component.value = undefined;
            expect(emitCounter).toEqual(0);
        });
        it('should not emit new valueChange event for null value', function () {
            component.value = null;
            expect(emitCounter).toEqual(1);
            component.value = null;
            expect(emitCounter).toEqual(1);
        });
    });

    describe('Validation test', () => {
        beforeEach(() => {
            component.touched = true;
        });
        it('should be valid if field is not touched', function () {
            component.touched = false;
            component.required = true;
            component.value = '';
            expect(component.isInvalid).toBeFalsy();
        });
        it('should marks as invalid empty required field', function () {
            component.required = true;
            component.value = '';
            expect(component.isInvalid).toBeTruthy();
        });
        it('should validate by RegExp', function () {
            component.validateByRegExp = '^test text$';
            component.value = 'test text';
            expect(component.isInvalid).toBeFalsy();
            component.value = 'test test text';
            expect(component.isInvalid).toBeTruthy();
        });
        it('should be invalid if number value greater then max', function () {
            component.type = FieldTypes.Number;
            component.max = 100;
            component.value = 101;
            expect(component.isInvalid).toBeTruthy();
        });
        it('should be valid if number value greater then max', function () {
            component.type = FieldTypes.Number;
            component.max = 100;
            component.value = 99;
            expect(component.isInvalid).toBeFalsy();
        });
        it('should be invalid if number value less then min', function () {
            component.type = FieldTypes.Number;
            component.min = 100;
            component.value = 99;
            expect(component.isInvalid).toBeTruthy();
        });
        it('should be valid if number value less then min', function () {
            component.type = FieldTypes.Number;
            component.min = 100;
            component.value = 101;
            expect(component.isInvalid).toBeFalsy();
        });
        it('should be invalid if text value greater then max', function () {
            component.type = FieldTypes.Text;
            component.max = 15;
            component.value = 'great simple text';
            expect(component.isInvalid).toBeTruthy();
        });
        it('should be valid if text value less then max', function () {
            component.type = FieldTypes.Text;
            component.max = 15;
            component.value = 'simple text';
            expect(component.isInvalid).toBeFalsy();
        });
        it('should be invalid if text value less then min', function () {
            component.type = FieldTypes.Text;
            component.min = 15;
            component.value = 'simple text';
            expect(component.isInvalid).toBeTruthy();
        });
        it('should be valid if text value greater then min', function () {
            component.type = FieldTypes.Text;
            component.min = 15;
            component.value = 'great simple text';
            expect(component.isInvalid).toBeFalsy();
        });
        it('should be invalid if date value greater then max', function () {
            component.type = FieldTypes.Date;
            component.max = new Date('2019/02/01');
            component.value = new Date('2019/03/01');
            expect(component.isInvalid).toBeTruthy();
        });
        it('should be valid if date value less then max', function () {
            component.type = FieldTypes.Date;
            component.max = new Date('2019/02/01');
            component.value = new Date('2019/01/01');
            expect(component.isInvalid).toBeFalsy();
        });
        it('should be invalid if date value less then min', function () {
            component.type = FieldTypes.Date;
            component.min = new Date('2019/02/01');
            component.value = new Date('2019/01/01');
            expect(component.isInvalid).toBeTruthy();
        });
        it('should be valid if date value greater then min', function () {
            component.type = FieldTypes.Date;
            component.min = new Date('2019/02/01');
            component.value = new Date('2019/03/01');
            expect(component.isInvalid).toBeFalsy();
        });
        it('should be invalid if multicomplete field has empty value array', function () {
            component.type = FieldTypes.Multicomplete;
            component.required = true;
            component.stack = [
                new StackItem<any>('Value 0', 'text 0'),
                new StackItem<any>('Value 1', 'text 1'),
            ];
            component.validate();
            expect(component.isInvalid).toBeTruthy();
        });
    });
});
