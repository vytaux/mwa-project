import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (auth.$state().token) {
    const reqWithToken = req.clone(
      { headers: req.headers.set('Authorization', 'Bearer ' + auth.$state().token) }
    );
    return next(reqWithToken);
  } else {
    return next(req);
  }
};
