import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../Models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  path:string;

  constructor(private http:HttpClient) {
    this.path='http://localhost:8080/';
  }

  getCliente(id:string) {
    return this.http.get<Cliente>(this.path + "cliente/" + id);
  }

  newCliente(c:Cliente) {
    return this.http.post<Cliente>(this.path + "cliente", c);
  }

  listClientes() {
    return this.http.get<Cliente[]>(this.path + "clientes");
  }

  updateCliente(c:Cliente) {
    return this.http.put<Cliente>(this.path + "cliente/" + c.dni, c);
  }
}
