import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { // <-- Inject Router
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  goToLogin() {
  this.router.navigate(['/']);
}


  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

      // Simulate user creation, then navigate to login
      this.router.navigate(['/']);
    }
  }
}
