import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Grupo} from "../../models/Grupo";
import {Gasto} from "../../models/Gasto";

@Component({
  selector: 'app-gasto-edit',
  templateUrl: './gasto-edit.component.html',
  styleUrl: './gasto-edit.component.css'
})
export class GastoEditComponent implements OnInit{
  editForm: FormGroup;
  categorias: any[] = [];
  divisiones: any[] = [];
  grupo: any;
  gasto: any;
  gastoId: number= 0;
  catId: number= 0;
  fdId: number= 0;
  value: any;
  nombreG:string = ``;
  nombreCat:string = ``;
  desc:string = ``;

  constructor(private fb: FormBuilder, private apiService: ApiService,public router: Router, private routeA: ActivatedRoute) {
    this.apiService.getCategoriasGastos().subscribe(data => {
      this.categorias = data;
      console.log(this.categorias);
    });
    this.apiService.getFormasDivision().subscribe(data => {
      this.divisiones = data;
    });
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      categoriaGasto: [this.categorias, Validators.required],
      monto: ['', Validators.required],
      formaDivision: [this.divisiones, Validators.required],
    });
  }

  ngOnInit() {
    this.routeA.params.subscribe(params => {
      this.gastoId = +params['id'];
    });
    this.apiService.getGasto(this.gastoId).subscribe(data => {
      this.gasto = data;
      console.log(this.gasto);
      this.nombreG = this.gasto.nombre;
      this.nombreCat = this.gasto.categoriaGasto.nombreGasto;
      this.desc = this.gasto.formaDivision.descripcion;
      this.value = this.gasto.monto;
      this.fdId = this.gasto.formaDivision.id;
      this.catId = this.gasto.categoriaGasto.id;
      // Poblar el formulario con los datos del grupo obtenidos de la API
      this.editForm.patchValue({
        nombre: this.gasto.nombre,
        id: this.gasto.id,
        categoriaGasto: this.gasto.categoriaGasto,
        monto: this.gasto.monto,
        formaDivision: this.gasto.formaDivision,
        img: this.gasto.img,
        fechaGasto: this.gasto.fechaGasto
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const gasto: Gasto = this.editForm.value as Gasto;
      let fecha = new Date();
      gasto.fechaGasto = fecha;
      gasto.img = this.gasto.img;
      console.log('Datos del formulario:', gasto);
      this.apiService.editarGasto(gasto,this.gastoId)
        .subscribe({
            next: (gasto) => {
              this.router.navigateByUrl('home')
            },
            error: (errorData) => {
              console.error(errorData);
            },
            complete: () => {
              //Acá se podría llamar a un servicio de notificacion que modele un mensaje
              //en pantalla diciendo que el grupo se cargó exitosamente
              console.info("Gasto modificado");
            }
          }
        );
    } else {
      console.log('Formulario no válido. Por favor, revisa los campos.');
    }
  }
}
