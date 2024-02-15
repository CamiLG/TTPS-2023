import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { HomeComponent } from './components/home/home.component';
import {AppFooterComponent} from "./components/app-footer/app-footer.component";
import {
  CardBodyComponent,
  CardComponent, CardFooterComponent, CardImgDirective,
  ColComponent, ColDirective,
  ContainerComponent,
  FooterComponent, GutterDirective, PlaceholderDirective,
  RowComponent
} from "@coreui/angular";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GroupAddComponent } from './components/group-add/group-add.component'
import {MatSelectModule} from "@angular/material/select";
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { GroupViewComponent } from './components/group-view/group-view.component';
import {MatCardModule} from "@angular/material/card";
import { GastoViewComponent } from './components/gasto-view/gasto-view.component';
import { GastoAddComponent } from './components/gasto-add/gasto-add.component';
import { GastoEditComponent } from './components/gasto-edit/gasto-edit.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomeComponent,
    AppFooterComponent,
    GroupAddComponent,
    GroupEditComponent,
    GroupViewComponent,
    GastoViewComponent,
    GastoAddComponent,
    GastoEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    AppNavComponent,
    ReactiveFormsModule,
    FooterComponent,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    GutterDirective,
    MatSelectModule,
    MatCardModule,
    CardImgDirective,
    ColDirective,
    PlaceholderDirective,
    MatSnackBarModule

  ],
  providers: [
    importProvidersFrom(HttpClientModule),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
