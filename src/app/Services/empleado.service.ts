import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../Models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  path:string;

  constructor(private http:HttpClient) {
    this.path='http://localhost:8080/';
  }

  newEmpleado(e:Empleado) {
    return this.http.post<Empleado>(this.path + "empleado/" + e.password, e);
  }

  existsEmpleado(username:string) {
    return this.http.get<boolean>(this.path + "empleado/username/" + username);
  }

  listEmpleadosDeAlta() {
    return this.http.get<Empleado[]>(this.path + "empleados/alta");
  }

  darBajaEmpleados(ids:any) {
    return this.http.put<Empleado[]>(this.path + "empleado/baja", ids);
  }

  listEmpleados() {
    return this.http.get<Empleado[]>(this.path + "empleados");
  }

  getDatosEmpleado(id:number) {
    return this.http.get<Empleado>(this.path + "empleado/" + id);
  }

  updateEmpleado(e:Empleado) {
    return this.http.put<Empleado>(this.path + "empleado/" + e.id_usuario, e);
  }

  updatePassword(newPassword:string, id:number) {
    return this.http.put<Empleado>(this.path + "empleado/newpassword/" + id, newPassword);
  }

}
