import { Component, OnInit } from '@angular/core';

declare function seleccionFilas(elemento:any,multiSeleccion:boolean,datosARecoger:String[]):any;

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html',
  styleUrls: ['./listado-empleado.component.css']
})
export class ListadoEmpleadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var datosARecoger:String[] = [];
    $(".tabla-seleccionable").on("click", "tbody tr", function() {
      seleccionFilas($(this),true,datosARecoger);
    });
  }

}
