export class Empleado {
    id_empleado:number|null;
    nombre:String;
    apellidos:String;
    telefono:String;
    username:String;
    contrasha:String;
    alta:boolean;
    administrador:boolean;

    constructor() {
        this.id_empleado=null;
        this.nombre="";
        this.apellidos="";
        this.telefono="";
        this.username="";
        this.contrasha="";
        this.alta=true;
        this.administrador=false;
    }
}