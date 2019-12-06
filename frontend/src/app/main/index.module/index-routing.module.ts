import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexScreenComponent} from './index.screen.component/index.screen.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
