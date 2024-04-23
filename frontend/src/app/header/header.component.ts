import { Component, inject } from '@angular/core';
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

  logout() {
    this.#auth.logout();
  }
}
