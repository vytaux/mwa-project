import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  #auth = inject(AuthService);
  router = inject(Router);
  errorMessage = signal<string>("");

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  constructor(){
    if(this.#auth.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  login() {
    this.errorMessage.set('');
    this.#auth
      .login(this.form.value as { email: string; password: string })
      .subscribe({
        next: (res) => {
          this.#auth.$state.set({
            email: res.data.email,
            token: res.data.token,
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage.set(error.error.data)
        }
      });
  }

}
