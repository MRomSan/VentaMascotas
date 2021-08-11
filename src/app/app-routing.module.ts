import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoClienteComponent } from './Cliente/listado-cliente/listado-cliente.component';
import { ModificarClienteComponent } from './Cliente/modificar-cliente/modificar-cliente.component';
import { AgregarEmpleadoComponent } from './Empleado/agregar-empleado/agregar-empleado.component';
import { BajaEmpleadoComponent } from './Empleado/baja-empleado/baja-empleado.component';
import { ListadoEmpleadoComponent } from './Empleado/listado-empleado/listado-empleado.component';
import { ModificarEmpleadoComponent } from './Empleado/modificar-empleado/modificar-empleado.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AgregarMascotaComponent } from './Mascota/agregar-mascota/agregar-mascota.component';
import { EliminarMascotaComponent } from './Mascota/eliminar-mascota/eliminar-mascota.component';
import { ListadoMascotaComponent } from './Mascota/listado-mascota/listado-mascota.component';
import { ModificarMascotaComponent } from './Mascota/modificar-mascota/modificar-mascota.component';
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
    component: ListadoEmpleadoComponent
  },
  {
    path: 'AltaEmpleado',
    canActivate: [AuthGuard],
    component: AgregarEmpleadoComponent
  },
  {
    path: 'ModificarEmpleado',
    canActivate: [AuthGuard],
    component: ModificarEmpleadoComponent
  },
  {
    path: 'BajaEmpleados',
    canActivate: [AuthGuard],
    component: BajaEmpleadoComponent
  },
  {
    path: 'ListadoTipo',
    canActivate: [AuthGuard],
    component: ListadoTipoComponent
  },
  {
    path: 'ListadoMascotas',
    component: ListadoMascotaComponent
  },
  {
    path: 'AltaMascota',
    canActivate: [AuthGuard],
    component: AgregarMascotaComponent
  },
  {
    path: 'ModificarMascota',
    canActivate: [AuthGuard],
    component: ModificarMascotaComponent
  },
  {
    path: 'EliminarMascotas',
    canActivate:[AuthGuard],
    component: EliminarMascotaComponent
  },
  {
    path: 'ListadoClientes',
    canActivate: [AuthGuard],
    component: ListadoClienteComponent
  },
  {
    path: 'ModificarCliente',
    canActivate: [AuthGuard],
    component: ModificarClienteComponent
  },
  {
    path: 'ListadoVentas',
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
