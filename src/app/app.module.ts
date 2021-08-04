import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarComponent } from './Cliente/agregar/agregar.component';
import { ListadoComponent } from './Cliente/listado/listado.component';
import { ModificarComponent } from './Cliente/modificar/modificar.component';
import { ValidarDniDirective } from './Validators/validar-dni.directive';
import { ListadoEmpleadoComponent } from './Empleado/listado-empleado/listado-empleado.component';
import { AgregarEmpleadoComponent } from './Empleado/agregar-empleado/agregar-empleado.component';
import { ModificarEmpleadoComponent } from './Empleado/modificar-empleado/modificar-empleado.component';
import { AgregarClienteComponent } from './Cliente/agregar-cliente/agregar-cliente.component';
import { ListadoClienteComponent } from './Cliente/listado-cliente/listado-cliente.component';
import { ModificarClienteComponent } from './Cliente/modificar-cliente/modificar-cliente.component';
import { AgregarTipoComponent } from './Tipo/agregar-tipo/agregar-tipo.component';
import { ListadoTipoComponent } from './Tipo/listado-tipo/listado-tipo.component';
import { ModificarTipoComponent } from './Tipo/modificar-tipo/modificar-tipo.component';
import { AgregarMascotaComponent } from './Mascota/agregar-mascota/agregar-mascota.component';
import { ListadoMascotaComponent } from './Mascota/listado-mascota/listado-mascota.component';
import { ModificarMascotaComponent } from './Mascota/modificar-mascota/modificar-mascota.component';
import { ListadoVentaComponent } from './Venta/listado-venta/listado-venta.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarComponent,
    ListadoComponent,
    ModificarComponent,
    ValidarDniDirective,
    ListadoEmpleadoComponent,
    AgregarEmpleadoComponent,
    ModificarEmpleadoComponent,
    AgregarClienteComponent,
    ListadoClienteComponent,
    ModificarClienteComponent,
    AgregarTipoComponent,
    ListadoTipoComponent,
    ModificarTipoComponent,
    AgregarMascotaComponent,
    ListadoMascotaComponent,
    ModificarMascotaComponent,
    ListadoVentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
