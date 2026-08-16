import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  // private apiUrl = 'http://localhost:8081/api/employees';
  private apiUrl = 'https://63fe-2001-8f8-1737-1a8b-c568-36df-b6d2-c6cd.ngrok-free.app/api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }


  createEmployee(employee: Employee): Observable<Employee> {

    const createUrl = `${this.apiUrl}/new`;

    console.log('API URL:', createUrl);
    console.log('Employee data being sent:', employee);

    return this.http.post<Employee>(createUrl, employee);
  }
  getEmployeeById(id: string): Observable<Employee> {
  return this.http.get<Employee>(
    `${this.apiUrl}/${id}`
  );
}

  updateEmployee(
    id: string,
    employee: Employee
  ): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiUrl}/${id}`,
      employee
    );
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}