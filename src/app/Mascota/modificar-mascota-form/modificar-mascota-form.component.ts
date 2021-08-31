import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Mascota } from 'src/app/Models/Mascota';
import { Tipo } from 'src/app/Models/Tipo';
import { MascotaService } from 'src/app/Services/mascota.service';
import { TipoService } from 'src/app/Services/tipo.service';

@Component({
  selector: 'app-modificar-mascota-form',
  templateUrl: './modificar-mascota-form.component.html',
  styleUrls: ['./modificar-mascota-form.component.css']
})
export class ModificarMascotaFormComponent implements OnInit {
  formModifM:any;
  tipos:Tipo[] = [];
  lastView:string | null;
  message="";
  messageClass="";

  constructor(private http:MascotaService, private httpTipo:TipoService, private router:Router) {
    this.formModifM=new Mascota();
    this.lastView = null;
    if(!!localStorage.getItem("view")){
      this.lastView = localStorage.getItem("view");
    } else {
      this.router.navigate(['']);
    }
    localStorage.removeItem("view");
  }

  ngOnInit(): void {
    this.httpTipo.listTipos()
    .subscribe(
      tipos => {
        this.tipos = tipos;
      }
    );
    let id = localStorage.getItem("id");
    localStorage.removeItem("id");
    if(id) {
      this.http.getDatosMascota(Number(id))
      .subscribe(
        datosMascota => {
          this.formModifM=datosMascota;
          this.formModifM.tipo=datosMascota.tipo;
        },
        () => {
          this.lanzarMensaje("Error al cargar los datos de la mascota", "alert alert-danger");
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

  compareTipos(tipo1:Tipo, tipo2:Tipo) {
    return tipo1.id_tipo === tipo2.id_tipo;
  }

  onSubmit() {
    this.http.updateMascota(this.formModifM)
    .subscribe(
      () => {
        localStorage.setItem("message","Mascota modificada correctamente");
        localStorage.setItem("messageClass","alert alert-success");
        this.back();
      },
      () => {
        this.lanzarMensaje("Error al modificar la Mascota", "alert alert-danger");
      }
    );
  }

  back() {
    this.router.navigate([this.lastView]);
  }

}
