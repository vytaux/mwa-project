import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    this.auth
      .login(this.form.value as { email: string; password: string })
      .subscribe({
        next: (res) => {
          if (!res.success) {
            throw new Error('Login failed');
          }
          this.auth.$state.set({
            email: res.data.email,
            token: res.data.token,
          });
          this.router.navigate(['/workspace']);
        },
        error: (error) => {
          this.router.navigate(['/register']);
        }
      });
  }

}
