import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

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
    private router: Router
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

        this.errorMessage = error.error.message;

      } else if (typeof error.error === 'string') {

        this.errorMessage = error.error;

      } else {

        this.errorMessage = 'Invalid email or password';

      }

      console.log(
        'Error message displayed:',
        this.errorMessage
      );
    }

  });
}
}