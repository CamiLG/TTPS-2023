import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit{
  grupo: any;
  groupId: number= 0;
  constructor(private fb: FormBuilder, private apiService: ApiService,public router: Router, private routeA: ActivatedRoute) {


  }

  ngOnInit() {
    this.routeA.params.subscribe(params => {
      this.groupId = +params['id']; // Leer el ID del grupo desde los parámetros de la ruta
      console.log("a", this.groupId);
      // Ahora puedes usar this.groupId para realizar operaciones con el ID del grupo
    });

    this.apiService.getGrupo(this.groupId).subscribe(data => {
      this.grupo = data;
      console.log("elgrupo" + this.grupo);
    });
  }

  editar(id: number) {
    this.router.navigate(['group/', id]);
  }
}
