import { formatDate } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/Models/Mascota';
import { Venta } from 'src/app/Models/Venta';
import { MascotaService } from 'src/app/Services/mascota.service';
import { VentaService } from 'src/app/Services/venta.service';

@Component({
  selector: 'app-listado-venta',
  templateUrl: './listado-venta.component.html',
  styleUrls: ['./listado-venta.component.css']
})
export class ListadoVentaComponent implements OnInit, AfterViewChecked {
  ventas:Venta[] | null;
  mascotasVendidas:Mascota[] | null;
  stateMessage = "Cargando datos...";
  dataFilter:string = "";
  mascotasVenta:Mascota[] = [];
  formDetVenta:any;
  totalVenta:number = 0;
  totalTodasLasVentas:number = 0;

  constructor(private httpVenta:VentaService, private httpMascota:MascotaService, private cd:ChangeDetectorRef) {
    this.ventas = null;
    this.mascotasVendidas = null;
    this.formDetVenta = {id_venta:'', fecha:'', dni:'', nomape:'', telefono:'', correo:''};
  }

  ngOnInit(): void {
    this.cargaDatosVentas();
  }

  ngAfterViewChecked() {
    this.calcularTotalTodasLasVentas();
    this.cd.detectChanges();
  }

  cargaDatosVentas() {
    this.httpVenta.listVentas()
    .subscribe(
      datosVentas=>{
        this.ventas=datosVentas;
        if(this.ventas.length==0) {
          this.stateMessage="No existen ventas";
        } else {
          this.httpMascota.listMascotasVendidas()
          .subscribe(
            datosMascotas => {
              this.mascotasVendidas=datosMascotas;
            }
          );
        }
      },
      ()=>{
        this.stateMessage="Error al cargar los datos de ventas";
      }
    );
  }

  calcularTotalVenta(venta:Venta):number {
    let total:number = 0;
    if(this.mascotasVendidas) {
      let mascotas:Mascota[]=[];
      mascotas = this.mascotasVendidas.filter(m => m.venta.id_venta === venta.id_venta);
      for(let i = 0; i < mascotas.length; i++){
        total += mascotas[i].precio;
      }
    }
    return total;
  }

  calcularTotalTodasLasVentas() {
    let total:number=0;
    if($("#data tr").length>0){
      for(let i =0; i < $("#data tr").length; i++){
        total+=parseFloat(($("#data tr")[i].getElementsByTagName("td")[5].innerHTML).replace(".","").replace(",","."));
      }
    }
    this.totalTodasLasVentas=total;
  }

  selecDetVenta(venta:Venta) {
    this.totalVenta=0;
    this.formDetVenta.id_venta = venta.id_venta;
    this.formDetVenta.fecha = formatDate(venta.fecha.toString(), "dd/MM/yyyy HH:mm:ss", "es");
    this.formDetVenta.dni = venta.cliente.dni;
    this.formDetVenta.nomape = venta.cliente.nombre + " " + venta.cliente.apellidos;
    this.formDetVenta.telefono = venta.cliente.telefono;
    this.formDetVenta.correo = venta.cliente.correo;
    if(this.mascotasVendidas) {
      this.mascotasVenta = this.mascotasVendidas.filter(m => m.venta.id_venta === venta.id_venta);
      for(let i =0; i < this.mascotasVenta.length; i++){
        this.totalVenta+=this.mascotasVenta[i].precio;
      }
    }
  }
}
