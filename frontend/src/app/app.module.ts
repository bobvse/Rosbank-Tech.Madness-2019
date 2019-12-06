import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRuAt from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IndexModule} from './main/index.module/index.module';
import {LayoutService} from 'app/services/layout.service';
import {NotifyService} from 'app/services/notify.service';
import {environment} from '../environments/environment';

registerLocaleData(localeRuAt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    LayoutService,
    NotifyService,
    {
      provide: 'API',
      useValue: environment.apiUrl,
      // useValue: getAPIURL(), // for test in local network
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
