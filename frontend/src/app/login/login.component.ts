import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
  // ,
  // template: `
  // <form [formGroup]="form" (ngSubmit)="login()">
  //   <input type="email" placeholder="email" name="email" formControlname="email">
  //   <input type="password" placeholder="password" name="password" id="password" formControlName="password">
  //   <button type="submit" [disabled]="form.invalid">Login</button>
  // </form>
  // `,
  // styles:``
})

export class LoginComponent {
  #title = inject(Title);
  #auth = inject(AuthService);
  router = inject(Router);
  errorMessage = signal<string>("");

  form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    if (this.#auth.isLoggedIn()) {
      this.router.navigate(['']);
    }
    this.#title.setTitle('Login');
  }

  login() {
    this.errorMessage.set('');
    this.#auth
      .login(this.form.value as { email: string; password: string })
      .subscribe({
        next: (res) => {
          const decoded = jwtDecode<{ _id: string, email: string }>(res.data.token);

          this.#auth.$state.set({
            email: decoded.email,
            userId: decoded._id,
            token: res.data.token,
          });
          
          this.router.navigate(['']);
        },
        error: (error) => {
          this.errorMessage.set(error.error.data)
        }
      });
  }

}
