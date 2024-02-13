import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Grupo} from "../../models/Grupo";


@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent implements OnInit{
  editForm: FormGroup;
  categorias: any[] = [];
  //img: Imagen = new Imagen(1, "img","/assets/grupo.png");
  //categorias: CategoriaGrupo = new CategoriaGrupo(1,"fiesta", img);

  /* grupo: Grupo[] = [{
    id: 1,
    nombre: 'Nombre del Grupo',
    categoria: {
      id: 1,
      nombreGrupo: 'Familia',
      img: {
        id:1,
        path: '/assets/grupo.png',
        nombre: 'img'
      }
    }
  }];*/
  grupo: any;
  groupId: number= 0;
  nombreG:string = ``;

  constructor(private fb: FormBuilder, private apiService: ApiService,public router: Router, private routeA: ActivatedRoute) {
    this.apiService.getCategoriasGrupos().subscribe(data => {
      this.categorias = data;
     // console.log(this.categorias);
    });

    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      categoriaGrupo: [this.categorias, Validators.required]
    });
  }

  ngOnInit() {
    this.routeA.params.subscribe(params => {
      this.groupId = +params['id']; // Leer el ID del grupo desde los parámetros de la ruta
      console.log("a", this.groupId);
      // Ahora puedes usar this.groupId para realizar operaciones con el ID del grupo
    });
    this.apiService.getGrupo(this.groupId).subscribe(data => {
      this.grupo = data;
      console.log(this.grupo);
      this.nombreG = this.grupo.categoriaGrupo.nombreGrupo;
      // Poblar el formulario con los datos del grupo obtenidos de la API
      this.editForm.patchValue({
        nombre: this.grupo.nombre,
        id: this.grupo.id,
        categoriaGrupo: this.grupo.categoriaGrupo
          /*[{
          id: this.grupo.categoriaGrupo.id,
          nombreGrupo: this.grupo.categoriaGrupo.nombreGrupo,
          img: [{
            id: this.grupo.categoriaGrupo.img.id,
            nombre: this.grupo.categoriaGrupo.img.nombre,
            path: this.grupo.categoriaGrupo.img.path
          }]
        }]*/
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const grupo: Grupo = this.editForm.value as Grupo;
      console.log('Datos del formulario:', grupo);
      this.apiService.editarGrupo(grupo,this.groupId)
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
              console.info("Grupo modificado");
            }
          }
        );
    } else {
      console.log('Formulario no válido. Por favor, revisa los campos.');
    }
  }
}
