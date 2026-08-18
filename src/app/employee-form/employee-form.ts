import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
constructor(private snackBar: MatSnackBar) {}
  // Backend error message
  backendError = '';

  // Success message
  successMessage = '';

  isEditMode = false;
  employeeId: string | null = null;


  // =========================
  // FORM
  // =========================

  employeeForm = this.fb.group({

    name: ['', Validators.required],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phoneNumber: ['', Validators.required],

    department: ['', Validators.required],

    designation: ['', Validators.required],

    joiningDate: ['', Validators.required],

    status: ['ACTIVE', Validators.required],

    role: ['EMPLOYEE', Validators.required]

  });


  // =========================
  // VALIDATION
  // =========================

  isInvalid(fieldName: string): boolean {

    const field = this.employeeForm.get(fieldName);

    return !!field &&
      field.invalid &&
      (field.touched || field.dirty);
  }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.employeeId =
      this.route.snapshot.paramMap.get('employeeId');


    // EDIT MODE

    if (this.employeeId) {

      this.isEditMode = true;

      this.employeeService
        .getEmployeeById(this.employeeId)
        .subscribe({

          next: (employee) => {

            console.log(
              'Employee for editing:',
              employee
            );

            this.employeeForm.patchValue(employee);

          },

          error: (error) => {

            console.error(
              'Error loading employee:',
              error
            );

            this.snackBar.open( error.error?.message, 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});

          }

        });

    }

  }

  onJoiningDateChange(): void {

  const joiningDate =
    this.employeeForm.get('joiningDate')?.value;

  if (!joiningDate) {
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(joiningDate);
  selectedDate.setHours(0, 0, 0, 0);

  // Future joining date
  if (selectedDate > today) {

    this.employeeForm.patchValue({
      status: 'INACTIVE'
    });
  }
}
isFutureJoiningDate(): boolean {

  const joiningDate =
    this.employeeForm.get('joiningDate')?.value;

  if (!joiningDate) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(joiningDate);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate > today;
}

  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {

    // Clear old messages

    this.backendError = '';
    this.successMessage = '';


    // Check form validation

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;
    }


    const employee =
      this.employeeForm.value as Employee;


    // =========================
    // UPDATE
    // =========================

    if (this.isEditMode && this.employeeId) {

      this.employeeService
        .updateEmployee(
          this.employeeId,
          employee
        )
        .subscribe({

          next: (updatedEmployee) => {

            console.log(
              'Employee updated:',
              updatedEmployee
            );

            this.snackBar.open( "Employee updated successfully", 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});

            setTimeout(() => {

              this.router.navigate([
                '/employees'
              ]);

            }, 1000);

          },

          error: (error) => {

            console.error(
              'Error updating employee:',
              error
            );

            // Show backend error to user
             this.snackBar.open( error.error?.message, 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});

          }

        });

    }


    // =========================
    // CREATE
    // =========================

    else {

      this.employeeService
  .createEmployee(employee)
  .subscribe({

    next: (newEmployee) => {

      console.log(
        'Employee created:',
        newEmployee
      );

      this.snackBar.open('Employee created successfully!', 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});
      setTimeout(() => {
        this.router.navigate(['/employees']);
      }, 1000);

    },

    error: (error) => {

      console.log('CREATE ERROR:', error);
      console.log('STATUS:', error.status);
      console.log('ERROR BODY:', error.error);
      console.log('MESSAGE:', error.error?.message);

      // this.backendError =
      //   error?.error?.message ||
      //   error?.error ||
      //   'Something went wrong.';

      this.snackBar.open( error.error?.message, 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});

      console.log(
        'backendError displayed:',
        this.backendError
      );

    }

  });

      

    }

  }


  // =========================
  // GET BACKEND ERROR MESSAGE
  // =========================

  private getErrorMessage(error: any): string {

    console.error(
      'FULL BACKEND ERROR:',
      error
    );


    // Case 1:
    // Backend returns:
    // { "message": "Email already exists" }

    if (error?.error?.message) {

      return error.error.message;

    }


    // Case 2:
    // Backend returns plain text:
    // "Email already exists"

    if (typeof error?.error === 'string') {

      return error.error;

    }


    // Case 3:
    // Backend returns an error field

    if (error?.error?.error) {

      return error.error.error;

    }


    // Case 4:
    // HTTP status

    if (error?.status === 400) {

      return 'Invalid employee data.';

    }

    if (error?.status === 401) {

      return 'You are not authorized.';

    }

    if (error?.status === 403) {

      return 'You do not have permission to perform this action.';

    }

    if (error?.status === 404) {

      return 'Employee not found.';

    }

    if (error?.status === 409) {

      return 'Email already exists.';

    }

    if (error?.status === 500) {

      return 'Server error. Please try again.';

    }


    // Default

    return 'Something went wrong. Please try again.';

  }

}