import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs';
import {Grupo} from "../models/Grupo";
import {GrupoDTO} from "../models/GrupoDTO";
import {environment as env} from "../../environments/environment";
import {Usuario} from "../models/Usuario";
import {CategoriaGrupo} from "../models/CategoriaGrupo";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${env.url}grupos/all`)
  }

  getGrupo(id: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${env.url}grupos/`+id)
  }

  getCategoriasGrupos(): Observable<CategoriaGrupo[]> {
    return this.http.get<CategoriaGrupo[]>(`${env.url}grupos/cat/all`)
  }

  getCategoria(): Observable<CategoriaGrupo[]> {
    return this.http.get<CategoriaGrupo[]>(`${env.url}grupos/cat/{id}`)
  }
  addGrupo(grupo: GrupoDTO):Observable<GrupoDTO>{
    return this.http.post<GrupoDTO>(`${env.url}grupos/create`, grupo).pipe(
      catchError(this.handleError)
    )
  }

  editarGrupo(grupo: Grupo, id:number):Observable<Grupo>{
    return this.http.put<Grupo>(`${env.url}grupos/`+id, grupo).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se produjo un error', error.error);
      //redirigir a pagina de error
    }
    else{
      console.error('La api retorno el codigo de estado', error.status, error.error);
      //redirigir a pagina de error
    }
    return throwError(()=> new Error('Algo fallo. Intente nuevamente'));
    //redirigir a pagina de error
  }

}
