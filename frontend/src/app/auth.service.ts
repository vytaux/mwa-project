import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from './../environments/environment.development'
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface loginResponse {
  success: boolean;
  data: {
    email: string;
    token: string;
  };
}

export interface registerResponse {
  success: boolean;
  data: number;
}

export interface State {
  email: string;
  token: string;
}

export interface Token {
  token: string;
}

export const initialState = {
  email: "", 
  // email: 'guest@todo.mania',
  token: ""
  // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI0NjhkOGY5M2FjNWQ0M2ZhZjRiZDciLCJlbWFpbCI6InNvbWVAZ21haWwuY29tIiwiaWF0IjoxNzEzNjYyMTcyfQ.kw03uktZrpzsC72vD66ZFGtDmdB7FWnlIEU7cOU9pBM',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #http = inject(HttpClient);
  #router = inject(Router);
  $state = signal<State>(initialState);

  constructor(router: Router) {
    effect(() => {
      localStorage.setItem('State', JSON.stringify(this.$state()));
    });
  }

  login(credentials: { email: string; password: string }) {
    return this.#http.post<loginResponse>(
      environment.apiUrl + '/login',
      credentials
    );
  }

  register(credentials: { email: string; password: string }) {
    return this.#http.post<registerResponse>(
      environment.apiUrl + '/register',
      credentials
    );
  }

  isLoggedIn() {
    return true;
    return this.$state().token ? true : false;
  }

  // canActivate(): boolean {
  //   console.log('guard');

  //   // TODO fix and remove
  //   return true;
  //   const isLoggedIn = !!localStorage.getItem('token');

  //   if (!isLoggedIn) {
  //     this.#router.navigate(['/login']);
  //   }

  //   return isLoggedIn;
  // }
}
