import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,private registerService: RegisterService, public router: Router, private snack: MatSnackBar) {
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
          this.snack.open(errorData, "Aceptar",
            { duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "center"
            });
        },
        complete: () => {
          //console.info("Registro completo");
          this.snack.open("Usuario registrado con éxito", "Aceptar",
            { duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center"
            });
        }
      }

      );
    } else {
      this.snack.open("Formulario no válido. Por favor, revisá los campos.", "Aceptar",
        { duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "center"
        });
    }
  }
}
