import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './add-token.interceptor';
import { AuthService } from './auth.service';

const bootstrap = () => {
  const auth = inject(AuthService);
  return () => {
    const local_state = localStorage.getItem('DUMMY_STATE');
    if(local_state){
      auth.$state.set(JSON.parse(local_state));
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    {provide: APP_INITIALIZER, multi: true, useFactory: bootstrap}
  ],
};
