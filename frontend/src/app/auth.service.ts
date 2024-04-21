import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from './../environments/environment.development'
 
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
 
export interface State {
  email: string;
  token: string;
}
 
export interface Token {
  token: string;
}
 
export const initialState = {
  email: 'guest@todo.mania',
  token: '',
};
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    effect(() => {
      localStorage.setItem('State', JSON.stringify(this.$state()));
    });
  }
 
  readonly #http = inject(HttpClient);
  $state = signal<State>(initialState);
 
  login(credentials: { email: string; password: string }) {
    return this.#http.post<loginResponse>(
      environment.apiUrl+'api/v1/login',
      credentials
    );
  }
 
  is_logged_in() {
    return this.$state().token ? true : false;
  }
}
 