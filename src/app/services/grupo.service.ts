import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs';
import {Grupo} from "../models/Grupo";
import {CategoriaGrupo} from "../models/CategoriaGrupo";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = 'http://localhost:8080/grupos/all';

  constructor(private http: HttpClient) {
  }

  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl)
  }


}
