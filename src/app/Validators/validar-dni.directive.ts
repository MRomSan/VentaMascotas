import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validarDni]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidarDniDirective, multi: true}]
})
export class ValidarDniDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let dni = <string>control.value;

    if(!dni) {
      return {};
    }

    let numero:any;
    let letra, letras;
    //let expresion_regular = /^[XYZ]?\d{8}[A-Z]$/;
    let expresion_regular = /^\d{8}[a-zA-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular.test(dni) === true) {
      numero = dni.substr(0, dni.length-1);
      letra = dni.substr(dni.length-1, 1);
      numero = numero % 23;
      letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
      letras = letras.substring(numero, numero + 1);
      if(letras != letra) {
        return {'validarDni':{'message':'Dni incorrecto, la letra no coincide'}};
      } else {
        return null;
      }
    } else {
      return {'validarDni':{'message':'Formato incorrecto, debe contener 8 números y una letra'}};
    }

  }

}
