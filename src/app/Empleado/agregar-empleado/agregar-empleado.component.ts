import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  }

  lanzarMensaje(message:string, messageClass:string) {
    this.message=message;
    this.messageClass=messageClass;
    setTimeout(()=>{this.ocultarMensaje()}, 4000);
    setTimeout(()=>{this.borrarMensaje()}, 5500);
  }

  ocultarMensaje() {
    $(".mensaje-resultado").fadeOut(1500);
  }

  borrarMensaje() {
    this.message="";
    this.messageClass="";
  }

  onSubmit(f:NgForm): void {
    this.http.newEmpleado(this.formAlta)
    .subscribe(
      () => {
        this.lanzarMensaje("Empleado creado correctamente", "alert alert-success");
        f.resetForm();
      },
      () => {
        this.lanzarMensaje("Error al crear el empleado", "alert alert-danger");
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
