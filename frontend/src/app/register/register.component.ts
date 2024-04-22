import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  #auth = inject(AuthService);
  router = inject(Router);
  message = signal<string>("");

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  });

  constructor() {
    if (this.#auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  register() {
    this.message.set('');
    this.#auth
      .register(this.form.value as { email: string; password: string })
      .subscribe({
        next: (res) => {
          this.message.set('Account Created Sucessfully! Proceed to login')
        },
        error: (error) => {
          this.message.set(error.error.data)
        }
      });
  }
}