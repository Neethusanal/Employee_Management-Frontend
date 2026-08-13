import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit {

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  employeeId: string | null = null;

  employeeForm = this.fb.group({
    name: [''],
    email: [''],
    phoneNumber: [''],
    department: [''],
    designation: [''],
    joiningDate: [''],
    status: ['ACTIVE'],
    role: ['EMPLOYEE']
  });

  ngOnInit() {

    // Get employee ID from URL
    this.employeeId =
      this.route.snapshot.paramMap.get('employeeId');

    // If employee ID exists, we are editing
    if (this.employeeId) {

      this.isEditMode = true;

      this.employeeService
        .getEmployeeById(this.employeeId)
        .subscribe({

          next: (employee) => {

            console.log('Employee for editing:', employee);

            // Fill the form with existing employee data
            this.employeeForm.patchValue(employee);

          },

          error: (error) => {
            console.error('Error loading employee:', error);
          }

        });
    }
  }

  onSubmit() {

    if (this.employeeForm.invalid) {
      return;
    }

    const employee = this.employeeForm.value as Employee;

    // EDIT
    if (this.isEditMode && this.employeeId) {

      this.employeeService
        .updateEmployee(this.employeeId, employee)
        .subscribe({

          next: (updatedEmployee) => {

            console.log('Employee updated:', updatedEmployee);

            this.router.navigate(['/employees']);

          },

          error: (error) => {
            console.error('Error updating employee:', error);
          }

        });

    } 
    
    // ADD
    else {

      this.employeeService
        .createEmployee(employee)
        .subscribe({

          next: (newEmployee) => {

            console.log('Employee created:', newEmployee);

            this.router.navigate(['/employees']);

          },

          error: (error) => {
            console.error('Error creating employee:', error);
          }

        });
    }
  }
}