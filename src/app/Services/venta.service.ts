import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../Models/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  path:string;

  constructor(private http:HttpClient) {
    this.path='http://localhost:8080/';
  }

  createIDVenta() {
    return this.http.get<Venta>(this.path + "venta/nextID");
  }

  createVenta(v:Venta) {
    return this.http.post<Venta>(this.path + "venta", v);
  }

  listVentas() {
    return this.http.get<Venta[]>(this.path + "ventas");
  }

}
