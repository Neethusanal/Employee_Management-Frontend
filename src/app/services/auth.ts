import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  //  private apiUrl = 'http://localhost:8081/api/employees/auth/login';
  private apiUrl =' https://89d7-2001-8f8-1737-1a8b-c568-36df-b6d2-c6cd.ngrok-free.app/api/employees/auth/login'

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    return this.http.post(this.apiUrl, {
      email: email,
      password: password
    });
  }

  logout() {
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}