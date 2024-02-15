import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs';
import {Grupo} from "../models/Grupo";
import {GrupoDTO} from "../models/GrupoDTO";
import {Gasto} from "../models/Gasto";
import {environment as env} from "../../environments/environment";
import {Usuario} from "../models/Usuario";
import {CategoriaGrupo} from "../models/CategoriaGrupo";
import {CategoriaGasto} from "../models/CategoriaGasto";
import {FormasDivision} from "../models/FormasDivision";
import {GastoDTO} from "../models/GastoDTO";

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

  getGastos(id:number): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${env.url}grupos/gastosDelGrupo/`+id)
  }

  addGasto(gasto: GastoDTO):Observable<GastoDTO>{
    return this.http.post<GastoDTO>(`${env.url}gastos/create`, gasto).pipe(
      catchError(this.handleError)
    )
  }

  getCategoriasGastos(): Observable<CategoriaGasto[]> {
    return this.http.get<CategoriaGasto[]>(`${env.url}gastos/cat/all`)
  }

  getFormasDivision(): Observable<FormasDivision[]> {
    return this.http.get<FormasDivision[]>(`${env.url}division/all`)
  }

  getGasto(id: number): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${env.url}gastos/`+id)
  }

  editarGasto(gasto: Gasto, id:number):Observable<Gasto>{
    return this.http.put<Gasto>(`${env.url}gastos/`+id, gasto).pipe(
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
