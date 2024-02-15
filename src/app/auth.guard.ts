import { LoginService } from "./services/login.service"
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
            // si esta logeado lo dejo activar la ruta
            console.log("El usuario es: ", currentUser);
            return true;
        }
        // No esta logeado, entonces redirecciono a la pagina de login
        //, { queryParams: { returnUrl: state.url } }
        this.router.navigate(['/login']);
        console.log("El usuario no existe");
        return false;
    }
    }