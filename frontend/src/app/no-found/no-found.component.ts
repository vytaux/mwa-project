import { Component, inject, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-no-found',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './no-found.component.html',
})
export class NoFoundComponent {
  #auth = inject(AuthService);
  loggedIn = signal<boolean>(false);

  constructor(){
    if(this.#auth.isLoggedIn()){
      this.loggedIn.set(true);
    }
  }

}
