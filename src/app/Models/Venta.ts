export class Venta {
    id_venta:String|null;
    id_empleado:number;
    dni_cliente:String;
    fecha:String;

    constructor() {
        this.id_venta=null;
        this.id_empleado=0;
        this.dni_cliente="";
        this.fecha="";
    }
}