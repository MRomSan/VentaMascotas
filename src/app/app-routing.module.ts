import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoClienteComponent } from './Cliente/listado-cliente/listado-cliente.component';
import { ModificarClienteFormComponent } from './Cliente/modificar-cliente-form/modificar-cliente-form.component';
import { AgregarEmpleadoComponent } from './Empleado/agregar-empleado/agregar-empleado.component';
import { BajaEmpleadoComponent } from './Empleado/baja-empleado/baja-empleado.component';
import { ListadoEmpleadoComponent } from './Empleado/listado-empleado/listado-empleado.component';
import { ModificarEmpleadoFormComponent } from './Empleado/modificar-empleado-form/modificar-empleado-form.component';
import { ModificarEmpleadoComponent } from './Empleado/modificar-empleado/modificar-empleado.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AgregarMascotaComponent } from './Mascota/agregar-mascota/agregar-mascota.component';
import { EliminarMascotaComponent } from './Mascota/eliminar-mascota/eliminar-mascota.component';
import { ListadoMascotaComponent } from './Mascota/listado-mascota/listado-mascota.component';
import { ModificarMascotaFormComponent } from './Mascota/modificar-mascota-form/modificar-mascota-form.component';
import { ModificarMascotaComponent } from './Mascota/modificar-mascota/modificar-mascota.component';
import { Rol } from './Models/Rol';
import { AuthGuard } from './Services/auth.guard';
import { ListadoTipoComponent } from './Tipo/listado-tipo/listado-tipo.component';
import { ListadoVentaComponent } from './Venta/listado-venta/listado-venta.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ListadoEmpleados',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ListadoEmpleadoComponent
  },
  {
    path: 'AltaEmpleado',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: AgregarEmpleadoComponent
  },
  {
    path: 'ModificarEmpleado',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ModificarEmpleadoComponent
  },
  {
    path: 'ModificarEmpleadoForm',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ModificarEmpleadoFormComponent
  },
  {
    path: 'BajaEmpleados',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: BajaEmpleadoComponent
  },
  {
    path: 'TiposMascota',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ListadoTipoComponent
  },
  {
    path: 'ListadoMascotas',
    canActivate: [AuthGuard],
    data: {roles: [Rol.User, Rol.Admin]},
    component: ListadoMascotaComponent
  },
  {
    path: 'AltaMascota',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: AgregarMascotaComponent
  },
  {
    path: 'ModificarMascota',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ModificarMascotaComponent
  },
  {
    path: 'ModificarMascotaForm',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ModificarMascotaFormComponent
  },
  {
    path: 'EliminarMascotas',
    canActivate:[AuthGuard],
    data: {roles: Rol.Admin},
    component: EliminarMascotaComponent
  },
  {
    path: 'ListadoClientes',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ListadoClienteComponent
  },
  {
    path: 'ModificarClienteForm',
    canActivate: [AuthGuard],
    data: {roles: Rol.Admin},
    component: ModificarClienteFormComponent
  },
  {
    path: 'ListadoVentas',
    canActivate: [AuthGuard],
    data: {roles: [Rol.User, Rol.Admin]},
    component: ListadoVentaComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
