import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { environment as env } from "../../environments/environment";
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${env.url}usuarios/login`;
  //currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({ usuario: '', password: '' });
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  //authToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null); // Nuevo BehaviorSubject para el token

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }
  login(usuario: string, password: string) {
    return this.http.post<any>(this.apiUrl, { usuario, password }).pipe(
      /*   tap((usuario: any) => {
        const token = usuario.token;
        if (token) {
          this.authToken.next(token);
          this.currentUserData.next(usuario.usuario);
          this.currentUserLoginOn.next(true);
          localStorage.setItem('userId', usuario.userId);
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify())
        }
      
      }),*/
     map((credentials => {
      if (credentials && credentials.token){
        localStorage.setItem('currentUser', JSON.stringify(credentials));
        this.currentUserSubject.next(credentials);
      }
      return credentials;
     }))
      //catchError(this.handleError)
    )
  }

  logout() {
    //localStorage.removeItem('token');
    //localStorage.removeItem('userId');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    //this.authToken.next(null);
    //this.currentUserData.next(null);
    //this.currentUserLoginOn.next(false);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se produjo un error', error.error);
      //redirigir a pagina de error
    }
    else {
      console.error('La api retorno el codigo de estado', error.status, error.error);
      //redirigir a pagina de error
    }
    return throwError(() => new Error('Algo fallo. Intente nuevamente'));
    //redirigir a pagina de error
  }

 

  /**
   * 
   * 
   *  get userData(): Observable<any> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<any> {
    return this.currentUserLoginOn.asObservable();
  }

  get authTokenValue(): string | null {
    return this.authToken.getValue(); // Obtener el valor actual del token
  }
   * isLogged(){
    //ver como hacer para que retorne el valor
    return this.currentUserLoginOn;
  }**/
}
