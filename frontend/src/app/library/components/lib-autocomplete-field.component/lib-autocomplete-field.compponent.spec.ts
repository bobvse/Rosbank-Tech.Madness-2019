import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../environments/environment';
import { NKDatetime } from '../../common/ng2-datetime/ng2-datetime';
import { BackendService } from '../../services/backend.service';
import { LayoutService } from '../../services/layout.service';
import { NotifyService } from '../../services/notify.service';
import { MoneyInputComponent } from '../input/money/money-input.component';
import { LibDropdownFieldComponent } from '../lib-dropdown-field.component/lib-dropdown-field.component';
import { LibFieldComponent } from '../lib-field.component/lib-field.component';
import { LibMulticompleteComponent } from '../lib-multicomplete.component/lib-multicomplete.component';
import { LibAutocompleteFieldComponent, StackItem } from './lib-autocomplete-field.component';

describe('Library autocomplete field component test', () => {
    let component: LibAutocompleteFieldComponent;
    let fixture: ComponentFixture<LibAutocompleteFieldComponent>;
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
                NKDatetime,
            ],
            providers: [
                LayoutService,
                NotifyService,
                BackendService,
                {
                    provide: 'API',
                    useValue: environment.apiUrl,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LibAutocompleteFieldComponent) as ComponentFixture<LibAutocompleteFieldComponent>;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Sets stack properly', () => {
        const stackStub = [
            new StackItem<string>('Value 3', 'text 3'),
            new StackItem<string>('Value 5', 'text 5'),
            new StackItem<string>('Value 1', 'text 1'),
            new StackItem<string>('Value 4', 'text 4'),
            new StackItem<string>('Value 2', 'text 2'),
        ];
        const stackSortedAscStub = [
            new StackItem<string>('Value 1', 'text 1'),
            new StackItem<string>('Value 2', 'text 2'),
            new StackItem<string>('Value 3', 'text 3'),
            new StackItem<string>('Value 4', 'text 4'),
            new StackItem<string>('Value 5', 'text 5'),
        ];
        const stackSortedDescStub = [
            new StackItem<string>('Value 5', 'text 5'),
            new StackItem<string>('Value 4', 'text 4'),
            new StackItem<string>('Value 3', 'text 3'),
            new StackItem<string>('Value 2', 'text 2'),
            new StackItem<string>('Value 1', 'text 1'),
        ];

        it('should set stack properly', () => {
            component.sortDirection = 'asc';
            component.stack = stackStub;
            expect(component.stack).toEqual(stackSortedAscStub);
            component.sortDirection = 'desc';
            component.stack = stackStub;
            expect(component.stack).toEqual(stackSortedDescStub);
        });
    });

});
