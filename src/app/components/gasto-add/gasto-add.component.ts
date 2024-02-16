import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {GastoDTO} from "../../models/GastoDTO";

import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-gasto-add',
  templateUrl: './gasto-add.component.html',
  styleUrl: './gasto-add.component.css'
})
export class GastoAddComponent {
  crearForm: FormGroup;
  categorias: any[] = [];
  divisiones: any[] = [];
  groupId: number= 0;
  group: any;
  user: any;
  groupName: string = '';
  userId: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, public router: Router, private routeA: ActivatedRoute, private snack: MatSnackBar) {

    this.userId = localStorage.getItem("userId");
    //console.log("usuario:", this.userId);
    this.apiService.getUsuario(this.userId).subscribe(data => {
      this.user = data;
      //console.log("usuario obj:", this.user)
    });

    this.apiService.getCategoriasGastos().subscribe(data => {
      this.categorias = data;
      //console.log(this.categorias);
    });
    this.apiService.getFormasDivision().subscribe(data => {
      this.divisiones = data;
    });

    this.crearForm = this.fb.group({
      nombre: ['', Validators.required],
      categoriaGasto: [this.categorias, Validators.required],
      monto: ['', Validators.required],
      formaDivision: [this.divisiones, Validators.required]
     // imagen: ['', Validators.required]
    });

    this.routeA.params.subscribe(params => {
      this.groupId = +params['id']; // Leer el ID del grupo desde los parámetros de la ruta
      //console.log("id del grupo", this.groupId);
      // Ahora puedes usar this.groupId para realizar operaciones con el ID del grupo
    });

    this.apiService.getGrupo(this.groupId).subscribe(data => {
      this.group = data;
      this.groupName = this.group.nombre;
      //console.log(this.groupName);
    });

  }

  onSubmit() {
    let fecha = new Date();
    if (this.crearForm.valid) {
      const gasto: GastoDTO = this.crearForm.value as GastoDTO;
      gasto.grupo = this.group;
      gasto.fechaGasto = fecha;
      gasto.img = this.group.categoriaGrupo.img;
      gasto.usuarioGasto = this.user;
      console.log('Datos del formulario:', gasto);
      this.apiService.addGasto(gasto)
        .subscribe({
            next: (gasto) => {
              this.router.navigate(['group/gastos/add/', this.groupId]);
            },
            error: (errorData) => {
              this.snack.open(errorData, "Aceptar",
                { duration: 3000,
                  verticalPosition: "top",
                  horizontalPosition: "center"
                });
            },
            complete: () => {
              this.snack.open("Gasto agregado con éxito", "Aceptar",
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
