import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  employeeId: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl =
    'https://43f4-2001-8f8-1737-1a8b-b0c1-b543-f6cf-422d.ngrok-free.app/api/employees/auth/login';

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      this.apiUrl,
      {
        email: email,
        password: password
      }
    );
  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
  }

  getToken(): string | null {

    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');
  }
}