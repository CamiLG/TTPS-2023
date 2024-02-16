import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-amigos-list',
  templateUrl: './amigos-list.component.html',
  styleUrl: './amigos-list.component.css'
})
export class AmigosListComponent {
  userId: any;
  amigos: any[] = [];

  constructor(private apiService: ApiService, public router: Router) {

    this.userId = localStorage.getItem("userId");

    this.apiService.getAmigos(this.userId).subscribe(data => {
      this.amigos = data;
      console.log(this.amigos);
    });

  }
}
