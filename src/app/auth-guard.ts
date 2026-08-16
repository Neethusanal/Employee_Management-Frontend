import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const loggedIn =
    localStorage.getItem('loggedIn') === 'true';

  if (loggedIn) {
    return true;
  }

  return router.createUrlTree(['/login']);
};