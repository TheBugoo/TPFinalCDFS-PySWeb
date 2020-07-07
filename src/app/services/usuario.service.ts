import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userLoggedIn: boolean = false;
  userLogged: Usuario;
  urlBase: string = "http://localhost:3000/api/usuarios/";

  constructor(private _http:HttpClient) { }

  getUsuarios():Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({
      })
    };
    return this._http.get(this.urlBase , httpOptions)
  }
  addUsuario(usuario:Usuario):Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      })
    };
    var body = JSON.stringify(usuario);
    return this._http.post(this.urlBase , body, httpOptions)
  }
  deleteUsuario(id:string):Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase + id , httpOptions)
  }
  updateUsuario(user:Usuario):Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      })
    };
    var body = JSON.stringify(user);
    return this._http.put(this.urlBase + user._id,body , httpOptions)
  }
}
