import { Component } from '@angular/core';
import {GrupoService} from "../../services/grupo.service";
import {Grupo} from "../../models/Grupo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  grupos: any[] = [];
  constructor(private grupoService: GrupoService, public router: Router) {

   this.grupoService.getGrupos().subscribe( data => {
     this.grupos = data;
     console.log(this.grupos);
   });

  }

  detalle(){
    this.router.navigateByUrl('login')
  }

  editar(){
    this.router.navigateByUrl('login')
  }
}
