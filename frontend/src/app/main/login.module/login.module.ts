import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LibraryModule} from 'app/library/library.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginScreenComponent} from 'app/main/login.module/login.screen.component/login.screen.component';
import {LoginRoutingModule} from 'app/main/login.module/login-routing.module';

@NgModule({
    declarations: [
        LoginScreenComponent,
    ],
    imports: [
        BrowserModule,
        LoginRoutingModule,
        LibraryModule,
        HttpClientModule,
    ],
    providers: [],
})
export class LoginModule {
}
