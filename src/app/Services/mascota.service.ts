import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../Models/Mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  path:string;

  constructor(private http:HttpClient) {
    this.path='http://localhost:8080/';
  }

  newMascota(m:Mascota) {
    return this.http.post<Mascota>(this.path + "mascota", m);
  }

  listMascotas() {
    return this.http.get<Mascota[]>(this.path + "mascotas");
  }

  listMascotasNoVendidas() {
    return this.http.get<Mascota[]>(this.path + "mascotas/novendidas");
  }

  deleteMascotas(id:any) {
    return this.http.delete<Mascota[]>(this.path + "mascota/" + id);
  }

  getDatosMascota(id:number) {
    return this.http.get<Mascota>(this.path + "mascota/" + id);
  }

  updateMascota(m:Mascota) {
    return this.http.put<Mascota>(this.path + "mascota/" + m.id_mascota, m);
  }

  updateMascotas(m:Mascota[], ids:number[]) {
    return this.http.put<Mascota[]>(this.path + "mascotas/" + ids, m);
  }

  existeMascotaEnTipo(tipo:string, mascota:string) {
    return this.http.get<boolean>(this.path + "mascota/" + tipo + "/" + mascota);
  }
}
