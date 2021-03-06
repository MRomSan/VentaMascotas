import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Empleado } from 'src/app/Models/Empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';

declare function seleccionFilas(elemento:any,multiSeleccion:boolean,datosARecoger:string[]):any;

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.css']
})
export class ModificarEmpleadoComponent implements OnInit {
  empleados:Empleado[] | null;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  message:string|null="";
  messageClass:string|null="";

  constructor(private http:EmpleadoService, private router:Router) {
    this.empleados = null;
  }

  ngOnInit(): void {
    var datosARecoger:string[] = [];
    $(".tabla-seleccionable").on("click", "tbody tr", function() {
      seleccionFilas($(this),false,datosARecoger);
    });

    this.http.listEmpleados()
    .subscribe(
      datosEmpleados=>{
        this.empleados=datosEmpleados;
      },
      ()=>{
        this.stateMessage="Error al cargar los datos de empleados";
      }
    );
    if(!!localStorage.getItem("message")) {
      this.lanzarMensaje(localStorage.getItem("message"), localStorage.getItem("messageClass"));
    }
    localStorage.clear();
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

  modificaEmpleado() {
    if($(".recoge-datos").val()) {
      let datoAModificar:any = $(".recoge-datos").val();
      localStorage.setItem("id", datoAModificar.toString());
    }
    localStorage.setItem("view", "ModificarEmpleado");
    this.router.navigate(["ModificarEmpleadoForm"]);
  }

}
