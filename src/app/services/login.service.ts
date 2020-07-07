import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLoggedIn: boolean = false;
  userLogged: Usuario;

  constructor(private _http:HttpClient) { }

  readonly URL_API = 'http://localhost:3000/api/usuarios/login';

  public getToken():string{
    return sessionStorage.getItem("token");
  }

  public login(usuario: string, password: string):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }) 
    } 
    let body = JSON.stringify({ usuario: usuario, password: password });
    return this._http.post(this.URL_API, body, httpOption);
  }

  public logout() {
    // reseteo las propiedades del service que indican 
    // que un usuari esta logueado y cual es el usuario logueado
    this.userLogged = new Usuario();
    this.userLoggedIn = false; 
    sessionStorage.removeItem("token"); 
  }  

}
