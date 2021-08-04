export class Mascota {
    id_mascota:number|null;
    nombre:String;
    tipo:number;
    precio:number;
    id_venta:String|null;

    constructor() {
        this.id_mascota=null;
        this.nombre="";
        this.tipo=0;
        this.precio=0;
        this.id_venta=null;
    }
}