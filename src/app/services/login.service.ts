import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/usuarios/login';
  constructor(private http: HttpClient) { }

  login(usuario:string, password:string): Observable<any> {
    return this.http.post(this.apiUrl, { usuario, password });
  }
}
