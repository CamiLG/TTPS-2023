import {Component} from '@angular/core';
import {Grupo} from "../../models/Grupo";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  grupos: any[] = [];

  constructor(private apiService: ApiService, public router: Router) {

    this.apiService.getGrupos().subscribe(data => {
      this.grupos = data;
      //console.log(this.grupos);
    });
  }


  detalle(id: number) {
    this.router.navigate(['group/view/', id]);
  }
   editar(id: number) {
    this.router.navigate(['group/', id]);
  }

  crearGrupo() {
    this.router.navigateByUrl('group/add')
  }

}
