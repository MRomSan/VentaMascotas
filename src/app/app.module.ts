import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidarDniDirective } from './Validators/validar-dni.directive';
import { ListadoEmpleadoComponent } from './Empleado/listado-empleado/listado-empleado.component';
import { AgregarEmpleadoComponent } from './Empleado/agregar-empleado/agregar-empleado.component';
import { ModificarEmpleadoComponent } from './Empleado/modificar-empleado/modificar-empleado.component';
import { ListadoClienteComponent } from './Cliente/listado-cliente/listado-cliente.component';
import { ListadoTipoComponent } from './Tipo/listado-tipo/listado-tipo.component';
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
import { ModificarMascotaFormComponent } from './Mascota/modificar-mascota-form/modificar-mascota-form.component';
import { NombreTipoUnicoDirective } from './Validators/nombre-tipo-unico.directive';
import { NoEspaciosBlancosDirective } from './Validators/no-espacios-blancos.directive';
import { ModificarClienteFormComponent } from './Cliente/modificar-cliente-form/modificar-cliente-form.component';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
registerLocaleData(localeES, "es");

@NgModule({
  declarations: [
    AppComponent,
    ValidarDniDirective,
    ListadoEmpleadoComponent,
    AgregarEmpleadoComponent,
    ModificarEmpleadoComponent,
    ListadoClienteComponent,
    ListadoTipoComponent,
    AgregarMascotaComponent,
    ListadoMascotaComponent,
    ModificarMascotaComponent,
    ListadoVentaComponent,
    BajaEmpleadoComponent,
    LoginComponent,
    HomeComponent,
    EliminarMascotaComponent,
    NombreUsuarioUnicoDirective,
    ModificarEmpleadoFormComponent,
    ModificarMascotaFormComponent,
    NombreTipoUnicoDirective,
    NoEspaciosBlancosDirective,
    ModificarClienteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [authInterceptorProviders, AuthGuard, {provide:LOCALE_ID, useValue:'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
