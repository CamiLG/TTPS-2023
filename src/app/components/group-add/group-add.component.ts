import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {ApiService} from "../../services/api.service";
import {Usuario} from "../../models/Usuario";
import {Grupo} from "../../models/Grupo";
import {CategoriaGrupo} from "../../models/CategoriaGrupo";
import {GrupoDTO} from "../../models/GrupoDTO";

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrl: './group-add.component.css'
})
export class GroupAddComponent {
  crearForm: FormGroup;
  categorias: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, public router: Router) {
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
