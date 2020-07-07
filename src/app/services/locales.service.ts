import { Injectable } from '@angular/core';
import { Local } from '../models/locl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {observable,Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  urlBase: string = "http://localhost:3000/api/local/"

  constructor(private _http:HttpClient) {}

  getLocales():Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase , httpOptions)
  }

  addLocal(local:Local):Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      })
    };
    var body = JSON.stringify(local);
    return this._http.post(this.urlBase , body, httpOptions)
  }

  deleteLocal(id:string):Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase + id , httpOptions)
  }

  updateLocal(locl:Local):Observable<any> {
    const httpOptions ={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      })
    };
    var body = JSON.stringify(locl);
    return this._http.put(this.urlBase +locl._id ,body, httpOptions)
  }
  getLocalesHabilitados(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    }
    return this._http.get(this.urlBase + 'alquilado', httpOptions);
  }

}
