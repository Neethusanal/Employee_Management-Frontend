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

  login() {

    if (this.email && this.password) {

     this.auth.login(this.email, this.password).subscribe({
  next: (response) => {

    localStorage.setItem('loggedIn', 'true');

    this.router.navigate(['/employees']);

  },

  error: (error) => {

    this.errorMessage = 'Invalid email or password';

  }
});

      this.router.navigate(['/employees']);

    } else {

      this.errorMessage = 'Please enter email and password';

    }
  }
}