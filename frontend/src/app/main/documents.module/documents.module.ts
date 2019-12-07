import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LibraryModule} from 'app/library/library.module';
import {HttpClientModule} from '@angular/common/http';
import {DocumentsScreenComponent} from 'app/main/documents.module/documents.screen.component/documents.screen.component';
import {DocumentsRoutingModule} from 'app/main/documents.module/documents-routing.module';
import {GridCheckboxComponent} from 'app/main/documents.module/grid-checkbox.component/grid-checkbox.component';

@NgModule({
    declarations: [
        DocumentsScreenComponent,
        GridCheckboxComponent,
    ],
    imports: [
        BrowserModule,
        DocumentsRoutingModule,
        LibraryModule,
        HttpClientModule,
    ],
    providers: [],
    entryComponents: [
        GridCheckboxComponent,
    ]
})
export class DocumentsModule {
}
