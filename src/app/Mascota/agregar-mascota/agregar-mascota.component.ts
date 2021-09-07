import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Mascota } from 'src/app/Models/Mascota';
import { Tipo } from 'src/app/Models/Tipo';
import { MascotaService } from 'src/app/Services/mascota.service';
import { TipoService } from 'src/app/Services/tipo.service';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent implements OnInit {
  formNuevaM:any;
  tipos:Tipo[] = [];
  message="";
  messageClass="";

  constructor(private http:MascotaService, private httpTipo:TipoService, private router:Router) {
    this.formNuevaM = new Mascota();
    this.formNuevaM.tipo = "";
  }

  ngOnInit(): void {
    this.httpTipo.listTipos()
    .subscribe(
      tipos => {
        this.tipos=tipos;
        if(this.tipos.length==0) {
          localStorage.setItem("message", "No existen Tipos, agregue uno para poder manipular las Mascotas");
          localStorage.setItem("messageClass", "alert alert-warning");
          this.router.navigate(['TiposMascota']);
        }
      }
    );
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
    this.formNuevaM.nombre = this.formNuevaM.nombre.trim();
    this.http.newMascota(this.formNuevaM)
    .subscribe(
      () => {
        this.lanzarMensaje("Mascota agregada correctamente", "alert alert-success");
        f.resetForm();
        this.formNuevaM.tipo = "";
        document.getElementById("nombre")?.focus();
      },
      () => {
        this.lanzarMensaje("Error al agregar la mascota", "alert alert-danger");
      }
    );
  }

  cancelarNuevaM() {
    if(!!localStorage.getItem("view")) {
      this.router.navigate([localStorage.getItem("view")]);
    } else {
      this.router.navigate(['home']);
    }
  }
}
