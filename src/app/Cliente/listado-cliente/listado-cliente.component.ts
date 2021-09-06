import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent implements OnInit {
  clientes:Cliente[] | null;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  message:string|null="";
  messageClass:string|null="";

  constructor(private http:ClienteService, private router:Router) {
    this.clientes = null;
  }

  ngOnInit(): void {
    this.cargaDatosClientes();
    if(!!localStorage.getItem("message")) {
      this.lanzarMensaje(localStorage.getItem("message"), localStorage.getItem("messageClass"));
    }
    localStorage.clear();
  }

  cargaDatosClientes() {
    this.http.listClientes()
    .subscribe(
      datosClientes=>{
        this.clientes=datosClientes;
      },
      ()=>{
        this.stateMessage="Error al cargar los datos de empleados";
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

  modificarCliente(cliente:Cliente) {
    if(cliente.dni) {
      localStorage.setItem("id", cliente.dni.toString());
    }
    localStorage.setItem("view", "ListadoClientes");
    this.router.navigate(["ModificarClienteForm"]);
  }
}
