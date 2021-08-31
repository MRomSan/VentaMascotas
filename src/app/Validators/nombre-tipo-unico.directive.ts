import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { TipoService } from '../Services/tipo.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[nombreTipoUnico]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: NombreTipoUnicoDirective, multi: true}]
})
export class NombreTipoUnicoDirective implements AsyncValidator {

  constructor(private http:TipoService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const nomTipo = <string>control.value.trim();
    
    return this.http.existsTipo(nomTipo).pipe(
      map(nombreT => {
        if(nombreT) {
          return {nombreTipoUnico:true};
        }
        return null;
      })
    );
  }

}
