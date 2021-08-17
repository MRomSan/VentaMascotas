export class Empleado {
    id_usuario:number|null;
    nombre:String;
    apellidos:String;
    telefono:String;
    username:String;
    password:String;
    alta:boolean;

    constructor() {
        this.id_usuario=null;
        this.nombre="";
        this.apellidos="";
        this.telefono="";
        this.username="";
        this.password="";
        this.alta=true;
    }
}