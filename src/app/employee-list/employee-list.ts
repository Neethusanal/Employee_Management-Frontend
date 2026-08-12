import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);

  employees: any[] = [];

  ngOnInit() {

    this.employeeService.getEmployees().subscribe({

      next: (data) => {
        this.employees = data;

        console.log('Backend response:', data);
      },

      error: (error) => {
        console.error('Backend connection failed:', error);
      }

    });

  }
}