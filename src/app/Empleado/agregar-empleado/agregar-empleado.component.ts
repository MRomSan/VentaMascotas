import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private http:EmpleadoService) {
    this.formAlta = new Empleado();
  }

  ngOnInit(): void {
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
        this.message="Empleado creado correctamente";
        this.messageClass="alert alert-success";
        setTimeout(()=>{this.ocultarMensaje()}, 4000);
        setTimeout(()=>{this.borrarMensaje()}, 5500);
        f.resetForm();
      },
      () => {
        this.message="Error al crear el empleado";
        this.messageClass="alert alert-danger";
        setTimeout(()=>{this.ocultarMensaje()}, 4000);
        setTimeout(()=>{this.borrarMensaje()}, 5500);
      }
    );
  }

}
