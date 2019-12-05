import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AdminMenuComponent} from './components/admin-menu.component/admin-menu.component';
import {AdminPageContainerComponent} from './components/admin-page-container.component/admin-page-container.component';
import {FieldComponent} from './components/field.component/field.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminPageContainerComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AdminMenuComponent,
    AdminPageContainerComponent,
    FieldComponent
  ]
})
export class LibraryModule {}
