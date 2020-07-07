import { Injectable } from '@angular/core';
import { Contrato } from './../models/contrato'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  contrato: Contrato;
  contratos: Array<Contrato>;
  api: string = "http://localhost:3000/api/contrato"

  constructor(private _http: HttpClient) {
    this.contratos = new Array<Contrato>();
    this.contrato = new Contrato();
  }
  getContrato(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }
    return this._http.get(this.api, httpOptions);
  }
  deleteContrato(con: Contrato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };

    return this._http.delete(this.api + '/' + con._id, httpOptions);
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
  addContrato(con: Contrato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(con);
    return this._http.post(this.api, body, httpOptions);
  }
  upDateMensaje(con: Contrato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(con);
    return this._http.put(this.api + '/' + con._id, body, httpOptions);
  }
} 
