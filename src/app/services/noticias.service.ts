import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  noticia: Noticia;
  noticias: Array<Noticia>;
  readonly URL_APINo = 'http://localhost:3000/api/noticia/';

  constructor(private http:HttpClient) {
    this.noticia = new Noticia();
    this.noticias = new Array<Noticia>();
   }

  public getNoticias(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    return this.http.get(this.URL_APINo, httpOptions);
  }
  
  public addNoticias(noticia: Noticia): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var body = JSON.stringify(noticia);
    return this.http.post(this.URL_APINo, body, httpOptions);
  }

  public deleteNoticias(notici: Noticia): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    return this.http.delete(this.URL_APINo + notici._id, httpOptions);
  }
  public updateNoticias(noti: Noticia): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var body = JSON.stringify(noti);
    return this.http.put(this.URL_APINo + noti._id, body, httpOptions);
  }
  getNoticiaVigente(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }
    return this.http.get(this.URL_APINo + 'vigente', httpOptions);
  }
}
