import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { LocalesComponent } from './components/locales/locales.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { ContratoComponent } from './components/contrato/contrato.component';
 

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'contact', component: ContactenosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'locales', component: LocalesComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'propietario', component: PropietarioComponent },
  { path: 'contrato', component: ContratoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
