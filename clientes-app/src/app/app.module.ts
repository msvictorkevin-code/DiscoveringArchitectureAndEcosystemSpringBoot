import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID} from '@angular/core';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
import {RouterModule, Routes} from '@angular/router'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormComponent} from './clientes/form.component';
import {FormsModule} from '@angular/forms';
import localeES from '@angular/common/locales/es';
import {formatDate, DatePipe, registerLocaleData} from '@angular/common';
import {PaginatorComponent} from './paginator/paginator.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DetalleComponent} from './clientes/detalle/detalle.component';
import {LoginComponent} from './usuarios/login.component';
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";
import {AuthInterceptor} from "./usuarios/interceptors/auth.interceptor";

registerLocaleData(localeES, 'es');


const ROUTES: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
//  {path: '', component: PaginatorComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {
    path: 'clientes/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  /*, {path: 'clientes/ver/:id', component: DetalleComponent}*/
  {path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(ROUTES)

  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
