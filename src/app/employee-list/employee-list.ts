import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  employees = signal<Employee[]>([]);

  ngOnInit() {
    this.loadEmployees();
  }

  // GET all employees
  loadEmployees() {

    this.employeeService.getEmployees().subscribe({

      next: (data) => {
        this.employees.set(data);
        console.log('Backend response:', data);
      },

      error: (error) => {
        console.error('Backend connection failed:', error);
      }

    });

  }

  // ADD
  addEmployee() {
    this.router.navigate(['/employees/new']);
  }

  // EDIT
  editEmployee(employee: Employee) {
    this.router.navigate([
      '/employees/edit',
      employee.employeeId
    ]);
  }

  // DELETE
 deleteEmployee(employeeId?: string) {

  if (!employeeId) {
    console.error('Employee ID is missing');
    return;
  }

  const confirmed = confirm(
    'Are you sure you want to delete this employee?'
  );

  if (!confirmed) {
    return;
  }

  this.employeeService.deleteEmployee(employeeId).subscribe({

    next: () => {
      console.log('Employee deleted:', employeeId);
      this.loadEmployees();
    },

    error: (error) => {
      console.error('Error deleting employee:', error);
    }

  });
}
}