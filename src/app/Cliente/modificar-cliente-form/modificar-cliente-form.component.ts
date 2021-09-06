import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-modificar-cliente-form',
  templateUrl: './modificar-cliente-form.component.html',
  styleUrls: ['./modificar-cliente-form.component.css']
})
export class ModificarClienteFormComponent implements OnInit {
  formModif:any;
  lastView:string | null;
  message="";
  messageClass="";

  constructor(private http:ClienteService, private router:Router) {
    this.formModif = new Cliente();
    this.lastView = null;
    if(!!localStorage.getItem("view")){
      this.lastView = localStorage.getItem("view");
    } else {
      this.router.navigate(['']);
    }
    localStorage.removeItem("view");
  }

  ngOnInit(): void {
    this.cargaCliente();
  }

  cargaCliente() {
    let id = localStorage.getItem("id");
    localStorage.removeItem("id");
    if(id) {
      this.http.getCliente(id)
      .subscribe(
        datosCliente => {
          this.formModif=datosCliente;
        },
        () => {
          this.lanzarMensaje("Error al cargar los datos del cliente", "alert alert-danger");
        }
      );
    }
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

  onSubmit() {
    this.http.updateCliente(this.formModif)
    .subscribe(
      () => {
        localStorage.setItem("message","Cliente modificado correctamente");
        localStorage.setItem("messageClass","alert alert-success");
        this.back();
      },
      () => {
        this.lanzarMensaje("Error al modificar el cliente", "alert alert-danger");
      }
    );
  }

  back() {
    this.router.navigate([this.lastView]);
  }
}
