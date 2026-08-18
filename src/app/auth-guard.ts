import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './services/auth'
export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const auth = inject(Auth);

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};