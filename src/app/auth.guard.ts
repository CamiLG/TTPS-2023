import { LoginService } from "./services/login.service"
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private loginService: LoginService,  private snack: MatSnackBar
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
            // si esta logeado lo dejo activar la ruta
            //console.log("El usuario es: ", currentUser);
            return true;
        }
        // No esta logeado, entonces redirecciono a la pagina de login
        //, { queryParams: { returnUrl: state.url } }
        this.router.navigate(['/login']);
      this.snack.open("Debe loguearse para acceder", "Aceptar",
        { duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "center"
        });
        //console.log("El usuario no existe");
        return false;
    }
    }
