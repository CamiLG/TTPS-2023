import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${env.url}usuarios/login`;
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({usuario:'', password: ''});

  authToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null); // Nuevo BehaviorSubject para el token

  constructor(private http: HttpClient) { }

  login(usuario:string, password:string): Observable<any> {
    return this.http.post(this.apiUrl, { usuario, password }).pipe(
      tap((usuario: any) =>{
        const token = usuario.token;
        if (token) {
          this.authToken.next(token);
          this.currentUserData.next(usuario.usuario);
          this.currentUserLoginOn.next(true);
        }
      }),
      catchError(this.handleError)
    )
  }

  logout(){
    this.currentUserData.next(null);
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

  get userData():Observable<any>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<any>{
    return this.currentUserLoginOn.asObservable();
  }

  get authTokenValue(): string | null {
    return this.authToken.getValue(); // Obtener el valor actual del token
  }
}
