import { Injectable } from '@angular/core';
import { Comentarios } from '../models/comentarios';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  readonly URL_APICo = 'http://localhost:3000/api/comentarios/';

  constructor(private http:HttpClient) { }

  
  public getComentarios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    return this.http.get(this.URL_APICo, httpOptions);
  }
  
  public addComentario(comentarios: Comentarios): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    var body = JSON.stringify(comentarios);
    return this.http.post(this.URL_APICo, body, httpOptions);
  }

  public deleteComentario(coment: Comentarios): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    return this.http.delete(this.URL_APICo + coment._id, httpOptions);
  }
}
