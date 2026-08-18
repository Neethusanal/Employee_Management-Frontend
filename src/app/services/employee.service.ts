import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private apiUrl =' https://43f4-2001-8f8-1737-1a8b-b0c1-b543-f6cf-422d.ngrok-free.app/api/employees';

  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      this.apiUrl,
      {
        headers: this.headers
      }
    );

  }

  createEmployee(employee: Employee): Observable<Employee> {

    return this.http.post<Employee>(
      `${this.apiUrl}/new`,
      employee,
      {
        headers: this.headers
      }
    );

  }

  getEmployeeById(id: string): Observable<Employee> {

    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.headers
      }
    );

  }

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

  deleteEmployee(id: string): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.headers
      }
    );

  }
}