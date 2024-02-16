import { Component, OnInit,  } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})


// ffalta ver los helpers, guards y actualizar el login y el
//registro con la autenticacion



export class LoginFormComponent implements OnInit{
  hide = true;
  usuario: string = '';
  password: string = '';

  constructor(private loginService: LoginService, public router: Router,  private route: ActivatedRoute, private snack: MatSnackBar){ }

  ngOnInit(): void {
    console.log("Clicked");
  }

  onButtonClick(){
    console.log("Clicked");
  }

  onSubmit() {
    this.loginService.login(this.usuario, this.password)
    .subscribe(
      (response) => {
        this.snack.open("Ingresando ...", "",
          { duration: 2000,
            verticalPosition: "top",
            horizontalPosition: "center"
          });
        //console.log('Inicio de sesión exitoso', response);
        //console.log('Usuario:', this.usuario);
        //console.log('Contraseña:', this.password);
        this.router.navigateByUrl('home')
      },
      (error) => {
        this.snack.open("Ha ocurrido un error. Por favor vuelva a intentarlo.", "Aceptar",
          { duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center"
          });
        //console.error('Error en el inicio de sesión', error);
      }
    )
  }
}
