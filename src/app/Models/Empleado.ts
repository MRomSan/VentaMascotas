import { Rol } from "./Rol";

export class Empleado {
    id_usuario:number|null;
    nombre:String;
    apellidos:String;
    telefono:String;
    username:String;
    password:String;
    alta:boolean;
    roles:any;

    constructor() {
        this.id_usuario=null;
        this.nombre="";
        this.apellidos="";
        this.telefono="";
        this.username="";
        this.password="";
        this.alta=true;
        this.roles=[];
    }
}