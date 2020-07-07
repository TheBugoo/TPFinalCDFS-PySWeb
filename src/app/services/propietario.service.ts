import { Injectable } from '@angular/core';
import { Propietario } from './../models/propietario'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  propietario: Propietario;
  propietarios: Array<Propietario>;
  api: string = "http://localhost:3000/api/propietario"

  constructor(private _http: HttpClient) { 
    this.propietarios = new Array<Propietario>();
    this.propietario = new Propietario();
  }
  getPropietario(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }
    return this._http.get(this.api, httpOptions);
  }
  deletePropietario(prop: Propietario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };

    return this._http.delete(this.api + '/' + prop._id, httpOptions);
  }
  getIdDisponible() {
    //var maxid: number;
    //maxid = 0;
    //for (var i = 0; i < this.asistentes.length; i++) {
    // if (maxid < this.asistentes[i].id) {
    // maxid = this.asistentes[i].id;
    //}
    //}
    //return maxid + 1;
  }
  addMensaje(prop: Propietario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(prop);
    return this._http.post(this.api, body, httpOptions);
  }
  upDateMensaje(prop: Propietario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(prop);
    return this._http.put(this.api + '/' + prop._id, body, httpOptions);
  }
}
