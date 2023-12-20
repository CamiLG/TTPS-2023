import { Component, OnInit,  } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{
  hide = true;
  usuario: string = '';
  password: string = '';

  constructor(private loginService: LoginService){ }

  ngOnInit(): void {
    console.log("Clicked");
  }

  onButtonClick(){
    console.log("Clicked");
  }

  onSubmit() {
//comment
    this.loginService.login(this.usuario, this.password)
    .subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
        console.log('Usuario:', this.usuario);
        console.log('Contraseña:', this.password);
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
        console.log('Usuario:', this.usuario);
        console.log('Contraseña:', this.password);
      }

    )


  }
}
