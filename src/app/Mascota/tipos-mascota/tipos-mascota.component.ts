import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tipo } from 'src/app/Models/Tipo';
import { TipoService } from 'src/app/Services/tipo.service';

@Component({
  selector: 'app-tipos-mascota',
  templateUrl: './tipos-mascota.component.html',
  styleUrls: ['./tipos-mascota.component.css']
})
export class TiposMascotaComponent implements OnInit {
  tipos:Tipo[] | null;
  tiposEnUso:Tipo [] | null;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  message:string|null="";
  messageClass:string|null="";
  formNuevoT:any;

  constructor(private http:TipoService) {
    this.tipos = null;
    this.tiposEnUso = null;
    this.formNuevoT = new Tipo();
  }

  ngOnInit(): void {
    this.cargaDatosTipos();
  }

  cargaDatosTipos() {
    this.http.listTipos()
    .subscribe(
      datosTipos => {
        if(datosTipos.length==0){
          this.stateMessage="No existen tipos, agregue uno nuevo para comenzar a añadir mascotas";
        } else {
          this.tipos=datosTipos;
          this.cargaTiposEnUso();
        }
      },
      () => {
        this.stateMessage="Error al cargar los datos de tipos de mascotas";
      }
    );
  }

  lanzarMensaje(message:string|null, messageClass:string|null) {
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

  cargaTiposEnUso() {
    this.http.listTiposEnUso()
    .subscribe(
      datosTipos => {
        this.tiposEnUso=datosTipos;
      }
    );
  }

  checkTipoConMascotas(tipo:Tipo):boolean {
    if(this.tiposEnUso!=null){
      if(this.tiposEnUso.includes(tipo)) {
        return true;
      } else return false;
    }
    return false;
  }

  resetFormNuevoT(f:NgForm) {
    f.resetForm();
  }

  nuevoTipo(f:NgForm) {
    var modal = document.getElementById("nuevoTipo");
    this.http.newTipo(this.formNuevoT)
    .subscribe(
      () => {
        this.cargaDatosTipos();
        this.lanzarMensaje("Tipo creado correctamente","alert alert-success");
      },
      () => {
        this.lanzarMensaje("Error al crear el nuevo Tipo","alert alert-danger");
      }
    );
    
    this.resetFormNuevoT(f);
  }

  modificarTipo(tipo:Tipo) {

  }

  tipoAEliminar(tipo:Tipo) {

  }

  eliminarTipo() {

  }
}
