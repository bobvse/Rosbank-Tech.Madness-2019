import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {IndexScreenComponent} from './index.screen.component/index.screen.component';
import {IndexRoutingModule} from './index-routing.module';
import {LibraryModule} from 'app/library/library.module';
import {HttpClientModule} from '@angular/common/http';
import {GridCheckboxComponent} from 'app/main/index.module/grid-checkbox.component/grid-checkbox.component';

@NgModule({
    declarations: [
        IndexScreenComponent,
        GridCheckboxComponent,
    ],
    imports: [
        BrowserModule,
        IndexRoutingModule,
        LibraryModule,
        HttpClientModule,
    ],
    providers: [],
    entryComponents: [
        GridCheckboxComponent,
    ]
})
export class IndexModule {
}
