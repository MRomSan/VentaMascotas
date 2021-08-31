import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Mascota } from 'src/app/Models/Mascota';
import { MascotaService } from 'src/app/Services/mascota.service';
import { TipoService } from 'src/app/Services/tipo.service';

declare function seleccionFilas(elemento:any,multiSeleccion:boolean,datosARecoger:string[]):any;
declare function deshabilitarBoton(condicion:boolean):any;

@Component({
  selector: 'app-eliminar-mascota',
  templateUrl: './eliminar-mascota.component.html',
  styleUrls: ['./eliminar-mascota.component.css']
})
export class EliminarMascotaComponent implements OnInit, AfterViewChecked {
  mascotas:Mascota[] | null;
  stateMessage = "Cargando datos...";
  message="";
  messageClass="";
  dataFilter:string="";
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
  }

  ngAfterViewChecked() {
    $("#tablaMascotas tbody tr").on("classChange", function(){
      var cantidadSeleccionados = $("#tablaMascotas tbody tr.selected").length;
      if(cantidadSeleccionados == 1) {
        $("#cant_registros_seleccionados").text(" a la mascota seleccionada");
      } else {
        $("#cant_registros_seleccionados").text(" a las "+ cantidadSeleccionados + " mascotas seleccionadas");
      }
    });
  }

  cargaDatosMascotas() {
    this.http.listMascotasNoVendidas()
    .subscribe(
      datosMascotas => {
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
      () => {
        this.stateMessage = "Error al cargar los datos de las mascotas";
      }
    );
  }

  lanzarMensaje(message:string, messageClass:string) {
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
  
  eliminarMascotas() {
    this.http.deleteMascotas($(".recoge-datos").val())
    .subscribe(
      mascotasEliminadas => {
        deshabilitarBoton(true);
        mascotasEliminadas.forEach(mascElim => {
          if(!!this.mascotas && mascElim!=null){
            this.mascotas=this.mascotas.filter(m=>m.id_mascota!=mascElim.id_mascota);
          }
        });
        this.lanzarMensaje("Mascotas eliminadas correctamente", "alert alert-success");
      },
      () => {
        this.lanzarMensaje("Error al eliminar las Mascotas", "alert alert-danger");
      }
    );
  }
}
