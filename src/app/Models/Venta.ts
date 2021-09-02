import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";

export class Venta {
    id_venta:String;
    usuario:Empleado;
    cliente:Cliente;
    fecha:String;

    constructor() {
        this.id_venta="";
        this.usuario=new Empleado();
        this.cliente=new Cliente();
        this.fecha="";
    }
}