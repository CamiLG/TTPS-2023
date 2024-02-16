import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-gasto-view',
  templateUrl: './gasto-view.component.html',
  styleUrl: './gasto-view.component.css'
})
export class GastoViewComponent {
  gastos: any[] = [];
  groupId: number= 0;

  constructor(private apiService: ApiService, public router: Router, private routeA: ActivatedRoute) {
    this.routeA.params.subscribe(params => {
      this.groupId = +params['id']; // Leer el ID del grupo desde los parámetros de la ruta
      //console.log("a", this.groupId);
      // Ahora puedes usar this.groupId para realizar operaciones con el ID del grupo
    });

    this.apiService.getGastos(this.groupId).subscribe(data => {
      this.gastos = data;
     // console.log(this.gastos);
    });
  }

  editar(id: number) {
    this.router.navigate(['group/gastos/edit/', id]);
  }
}
