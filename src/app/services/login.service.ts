import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/usuarios/login';
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({usuario:'', password: ''});

  constructor(private http: HttpClient) { }

  login(usuario:string, password:string): Observable<any> {
    return this.http.post(this.apiUrl, { usuario, password }).pipe(
      tap(usuario =>{
        this.currentUserData.next(usuario);
        this.currentUserLoginOn.next(true);
      }),
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

  get userData():Observable<any>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn():Observable<any>{
    return this.currentUserLoginOn.asObservable();
  }
}
