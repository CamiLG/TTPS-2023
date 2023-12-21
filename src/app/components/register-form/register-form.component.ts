import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,private registerService: RegisterService, public router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const usuario: Usuario = this.registroForm.value as Usuario;
      console.log('Datos del formulario:', usuario);
      this.registerService.register(usuario)
      .subscribe({
        next: (usuario) => {
          console.log('Datos del formulario:', usuario);
          this.router.navigateByUrl('login')
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          //Acá se podría llamar a un servicio de notificacion que modele un mensaje
          //en pantalla diciendo que el usuario se cargó exitosamente
          console.info("Registro completo");
        }
      }

      );
    } else {
      console.log('Formulario no válido. Por favor, revisa los campos.');
    }
  }
}
