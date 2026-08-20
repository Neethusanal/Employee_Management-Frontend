import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  // Add JWT + ngrok header
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      })
    : req;

  return next(authReq).pipe(

    catchError(error => {

      if (error.status === 401) {

        console.log('Unauthorized - Invalid or expired token');

        localStorage.removeItem('token');

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })

  );
};