import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  #title = inject(Title);
  #auth = inject(AuthService);
  router = inject(Router);
  message = signal<string>("");

  form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  }, { validators: this.match_password });

  match_password(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirm_password')?.value
      ? null
      : { mismatch: true }
  }

  constructor() {
    if (this.#auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.#title.setTitle('Register');
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
          console.log(error);
          this.message.set("Couldn't create an account. Please try again!")
        }
      });
  }
}