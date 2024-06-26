import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { GroupAddComponent } from "./components/group-add/group-add.component";
import { GroupEditComponent } from "./components/group-edit/group-edit.component";
import {GroupViewComponent} from "./components/group-view/group-view.component";
import {GastoViewComponent} from "./components/gasto-view/gasto-view.component";
import { AuthGuard } from './auth.guard';
import {GastoAddComponent} from "./components/gasto-add/gasto-add.component";
import {GastoEditComponent} from "./components/gasto-edit/gasto-edit.component";
import {AmigosListComponent} from "./components/amigos-list/amigos-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterFormComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'group/add', component: GroupAddComponent, canActivate: [AuthGuard]},
  {path: 'group/:id', component: GroupEditComponent, canActivate: [AuthGuard]},
  {path: 'group/view/:id', component: GroupViewComponent, canActivate: [AuthGuard]},
  {path: 'group/gastos/:id', component: GastoViewComponent, canActivate: [AuthGuard]},
  {path: 'group/gastos/add/:id', component: GastoAddComponent, canActivate: [AuthGuard]},
  {path: 'group/gastos/edit/:id', component: GastoEditComponent, canActivate: [AuthGuard]},
  {path: 'amigos', component: AmigosListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
