import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentsScreenComponent} from 'app/main/documents.module/documents.screen.component/documents.screen.component';

const routes: Routes = [
  {
    path: 'documents',
    component: DocumentsScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
