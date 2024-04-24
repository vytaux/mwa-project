import { Component, inject, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  #auth = inject(AuthService);
  loggedIn = signal<boolean>(false);

  constructor(){
    if(this.#auth.isLoggedIn()){
      this.loggedIn.set(true);
    }
  }
}
