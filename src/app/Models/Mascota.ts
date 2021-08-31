import { Tipo } from "./Tipo";

export class Mascota {
    id_mascota:number|null;
    nombre:String;
    tipo:Tipo;
    precio:number;
    id_venta:String|null;

    constructor() {
        this.id_mascota=null;
        this.nombre="";
        this.tipo=new Tipo();
        this.precio=0;
        this.id_venta=null;
    }
}