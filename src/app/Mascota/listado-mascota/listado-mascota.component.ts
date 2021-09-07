import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Cliente } from 'src/app/Models/Cliente';
import { Mascota } from 'src/app/Models/Mascota';
import { ClienteService } from 'src/app/Services/cliente.service';
import { MascotaService } from 'src/app/Services/mascota.service';
import { TipoService } from 'src/app/Services/tipo.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { VentaService } from 'src/app/Services/venta.service';
import { Venta } from 'src/app/Models/Venta';
import { formatDate } from '@angular/common';

import * as bootstrap from "bootstrap";

declare function seleccionFilas(elemento:any,multiSeleccion:boolean,datosARecoger:string[]):any;

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit {
  mascotas:Mascota[] | null;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  message:string|null="";
  messageClass:string|null="";
  cantidadTipos:number=0;
  mascotaAEliminar:Mascota|null=null;
  interfazAdmin:boolean=false;
  interfazEmpleado:boolean=false;
  formDNI:any;
  formNuevoCliente:any;
  formDetVenta:any;
  cliente:Cliente;
  mascotasEnVenta:Mascota[] = [];
  totalVenta:number = 0;

  constructor(private httpMascota:MascotaService, private httpTipo:TipoService, private httpCliente:ClienteService, private httpVenta:VentaService, 
    private router:Router, private tokenStorageService:TokenStorageService) {
    this.mascotas = null;
    this.formDNI = {dni:''};
    this.formNuevoCliente = new Cliente;
    this.formDetVenta = {id_venta:'', fecha:'', dni:'', nomape:''};
    this.cliente = new Cliente;
  }

  ngOnInit(): void {
    const usuario = this.tokenStorageService.getUser();
    this.interfazAdmin = usuario.roles.includes('ROLE_ADMIN');
    this.interfazEmpleado = usuario.roles.includes('ROLE_USER');

    this.httpTipo.countTipo()
    .subscribe(
      numTipos => {
        this.cantidadTipos = numTipos;
        if(this.cantidadTipos==0) {
          if(this.interfazAdmin) {
            localStorage.setItem("message", "No existen tipos, agregue uno para poder manipular las mascotas");
            localStorage.setItem("messageClass", "alert alert-warning");
            this.router.navigate(['TiposMascota']);
          }
        } else {
          this.cargaDatosMascotas();
        }
      }
    );

    if(!!localStorage.getItem("message")) {
      this.lanzarMensaje(localStorage.getItem("message"), localStorage.getItem("messageClass"));
    }
    localStorage.clear();
  }

  cargaDatosMascotas() {
    if(this.interfazAdmin) {
      this.httpMascota.listMascotas()
      .subscribe(
        datosMascotas=>{
          if(datosMascotas.length==0) {
            this.stateMessage = "No existen mascotas";
          } else {
            this.mascotas = datosMascotas;
          }
        },
        ()=>{
          this.stateMessage="Error al cargar los datos de mascotas";
        }
      );
    } else if(this.interfazEmpleado) {
      this.httpMascota.listMascotasNoVendidas()
      .subscribe(
        datosMascotas=>{
          if(datosMascotas.length==0) {
            this.stateMessage = "No existen mascotas no vendidas";
          } else {
            this.mascotas = datosMascotas;
            var datosARecoger:string[] = [];
            $(".tabla-seleccionable").on("click", "tbody tr", function() {
              seleccionFilas($(this),true,datosARecoger);
            });
          }
        },
        ()=>{
          this.stateMessage="Error al cargar los datos de mascotas";
        }
      );
    }
  }

  addMascotaAVenta(mascota:Mascota) {
    if(this.mascotasEnVenta.includes(mascota)) {
      this.mascotasEnVenta.splice(this.mascotasEnVenta.indexOf(mascota), 1);
    } else {
      this.mascotasEnVenta.push(mascota);
    }
  }

  lanzarMensaje(message:string|null, messageClass:string|null) {
    this.message=message;
    this.messageClass=messageClass;
    setTimeout(()=>{this.ocultarMensaje()}, MESSAGE_TIME_SHOWN);
    setTimeout(()=>{this.borrarMensaje()}, MESSAGE_TIME_RESET);
  }

  ocultarMensaje() {
    $(".mensaje-resultado").fadeOut(MESSAGE_TIME_HIDING);
  }

  borrarMensaje() {
    this.message="";
    this.messageClass="";
  }
  
  nuevaMascota() {
    localStorage.setItem("view", "ListadoMascotas");
    this.router.navigate(["AltaMascota"]);
  }

  modificarMascota(mascota:Mascota) {
    if(mascota.id_mascota) {
      localStorage.setItem("id", mascota.id_mascota.toString());
    }
    localStorage.setItem("view", "ListadoMascotas");
    this.router.navigate(["ModificarMascotaForm"]);
  }

  mascotaParaEliminar(mascota:Mascota) {
    this.mascotaAEliminar=mascota;
  }

  eliminarMascota() {
    if(this.mascotaAEliminar){
      this.httpMascota.deleteMascotas(this.mascotaAEliminar.id_mascota)
      .subscribe(
        () => {
          if(this.mascotas) {
            this.mascotas=this.mascotas.filter(m=>m!=this.mascotaAEliminar);
          }
          this.lanzarMensaje("Mascota eliminada correctamente", "alert alert-success");
        },
        () => {
          this.lanzarMensaje("Error al eliminar la mascota", "alert alert-danger");
        }
      );
    }
  }

  getFocusonDNI() {
    document.getElementById("dniB")?.focus();
  }

  resetForm(f:NgForm) {
    f.resetForm();
  }

  buscarCliente() {
    this.httpCliente.getCliente(this.formDNI.dni)
    .subscribe(
      datosCliente => {
        if(datosCliente) {
          this.cliente = datosCliente;
          this.detallesVenta();
        } else {
          this.formNuevoCliente.dni=this.formDNI.dni;
          $("#dniCliente").modal('hide');
          $("#nuevoCliente").modal('show');
          document.getElementById("nombre")?.focus();
        }
      }
    );
  }

  detallesVenta() {
    if(this.formNuevoCliente.dni != "" && this.formNuevoCliente.dni != null) {
      this.cliente = this.formNuevoCliente;
      $("#nuevoCliente").modal('hide');
    } else {
      $("#dniCliente").modal('hide');
    }
    this.httpVenta.createIDVenta()
    .subscribe(
      nuevaVenta => {
        this.formDetVenta.id_venta = nuevaVenta.id_venta;
      }
    );
    this.formDetVenta.fecha = formatDate(Date.now(), 'dd/MM/yyyy HH:mm:ss', 'es-ES');
    this.formDetVenta.dni = this.cliente.dni.toUpperCase();
    this.formDetVenta.nomape = this.cliente.nombre + " " + this.cliente.apellidos;

    for(let i = 0; i < this.mascotasEnVenta.length; i++) {
      this.totalVenta += this.mascotasEnVenta[i].precio;
    }
    
    $("#detVenta").modal('show');
  }

  resetVenta(f:NgForm[]) {
    for(let i = 0; i < f.length; i++) {
      f[i].resetForm();
    }
    this.totalVenta = 0;
    this.cliente = new Cliente();
  }

  venderMascotas() {
    if(this.formNuevoCliente.dni != "" && this.formNuevoCliente.dni != null) {
      this.nuevoCliente();
    } else {
      this.nuevaVenta();
    }
  }

  nuevoCliente() {
    this.cliente.nombre = this.cliente.nombre.trim();
    this.cliente.apellidos = this.cliente.apellidos.trim();
    this.cliente.direccion = this.cliente.direccion.trim();
    this.cliente.localidad = this.cliente.localidad.trim();
    this.httpCliente.newCliente(this.cliente)
    .subscribe(
      () => {
        this.nuevaVenta();
      },
      () => {
        localStorage.setItem("message", "Error al agregar el nuevo cliente");
        localStorage.setItem("messageClass", "alert alert-danger");
        document.location.reload();
      }
    );
  }

  nuevaVenta() {
    let venta:Venta = new Venta();
    let mascotasVendidas:Mascota[] = [];
    venta.id_venta = this.formDetVenta.id_venta;
    venta.cliente = this.cliente;
    venta.fecha = formatDate(formatDate(this.formDetVenta.fecha, 'dd/MM/yyyy HH:mm:ss', 'es-ES'), 'yyyy-MM-dd HH:mm:ss', 'es-ES');
    venta.usuario.id_usuario = this.tokenStorageService.getUser().id;
    this.httpVenta.createVenta(venta)
    .subscribe(
      () => {
        let ids:number[]= [];
        for(let i = 0; i < this.mascotasEnVenta.length; i++) {
          mascotasVendidas[i] = new Mascota();
          mascotasVendidas[i].venta = new Venta();
          mascotasVendidas[i].venta.id_venta = this.formDetVenta.id_venta;
          mascotasVendidas[i].id_mascota = this.mascotasEnVenta[i].id_mascota;
          ids.push(this.mascotasEnVenta[i].id_mascota);
        }
        this.httpMascota.updateMascotas(mascotasVendidas, ids)
        .subscribe(
          () => {
            localStorage.setItem("message", "Venta finalizada");
            localStorage.setItem("messageClass", "alert alert-success");
            document.location.reload();
          },
          () => {
            localStorage.setItem("message", "Error al actualizar las mascotas");
            localStorage.setItem("messageClass", "alert alert-danger");
            document.location.reload();
          }
        );
      },
      () => {
        localStorage.setItem("message", "Error al crear la venta");
        localStorage.setItem("messageClass", "alert alert-danger");
        document.location.reload();
      }
    );
  }
}
