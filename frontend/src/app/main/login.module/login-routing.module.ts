import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginScreenComponent} from 'app/main/login.module/login.screen.component/login.screen.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
