import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  #auth = inject(AuthService);
  user_email = signal<string>("");

  constructor(){
    this.user_email.set(this.#auth.$state().email);
  }

  logout() {
    this.#auth.logout();
  }
}
