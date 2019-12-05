import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {IndexScreenComponent} from './map.screen.component/index.screen.component';
import {IndexRoutingModule} from './index-routing.module';
import {LibraryModule} from '../../library/library.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    IndexScreenComponent,
  ],
  imports: [
    BrowserModule,
    IndexRoutingModule,
    LibraryModule,
    HttpClientModule,
  ],
  providers: []
})
export class IndexModule {
}
