import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {ApiService} from "../../services/api.service";
import {Usuario} from "../../models/Usuario";
import {Grupo} from "../../models/Grupo";
import {CategoriaGrupo} from "../../models/CategoriaGrupo";

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrl: './group-add.component.css'
})
export class GroupAddComponent {
  crearForm: FormGroup;
  categorias: any[] = [];
  cat: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, public router: Router) {
    this.apiService.getCategoriasGrupos().subscribe(data => {
      this.categorias = data;
      console.log(this.categorias);
    });

    this.crearForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: [this.categorias, Validators.required],
      //  imagen: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.crearForm.valid) {
      const grupo: Grupo = this.crearForm.value as Grupo;
      console.log('Datos del formulario:', grupo);
      console.log('value:', this.crearForm.get('categoria')?.value);
      /* this.apiService.getCategoria().subscribe(data => {
         this.cat = data;
         console.log(this.cat);
       });*/
      // grupo.categoria = this.crearForm.get('categoria')?.value;
      this.apiService.addGrupo(grupo)
        .subscribe({
            next: (grupo) => {
              this.router.navigateByUrl('home')
            },
            error: (errorData) => {
              console.error(errorData);
            },
            complete: () => {
              //Acá se podría llamar a un servicio de notificacion que modele un mensaje
              //en pantalla diciendo que el grupo se cargó exitosamente
              console.info("Grupo creado");
            }
          }
        );
    } else {
      console.log('Formulario no válido. Por favor, revisa los campos.');
    }
  }
}
