import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router
        , private tokenStorageService:TokenStorageService) {}

    canActivate(route:ActivatedRouteSnapshot) {
        if (!!this.tokenStorageService.getToken()) {
            if (route.data.roles && this.checkNoRoles(route)) {
                this.router.navigate(['']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    checkNoRoles(route:ActivatedRouteSnapshot) {
        let cantRoles = this.tokenStorageService.getUser().roles.length;
        let respuesta = false;
        
        for(let i = 0; i < cantRoles; i++) {
            if(route.data.roles.indexOf(this.tokenStorageService.getUser().roles[i]) === -1) {
                respuesta = true;
            }
        }

        return respuesta;
    }
}