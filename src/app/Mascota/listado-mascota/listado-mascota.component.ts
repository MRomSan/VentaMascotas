import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Mascota } from 'src/app/Models/Mascota';
import { ClienteService } from 'src/app/Services/cliente.service';
import { MascotaService } from 'src/app/Services/mascota.service';
import { TipoService } from 'src/app/Services/tipo.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

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

  constructor(private http:MascotaService, private httpTipo:TipoService, private httpCliente:ClienteService, 
    private router:Router, private tokenStorageService:TokenStorageService) {
    this.mascotas = null;
    this.formDNI={dni:''};
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
      this.http.listMascotas()
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
      this.http.listMascotasNoVendidas()
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
      this.http.deleteMascotas(this.mascotaAEliminar.id_mascota)
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

  resetForm(f:NgForm) {
    f.resetForm();
  }

  buscarCliente() {
    this.httpCliente.getCliente(this.formDNI.dni)
    .subscribe(
      datosCliente => {
        if(datosCliente) {
          console.log("existe");
        } else {
          console.log("no existe");
        }
      }
    );
  }

  venderMascotas() {

  }
}
