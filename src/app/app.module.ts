import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDataTableModule } from 'angular-9-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { FacebookModule } from 'ngx-fb';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LoginService } from './services/login.service';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { LocalesComponent } from './components/locales/locales.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CommonModule } from '@angular/common';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { ContratoComponent } from './components/contrato/contrato.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    LoginComponent,
    ContactenosComponent,
    LocalesComponent,
    UsuarioComponent,
    NovedadesComponent,
    PropietarioComponent,
    ContratoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgxDataTableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AlifeFileToBase64Module,
    FacebookModule.forRoot(),
    CommonModule,
  ],
  providers: [LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
