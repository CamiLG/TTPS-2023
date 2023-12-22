import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { GroupAddComponent } from "./components/group-add/group-add.component";
import { GroupEditComponent } from "./components/group-edit/group-edit.component";
import {GroupViewComponent} from "./components/group-view/group-view.component";
import {GastoViewComponent} from "./components/gasto-view/gasto-view.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterFormComponent},
  {path: 'home', component: HomeComponent},
  {path: 'group/add', component: GroupAddComponent},
  {path: 'group/:id', component: GroupEditComponent},
  {path: 'group/view/:id', component: GroupViewComponent},
  {path: 'group/gastos/:id', component: GastoViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
