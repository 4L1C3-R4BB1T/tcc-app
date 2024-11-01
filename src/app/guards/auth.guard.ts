import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable(observer => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        observer.next(true);
      } else {
        observer.next(false);
        router.navigate(['account']);
      }
      observer.complete();
    });
  });
};
