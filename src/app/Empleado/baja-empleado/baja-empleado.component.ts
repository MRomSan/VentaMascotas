import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Empleado } from 'src/app/Models/Empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';

declare function seleccionFilas(elemento:any,multiSeleccion:boolean,datosARecoger:string[]):any;
declare function deshabilitarBoton(condicion:boolean):any;

@Component({
  selector: 'app-baja-empleado',
  templateUrl: './baja-empleado.component.html',
  styleUrls: ['./baja-empleado.component.css']
})
export class BajaEmpleadoComponent implements OnInit, AfterViewChecked {
  empleados:Empleado[] | null;
  stateMessage = "Cargando datos...";
  message="";
  messageClass="";
  dataFilter:string="";

  constructor(private http:EmpleadoService) {
    this.empleados = null;
  }

  ngOnInit(): void {
    var datosARecoger:string[] = [];
    $(".tabla-seleccionable").on("click", "tbody tr", function() {
      seleccionFilas($(this),true,datosARecoger);
    });
    
    this.cargaDatosEmpleadosEnAlta();
  }

  ngAfterViewChecked() {
    $("#tablaEmpleados tbody tr").on("classChange", function(){
      var cantidadSeleccionados = $("#tablaEmpleados tbody tr.selected").length;
      if(cantidadSeleccionados == 1) {
        $("#cant_registros_seleccionados").text(" al empleado seleccionado");
      } else {
        $("#cant_registros_seleccionados").text(" a los "+ cantidadSeleccionados + " empleados seleccionados");
      }
    });
  }

  cargaDatosEmpleadosEnAlta() {
    this.http.listEmpleadosDeAlta()
    .subscribe(
      datosEmpleados => {
        if(datosEmpleados.length!=0){
          this.empleados = datosEmpleados;
        } else {
          this.stateMessage = "No existen empleados";
        }
      },
      () => {
        this.stateMessage = "Error al cargar los datos de empleados";
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

  bajaEmpleados() {
    this.http.darBajaEmpleados($(".recoge-datos").val())
    .subscribe(
      () => {
        deshabilitarBoton(true);
        this.cargaDatosEmpleadosEnAlta();
        this.lanzarMensaje("Baja realizada correctamente", "alert alert-success");
      },
      () => {
        this.lanzarMensaje("Error al realizar la baja", "alert alert-danger");
      }
    );
  }

}
