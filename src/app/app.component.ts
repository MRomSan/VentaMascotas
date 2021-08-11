import { Component } from '@angular/core';
import { TokenStorageService } from './Services/token-storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appMascotas';
  private roles:string[] = [];
  isLoggedIn = false;
  mostrarBotonesAdmin = false;
  mostrarBotonesEmpleado = false;
  username?:string;

  constructor(private tokenStorageService:TokenStorageService) { }
  
  ngOnInit():void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const usuario = this.tokenStorageService.getUser();
      this.roles = usuario.roles;

      this.mostrarBotonesAdmin = this.roles.includes('ROLE_ADMIN');
      this.mostrarBotonesEmpleado = this.roles.includes('ROLE_USER');
      
      this.username = usuario.username;
    }
  }

  logout():void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  ngAfterViewChecked():void{
    var controllerCargado:any = location.href.split("?")[0];
    controllerCargado = controllerCargado.split("/").slice(-1);
    
    $("nav a").each(function() {
      if ($(this).attr("routerLink") == controllerCargado) {
        var el=$(this);
        var elDesMenu = $(".navbar-nav").find(".active");
        elDesMenu.removeClass("active");
        elDesMenu.removeAttr("aria-current");
        el.addClass("active");
        if(el.hasClass("dropdown-item")) {
          el.parents(".nav-item").children(".nav-link").addClass("active");
          el.parents(".nav-item").children(".nav-link").attr("aria-current", "page");
          el.attr("aria-current", "true");
        } else if(el.hasClass("nav-link")) {
          el.attr("aria-current", "page");
        }
      }
    });
  }
  
}
