import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AdminMenuComponent} from './components/admin-menu.component/admin-menu.component';
import {AdminPageContainerComponent} from './components/admin-page-container.component/admin-page-container.component';
import {FieldComponent} from './components/field.component/field.component';
import {FormsModule} from '@angular/forms';
import {LibGridComponent} from 'app/library/components/lib-grid.component/lib-grid.component';
import {LibFieldComponent} from 'app/library/components/lib-field.component/lib-field.component';
import {
    LibAutocompleteFieldComponent,
    ListPipe
} from 'app/library/components/lib-autocomplete-field.component/lib-autocomplete-field.component';
import {LibPopupComponent} from 'app/library/components/lib-popup/lib-popup.component';
import {LibDropdownFieldComponent} from 'app/library/components/lib-dropdown-field.component/lib-dropdown-field.component';
import {LibGridCellWidthPipe} from 'app/library/components/lib-grid.component/pipes/lib-grid-cell-width.pipe';
import {LibGridCellAnchorDirective} from 'app/library/components/lib-grid.component/directives/lib-grid-cell-anchor.directive';
import {LibGridCellValueViewPipe} from 'app/library/components/lib-grid.component/pipes/lib-grid-cell-value-view.pipe';
import {LibGridCellClassPipe} from 'app/library/components/lib-grid.component/pipes/lib-grid-cell-class.pipe';
import {HeaderBarComponent} from 'app/library/components/header-bar/header-bar.component';
import {PageAction} from 'app/library/components/header-bar/page-action';

@NgModule({
    declarations: [
        AdminMenuComponent,
        AdminPageContainerComponent,
        FieldComponent,
        LibGridComponent,
        LibFieldComponent,
        LibAutocompleteFieldComponent,
        LibDropdownFieldComponent,
        ListPipe,
        LibPopupComponent,
        LibGridCellWidthPipe,
        LibGridCellAnchorDirective,
        LibGridCellValueViewPipe,
        LibGridCellClassPipe,
        HeaderBarComponent,
        PageAction,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        AdminMenuComponent,
        AdminPageContainerComponent,
        LibAutocompleteFieldComponent,
        LibDropdownFieldComponent,
        LibFieldComponent,
        LibGridComponent,
        HeaderBarComponent,
        LibPopupComponent,
        PageAction,
    ]
})
export class LibraryModule {
}
