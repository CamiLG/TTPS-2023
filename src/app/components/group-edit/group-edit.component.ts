import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Grupo} from "../../models/Grupo";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent implements OnInit{
  editForm: FormGroup;
  categorias: any[] = [];
  grupo: any;
  groupId: number= 0;
  catId: number= 0;
  nombreGrupo:string = ``;
  nombreCat:string = ``;

  constructor(private fb: FormBuilder, private apiService: ApiService,public router: Router, private routeA: ActivatedRoute, private snack: MatSnackBar) {
    this.apiService.getCategoriasGrupos().subscribe(data => {
      this.categorias = data;
    });

    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      categoriaGrupo: [this.categorias, Validators.required]
    });
  }

  ngOnInit() {
    this.routeA.params.subscribe(params => {
      this.groupId = +params['id']; // Leer el ID del grupo desde los parámetros de la ruta
      // console.log("a", this.groupId);
      // Ahora puedes usar this.groupId para realizar operaciones con el ID del grupo
    });
    this.apiService.getGrupo(this.groupId).subscribe(data => {
      this.grupo = data;
      this.nombreGrupo = this.grupo.nombreGrupo;
      this.nombreCat = this.grupo.categoriaGrupo.nombreGrupo;
      this.catId = this.grupo.categoriaGrupo.id;

      // Poblar el formulario con los datos del grupo obtenidos de la API
      this.editForm.patchValue({
        nombre: this.grupo.nombre,
        id: this.grupo.id,
        categoriaGrupo: this.grupo.categoriaGrupo
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const grupo: Grupo = this.editForm.value as Grupo;
      // console.log('Datos del formulario:', grupo);
      this.apiService.editarGrupo(grupo,this.groupId)
        .subscribe({
            next: (grupo) => {
              this.router.navigateByUrl('home')
            },
            error: (errorData) => {
              this.snack.open(errorData, "Aceptar",
                { duration: 3000,
                  verticalPosition: "top",
                  horizontalPosition: "center"
                });
              console.error(errorData);
            },
            complete: () => {
              this.snack.open("Grupo modificado con éxito", "Aceptar",
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
