import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tipo } from 'src/app/Models/Tipo';
import { TipoService } from 'src/app/Services/tipo.service';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';

import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-listado-tipo',
  templateUrl: './listado-tipo.component.html',
  styleUrls: ['./listado-tipo.component.css']
})
export class ListadoTipoComponent implements OnInit {
  tipos:Tipo[] | null;
  tiposEnUso:Tipo [] | null;
  tipoSel:Tipo;
  originalNombreTipo:String = "";
  valueChanged:boolean = false;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  message:string|null="";
  messageClass:string|null="";
  formNuevoT:any;
  formModifT:any;

  constructor(private http:TipoService) {
    this.tipos = null;
    this.tiposEnUso = null;
    this.formNuevoT = new Tipo();
    this.formModifT = new Tipo();
    this.tipoSel = new Tipo();
  }

  ngOnInit(): void {
    if(!!localStorage.getItem("message")) {
      this.lanzarMensaje(localStorage.getItem("message"), localStorage.getItem("messageClass"));
      localStorage.clear();
    }
    this.cargaDatosTipos();
  }

  cargaDatosTipos() {
    this.http.listTipos()
    .subscribe(
      datosTipos => {
        if(datosTipos.length==0){
          this.stateMessage="No existen tipos de mascotas";
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
      for(let i=0; i<this.tiposEnUso.length; i++) {
        if(this.tiposEnUso[i].nombre==tipo.nombre) return true;
      }
    }
    return false;
  }

  resetForm(f:NgForm) {
    f.resetForm();
  }

  changeNombreTipo(event:any) {
    if(event.target.value != this.originalNombreTipo) {
      this.valueChanged=true;
    } else {
      this.valueChanged=false;
    }
  }

  nuevoTipo(f:NgForm) {
    this.formNuevoT.nombre = this.formNuevoT.nombre.trim();
    this.http.newTipo(this.formNuevoT)
    .subscribe(
      () => {
        this.cargaDatosTipos();
        this.lanzarMensaje("Tipo creado correctamente","alert alert-success");
      },
      () => {
        this.lanzarMensaje("Error al crear el nuevo tipo","alert alert-danger");
      }
    );
    $("#nuevoTipo").modal('hide');
    this.resetForm(f);
  }

  modificarTipo(f:NgForm) {
    this.http.updateTipo(this.formModifT)
    .subscribe(
      () => {
        this.cargaDatosTipos();
        this.lanzarMensaje("Tipo modificado correctamente","alert alert-success");
      },
      () => {
        this.lanzarMensaje("Error al modificar el tipo","alert alert-danger");
      }
    );
    $("#modificarTipo").modal('hide');
    this.resetForm(f);
  }

  tipoSeleccionado(tipo:Tipo) {
    this.tipoSel = tipo;
    this.formModifT.id_tipo = tipo.id_tipo;
    this.formModifT.nombre = tipo.nombre;
    this.originalNombreTipo = tipo.nombre;
  }

  getFocusOnNombreN() {
    document.getElementById("nombreN")?.focus();
  }

  eliminarTipo() {
    if(this.tipoSel){
      this.http.deleteTipo(this.tipoSel)
      .subscribe(
        () => {
          if(!!this.tipos) {
            this.tipos=this.tipos.filter(t=>t!=this.tipoSel);
          }
          this.lanzarMensaje("Tipo eliminado correctamente","alert alert-success");
        },
        () => {
          this.lanzarMensaje("Error al eliminar el tipo","alert alert-danger");
        }
      );
      $("#eliminarTipo").modal('hide');
    }
  }
}
