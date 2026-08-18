


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {

    // Clear previous error
    this.errorMessage = '';

    // Validate fields
    if (!this.email || !this.password) {
      this.errorMessage =
        'Please enter email and password';
      return;
    }

    console.log('Login attempt:', this.email);

    this.auth.login(this.email, this.password).subscribe({

      next: (response) => {

        console.log(
          'Login successful:',
          response
        );

        // Store JWT token
        localStorage.setItem(
          'token',
          response.token
        );

        // Store employee information
        localStorage.setItem(
          'employeeId',
          response.employeeId
        );

        localStorage.setItem(
          'name',
          response.name
        );

        localStorage.setItem(
          'role',
          response.role
        );

        this.snackBar.open(
          'Login successful!',
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );

        this.router.navigate(['/employees']);
      },

      error: (error) => {

        console.error(
          'FULL LOGIN ERROR:',
          error
        );

        console.error(
          'Status:',
          error.status
        );

        console.error(
          'Error body:',
          error.error
        );

        console.error(
          'Message:',
          error.message
        );

        // Backend error message
        if (error.error?.message) {

          this.snackBar.open(
            error.error.message,
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );

        } else if (
          typeof error.error === 'string'
        ) {

          this.snackBar.open(
            error.error,
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );

        } else {

          this.snackBar.open(
            'Invalid email or password',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
        }
      }
    });
  }
}