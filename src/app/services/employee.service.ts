import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private apiUrl =
    'https://43f4-2001-8f8-1737-1a8b-b0c1-b543-f6cf-422d.ngrok-free.app/api/employees';


  // =========================
  // JWT + NGROK HEADERS
  // =========================

  private get headers(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Authorization': `Bearer ${token}`
    });

  }


  // =========================
  // GET EMPLOYEES
  // =========================

  getEmployees(
    page: number = 0,
    size: number = 10
  ): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      `${this.apiUrl}?page=${page}&size=${size}`,
      {
        headers: this.headers
      }
    );

  }


  // =========================
  // CREATE EMPLOYEE
  // =========================

  createEmployee(
    employee: Employee
  ): Observable<Employee> {

    return this.http.post<Employee>(
      `${this.apiUrl}/new`,
      employee,
      {
        headers: this.headers
      }
    );

  }


  // =========================
  // GET EMPLOYEE BY ID
  // =========================

  getEmployeeById(
    id: string
  ): Observable<Employee> {

    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.headers
      }
    );

  }


  // =========================
  // UPDATE EMPLOYEE
  // =========================

  updateEmployee(
    id: string,
    employee: Employee
  ): Observable<Employee> {

    return this.http.put<Employee>(
      `${this.apiUrl}/${id}`,
      employee,
      {
        headers: this.headers
      }
    );

  }


  // =========================
  // DELETE EMPLOYEE
  // =========================

  deleteEmployee(
    id: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.headers
      }
    );

  }

}