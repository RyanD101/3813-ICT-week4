import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  users = [
    {email: 'user1@gmail.com', password: '1234'}
  ];

  errorMessage = '';
  
  constructor(private router: Router) {}

  login() {
    const found = this.users.find(
      u => u.email === this.email && u.password === this.password
    );

    if (found) {
      this.router.navigate(['/profile']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
