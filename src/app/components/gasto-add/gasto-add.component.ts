import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {GrupoDTO} from "../../models/GrupoDTO";
import {Gasto} from "../../models/Gasto";
import {formatDate} from "@angular/common";
import {GastoDTO} from "../../models/GastoDTO";

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
  groupName: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, public router: Router, private routeA: ActivatedRoute) {
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
      console.log("id del grupo", this.groupId);
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
      console.log('Datos del formulario:', gasto);
      this.apiService.addGasto(gasto)
        .subscribe({
            next: (gasto) => {
              alert('Gasto agregado con exito');
              this.router.navigateByUrl('home')
            },
            error: (errorData) => {
              console.error(errorData);
            },
            complete: () => {
              //Acá se podría llamar a un servicio de notificacion que modele un mensaje
              //en pantalla diciendo que el grupo se cargó exitosamente
              console.info("Gasto agregado");
            }
          }
        );
    } else {
      console.log('Formulario no válido. Por favor, revisa los campos.');
    }
  }
}
