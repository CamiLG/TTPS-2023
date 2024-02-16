import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Grupo} from "../../models/Grupo";

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit{
  grupo: any;
  groupId: number= 0;
  imagen: string = '';
  nombreG: string = '';
  nombreCat: string = '';
  constructor(private apiService: ApiService,public router: Router, private routeA: ActivatedRoute) {
    this.routeA.params.subscribe(params => {
      this.groupId = +params['id']; // Leer el ID del grupo desde los parámetros de la ruta
     // console.log("a", this.groupId);
    });
  }

  ngOnInit():void {

    this.apiService.getGrupo(this.groupId).subscribe(data => {
      this.grupo = data;
      this.imagen = this.grupo.categoriaGrupo.img.path;
      this.nombreG = this.grupo.nombre;
      this.nombreCat = this.grupo.categoriaGrupo.nombreGrupo;
     // console.log(this.grupo);
    });
  }

  editar(id: number) {
    this.router.navigate(['group/', id]);
  }

  gasto(id: number) {
    this.router.navigate(['group/gastos/', id]);
  }

  crearGasto(id:number) {
    this.router.navigate(['group/gastos/add/', id]);
  }
}
