import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../models/Usuario';
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${env.url}usuarios/create`;

  constructor(private http:HttpClient) { }

  register(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
      catchError(this.handleError)
    );
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
