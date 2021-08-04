export class Empleado {
    nombre:String;
    apellidos:String;
    telefono:String;
    username:String;
    contrasha:String;
    alta:boolean;
    administrador:boolean;

    constructor() {
        this.nombre="";
        this.apellidos="";
        this.telefono="";
        this.username="";
        this.contrasha="";
        this.alta=true;
        this.administrador=false;
    }
}