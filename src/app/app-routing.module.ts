import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarClienteComponent } from './Cliente/agregar-cliente/agregar-cliente.component';
import { ListadoClienteComponent } from './Cliente/listado-cliente/listado-cliente.component';
import { ModificarClienteComponent } from './Cliente/modificar-cliente/modificar-cliente.component';
import { AgregarEmpleadoComponent } from './Empleado/agregar-empleado/agregar-empleado.component';
import { ListadoEmpleadoComponent } from './Empleado/listado-empleado/listado-empleado.component';
import { ModificarEmpleadoComponent } from './Empleado/modificar-empleado/modificar-empleado.component';
import { AgregarMascotaComponent } from './Mascota/agregar-mascota/agregar-mascota.component';
import { ListadoMascotaComponent } from './Mascota/listado-mascota/listado-mascota.component';
import { ModificarMascotaComponent } from './Mascota/modificar-mascota/modificar-mascota.component';
import { AgregarTipoComponent } from './Tipo/agregar-tipo/agregar-tipo.component';
import { ListadoTipoComponent } from './Tipo/listado-tipo/listado-tipo.component';
import { ModificarTipoComponent } from './Tipo/modificar-tipo/modificar-tipo.component';
import { ListadoVentaComponent } from './Venta/listado-venta/listado-venta.component';

const routes: Routes = [
  {
    path: 'listadoEmpleado',
    component: ListadoEmpleadoComponent
  },
  {
    path: 'agregarEmpleado',
    component: AgregarEmpleadoComponent
  },
  {
    path: 'modificarEmpleado',
    component: ModificarEmpleadoComponent
  },
  {
    path: 'listadoTipo',
    component: ListadoTipoComponent
  },
  {
    path: 'agregarTipo',
    component: AgregarTipoComponent
  },
  {
    path: 'modificarTipo',
    component: ModificarTipoComponent
  },
  {
    path: 'listadoMascota',
    component: ListadoMascotaComponent
  },
  {
    path: 'agregarMascota',
    component: AgregarMascotaComponent
  },
  {
    path: 'modificarMascota',
    component: ModificarMascotaComponent
  },
  {
    path: 'listadoCliente',
    component: ListadoClienteComponent
  },
  {
    path: 'agregarCliente',
    component: AgregarClienteComponent
  },
  {
    path: 'modificarCliente',
    component: ModificarClienteComponent
  },
  {
    path: 'listadoVenta',
    component: ListadoVentaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
