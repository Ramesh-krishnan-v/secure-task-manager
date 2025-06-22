import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required], // Changed from email to username
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    // if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.http.post('/api/auth/login', { email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard-view']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
        alert(this.errorMessage);
      }
    });
  }

  goToCreateUser() {
    this.router.navigate(['/create-user']);
  }
}
