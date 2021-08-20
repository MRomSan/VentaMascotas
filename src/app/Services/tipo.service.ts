import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tipo } from '../Models/Tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  path:string;

  constructor(private http:HttpClient) {
    this.path='http://localhost:8080/';
  }

  listTipos() {
    return this.http.get<Tipo[]>(this.path + "tipos");
  }

  listTiposEnUso() {
    return this.http.get<Tipo[]>(this.path + "tipos/enuso");
  }

  newTipo(t:Tipo) {
    return this.http.post<Tipo>(this.path + "tipo", t);
  }
}
