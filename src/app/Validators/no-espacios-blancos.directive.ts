import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[noEspaciosBlancos]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoEspaciosBlancosDirective, multi: true}]
})
export class NoEspaciosBlancosDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let texto = <string>control.value;

    if(!texto) {
      return {};
    }

    return texto.trim().length === 0 ? {'noEspaciosBlancos': true} : null;
  }

}
