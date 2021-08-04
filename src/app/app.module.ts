import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarComponent } from './Cliente/agregar/agregar.component';
import { ListadoComponent } from './Cliente/listado/listado.component';
import { ModificarComponent } from './Cliente/modificar/modificar.component';
import { ValidarDniDirective } from './Validators/validar-dni.directive';

@NgModule({
  declarations: [
    AppComponent,
    AgregarComponent,
    ListadoComponent,
    ModificarComponent,
    ValidarDniDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
