import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { authInterceptorProviders } from './Helpers/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Services/auth.guard';
import { EliminarMascotaComponent } from './Mascota/eliminar-mascota/eliminar-mascota.component';
import { BajaEmpleadoComponent } from './Empleado/baja-empleado/baja-empleado.component';
import { NombreUsuarioUnicoDirective } from './Validators/nombre-usuario-unico.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModificarEmpleadoFormComponent } from './Empleado/modificar-empleado-form/modificar-empleado-form.component';

@NgModule({
  declarations: [
    AppComponent,
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
    ListadoVentaComponent,
    BajaEmpleadoComponent,
    LoginComponent,
    HomeComponent,
    EliminarMascotaComponent,
    NombreUsuarioUnicoDirective,
    ModificarEmpleadoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
