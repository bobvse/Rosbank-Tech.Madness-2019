import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeRuAt from '@angular/common/locales/ru';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutService} from 'app/services/layout.service';
import {NotifyService} from 'app/services/notify.service';
import {environment} from '../environments/environment';
import {ConfigService} from 'app/services/config.service';
import {DocumentsModule} from 'app/main/documents.module/documents.module';
import {LoginModule} from 'app/main/login.module/login.module';
import {BackendService} from 'app/services/backend.service';
import {LibraryModule} from 'app/library/library.module';

registerLocaleData(localeRuAt);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DocumentsModule,
        LoginModule,
        LibraryModule,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru'},
        LayoutService,
        NotifyService,
        BackendService,
        {
            provide: 'API',
            useValue: environment.apiUrl,
            // useValue: getAPIURL(), // for test in local network
        },
        ConfigService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
