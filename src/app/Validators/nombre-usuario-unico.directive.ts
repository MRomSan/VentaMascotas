import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../Services/empleado.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[usernameUnico]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: NombreUsuarioUnicoDirective, multi: true}]
})
export class NombreUsuarioUnicoDirective implements AsyncValidator {

  constructor(private http:EmpleadoService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const nomUsu = <string>control.value.trim();

    return this.http.existsEmpleado(nomUsu).pipe(
      map(username => {
        if(username) {
          return {usernameUnico:true};
        }
        return null;
      })
    );
  }

}
