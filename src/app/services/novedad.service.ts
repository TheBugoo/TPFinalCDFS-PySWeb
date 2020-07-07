import { Injectable } from '@angular/core';
import { Novedad } from './../models/novedad'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  novedad: Novedad;
  novedades: Array<Novedad>;
  api: string = "http://localhost:3000/api/novedad"
  constructor(private _http: HttpClient) {
    this.novedades = new Array<Novedad>();
    this.novedad = new Novedad();
  }
  getNovedad(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }
    console.log(httpOptions.headers)
    return this._http.get(this.api, httpOptions);
  }
  deleteNovedad(nov: Novedad): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.delete(this.api + '/' + nov._id, httpOptions);
  }
  getNovedadPendiente(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }
    return this._http.get(this.api + '/pendiente', httpOptions);
  }
  addNovedad(nov: Novedad): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    console.log(httpOptions.headers)
    var body = JSON.stringify(nov);
    return this._http.post(this.api, body, httpOptions);
  }
  upDateNovedad(nov: Novedad): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(nov);
    return this._http.put(this.api + '/' + nov._id, body, httpOptions);
  }
}