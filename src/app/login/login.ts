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
    this.errorMessage = 'Please enter email and password';
    return;
  }

  console.log('Login attempt:', this.email);

  this.auth.login(this.email, this.password).subscribe({

    next: (response) => {

      console.log('Login successful:', response);

      localStorage.setItem('loggedIn', 'true');

      this.router.navigate(['/employees']);

    },

    error: (error) => {

      console.error('FULL LOGIN ERROR:', error);
      console.error('Status:', error.status);
      console.error('Error body:', error.error);
      console.error('Message:', error.message);

      // If backend sends a message
      if (error.error?.message) {

       this.snackBar.open( error.error?.message, 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});

      } else if (typeof error.error === 'string') {

        this.errorMessage = error.error;

      } else {

         this.snackBar.open( "Invalid email or Password", 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});

      }

      console.log(
        'Error message displayed:',
        this.errorMessage
      );
    }

  });
}
}