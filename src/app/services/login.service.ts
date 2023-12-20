import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/usuarios/login';
  constructor(private http: HttpClient) { }

  login(usuario:string, password:string): Observable<any> {
    return this.http.post(this.apiUrl, { usuario, password }).pipe(
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
