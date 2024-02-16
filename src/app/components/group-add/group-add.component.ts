import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {GrupoDTO} from "../../models/GrupoDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrl: './group-add.component.css'
})
export class GroupAddComponent {
  crearForm: FormGroup;
  categorias: any[] = [];
  userId: any;
  user: any;
  lastG: any;
  lastGroupId: number = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService, public router: Router, private snack: MatSnackBar) {
    this.userId = localStorage.getItem("userId");

    this.apiService.getUsuario(this.userId).subscribe(data => {
      this.user = data;
      //console.log("usuario obj:", this.user)
    });

    this.apiService.getCategoriasGrupos().subscribe(data => {
      this.categorias = data;
      console.log(this.categorias);
    });

    this.crearForm = this.fb.group({
      nombre: ['', Validators.required],
      categoriaGrupo: [this.categorias, Validators.required],
      //  imagen: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.crearForm.valid) {
      const grupo: GrupoDTO = this.crearForm.value as GrupoDTO;
      console.log('Datos del formulario:', grupo);
      this.apiService.addGrupo(grupo)
        .subscribe( {
            next: (grupo) => {
              this.apiService.obtenerUltimoGrupoCreado().subscribe(data => {
                this.lastG = data;
                this.lastGroupId = data.id;
                this.apiService.asignarGrupoUsuario(this.userId, this.lastGroupId).subscribe(data => {
                  console.log("Grupo usuario asignado ", data)
                });
              });
              this.router.navigateByUrl('home')
            },
            error: (errorData) => {
              this.snack.open(errorData, "Aceptar",
                { duration: 3000,
                  verticalPosition: "top",
                  horizontalPosition: "center"
                });
            },
            complete: () => {

              this.snack.open("Grupo creado con éxito", "Aceptar",
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
