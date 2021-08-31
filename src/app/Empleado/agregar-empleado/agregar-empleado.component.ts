import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MESSAGE_TIME_HIDING, MESSAGE_TIME_RESET, MESSAGE_TIME_SHOWN } from 'src/app/global-const';
import { Empleado } from 'src/app/Models/Empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {
  formAlta:any;
  message="";
  messageClass="";

  constructor(private http:EmpleadoService, private router:Router) {
    this.formAlta = new Empleado();
  }

  ngOnInit(): void {
    document.getElementById("nombre")?.focus();
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

  onSubmit(f:NgForm): void {
    this.http.newEmpleado(this.formAlta)
    .subscribe(
      () => {
        this.lanzarMensaje("Empleado agregado correctamente", "alert alert-success");
        f.resetForm();
        document.getElementById("nombre")?.focus();
      },
      () => {
        this.lanzarMensaje("Error al agregar el empleado", "alert alert-danger");
      }
    );
  }

  cancelarAlta() {
    if(!!localStorage.getItem("view")) {
      this.router.navigate([localStorage.getItem("view")]);
    } else {
      this.router.navigate(['home']);
    }
  }
}
