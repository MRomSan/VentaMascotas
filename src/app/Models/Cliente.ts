export class Cliente {
    dni:String;
    nombre:String;
    apellidos:String;
    direccion:String;
    localidad:String;
    correo:String;
    telefono:String;
    publicidad:boolean;

    constructor() {
        this.dni="";
        this.nombre="";
        this.apellidos="";
        this.direccion="";
        this.localidad="";
        this.correo="";
        this.telefono="";
        this.publicidad=true;
    }
}