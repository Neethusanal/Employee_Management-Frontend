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

      this.errorMessage =
        'Please enter email and password';

      return;
    }

    console.log('Login attempt:', this.email);

    this.auth
      .login(this.email, this.password)
      .subscribe({

        // LOGIN SUCCESS
        next: (response) => {

          console.log(
            'Login successful:',
            response
          );

          // Store login state
          localStorage.setItem(
            'loggedIn',
            'true'
          );

          // Go to employee list
          this.router.navigate(['/employees']);
        },

        // LOGIN FAILED
        error: (error) => {

          console.error(
            'Login error:',
            error
          );

          this.errorMessage =
            'Invalid email or password';
        }

      });
  }
}