import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGE_TIME_SHOWN, MESSAGE_TIME_RESET, MESSAGE_TIME_HIDING } from 'src/app/global-const';
import { Empleado } from 'src/app/Models/Empleado';
import { Rol } from 'src/app/Models/Rol';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-modificar-empleado-form',
  templateUrl: './modificar-empleado-form.component.html',
  styleUrls: ['./modificar-empleado-form.component.css']
})
export class ModificarEmpleadoFormComponent implements OnInit {
  formModif:any;
  originalUsername:string = "";
  valueChanged:boolean = false;
  newPassword:string = "";
  lastView:string | null;
  message="";
  messageClass="";

  constructor(private http:EmpleadoService, private router:Router, private tokenStorageService:TokenStorageService) {
    this.formModif = new Empleado();
    this.lastView = null;
    if(!!localStorage.getItem("view")){
      this.lastView = localStorage.getItem("view");
    } else {
      this.router.navigate(['']);
    }
    localStorage.removeItem("view");
  }

  ngOnInit(): void {
    this.cargaEmpleado();
  }

  cargaEmpleado() {
    let id = localStorage.getItem("id");
    localStorage.removeItem("id");
    if(id) {
      this.http.getDatosEmpleado(Number(id))
      .subscribe(
        datosEmpleado => {
          this.formModif=datosEmpleado;
          this.originalUsername=this.formModif.username;
          this.checkRolAdmin();
        },
        () => {
          this.lanzarMensaje("Error al cargar los datos del empleado", "alert alert-danger");
        }
      );
    }
  }

  checkRolAdmin():boolean {
    for(let i = 0; i < this.formModif.roles.length; i++) {
      if(this.formModif.roles[i].nombre==Rol.Admin) {
        $("#alta").attr("disabled" , "disabled");
        $("#alta").attr("tabindex", -1);
        return true;
      }
    }
    return false;
  }

  changeUsername(event:any) {
    if(event.target.value != this.originalUsername) {
      this.valueChanged=true;
    } else {
      this.valueChanged=false;
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
    this.formModif.nombre = this.formModif.nombre.trim();
    this.formModif.apellidos = this.formModif.apellidos.trim();
    this.http.updateEmpleado(this.formModif)
    .subscribe(
      () => {
        if(this.newPassword.trim()!="") {
          this.http.updatePassword(this.newPassword, Number(this.formModif.id_usuario))
          .subscribe();
        }
        if(this.checkRolAdmin() && (this.newPassword.trim()!="" || this.formModif.username!=this.originalUsername)) {
          localStorage.setItem("message","El Usuario o Contraseña del Administrador fueron modificados, loguéese de nuevo");
          localStorage.setItem("messageClass","alert alert-warning");
          this.tokenStorageService.signOut();
          this.router.navigate(['login']);
        } else {
          localStorage.setItem("message","Empleado modificado correctamente");
          localStorage.setItem("messageClass","alert alert-success");
          this.back();
        }
      },
      () => {
        this.lanzarMensaje("Error al modificar el empleado", "alert alert-danger");
      }
    );
  }

  back() {
    this.router.navigate([this.lastView]);
  }

}
