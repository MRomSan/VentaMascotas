import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Mascota } from 'src/app/Models/Mascota';
import { MascotaService } from 'src/app/Services/mascota.service';
import { TipoService } from 'src/app/Services/tipo.service';

declare function seleccionFilas(elemento:any,multiSeleccion:boolean,datosARecoger:string[]):any;

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.css']
})
export class ModificarMascotaComponent implements OnInit {
  mascotas:Mascota[]|null;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  message:string|null="";
  messageClass:string|null="";
  cantidadTipos:number=0;

  constructor(private http:MascotaService, private httpTipo:TipoService, private router:Router) {
    this.mascotas = null;
  }

  ngOnInit(): void {
    this.httpTipo.countTipo()
    .subscribe(
      numTipos => {
        this.cantidadTipos = numTipos;
        if(this.cantidadTipos==0) {
          localStorage.setItem("message", "No existen tipos, agregue uno para poder manipular las mascotas");
          localStorage.setItem("messageClass", "alert alert-warning");
          this.router.navigate(['TiposMascota']);
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
    this.http.listMascotasNoVendidas()
    .subscribe(
      datosMascotas=>{
        if(datosMascotas.length==0) {
          this.stateMessage = "No existen mascotas no vendidas";
        } else {
          this.mascotas = datosMascotas;
          var datosARecoger:string[] = [];
          $(".tabla-seleccionable").on("click", "tbody tr", function() {
            seleccionFilas($(this),false,datosARecoger);
          });
        }
      },
      ()=>{
        this.stateMessage="Error al cargar los datos de mascotas";
      }
    );
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

  modificarMascotas() {
    if($(".recoge-datos").val()) {
      let datoAModificar:any = $(".recoge-datos").val();
      localStorage.setItem("id", datoAModificar.toString());
    }
    localStorage.setItem("view", "ModificarMascota");
    this.router.navigate(["ModificarMascotaForm"]);
  }

}
