import { Tipo } from "./Tipo";
import { Venta } from "./Venta";

export class Mascota {
    id_mascota:number;
    nombre:String;
    tipo:Tipo;
    precio:number;
    venta:Venta;

    constructor() {
        this.id_mascota=0;
        this.nombre="";
        this.tipo=new Tipo();
        this.precio=0;
        this.venta=new Venta();
    }
}