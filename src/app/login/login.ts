import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  
  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.http.post<any>('http://localhost:3000/api/auth', {
      email: this.email,
      password: this.password
    })
    .subscribe(data => {
      if (data.valid){
        localStorage.setItem("user", JSON.stringify({
          email: data.email,
          username: data.username,
          birthdate: data.birthdate,
          age: data.age
        }));

        this.router.navigate(['/profile']);
      } else {
        this.errorMessage = 'Invalid email or password';
      } 
    },
    error => {
      this.errorMessage = 'Server error, please try again later';
      console.error(error);
    }
  );
}
}
