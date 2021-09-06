import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Empleado } from 'src/app/Models/Empleado';
import { Rol } from 'src/app/Models/Rol';
import { EmpleadoService } from 'src/app/Services/empleado.service';

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html',
  styleUrls: ['./listado-empleado.component.css']
})
export class ListadoEmpleadoComponent implements OnInit {
  empleados:Empleado[] | null;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  message:string|null="";
  messageClass:string|null="";
  empleadoBaja:Empleado|null=null;

  constructor(private http:EmpleadoService, private router:Router) {
    this.empleados=null;
  }

  ngOnInit(): void {
    this.cargaDatosEmpleados();
    if(!!localStorage.getItem("message")) {
      this.lanzarMensaje(localStorage.getItem("message"), localStorage.getItem("messageClass"));
    }
    localStorage.clear();
  }

  cargaDatosEmpleados() {
    this.http.listEmpleados()
    .subscribe(
      datosEmpleados=>{
        this.empleados=datosEmpleados;
      },
      ()=>{
        this.stateMessage="Error al cargar los datos de empleados";
      }
    );
  }

  checkRolAdmin(empleado:Empleado):boolean {
    for(let i = 0; i < empleado.roles.length; i++) {
      if(empleado.roles[i].nombre==Rol.Admin) {
        return true;
      }
    }
    return false;
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

  nuevoEmpleado() {
    localStorage.setItem("view", "ListadoEmpleados");
    this.router.navigate(["AltaEmpleado"]);
  }

  modificarEmpleado(empleado:Empleado) {
    if(empleado.id_usuario) {
      localStorage.setItem("id", empleado.id_usuario.toString());
    }
    localStorage.setItem("view", "ListadoEmpleados");
    this.router.navigate(["ModificarEmpleadoForm"]);
  }

  empleadoParaBaja(empleado:Empleado) {
    this.empleadoBaja=empleado;
  }

  darBajaEmpleado() {
    if(this.empleadoBaja){
      this.http.darBajaEmpleados(this.empleadoBaja.id_usuario)
      .subscribe(
        () => {
          this.cargaDatosEmpleados();
          this.lanzarMensaje("Baja realizada correctamente", "alert alert-success");
        },
        () => {
          this.lanzarMensaje("Error al realizar la baja", "alert alert-danger");
        }
      );
    }
  }

}
