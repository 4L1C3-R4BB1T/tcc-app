import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authLoggedGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const authService = inject(AuthService);

  return new Observable(observer => {
    auth.onAuthStateChanged(user => {
      if (user) {
        if (authService.isCreatingAccount) {
          router.navigate(['account', 'created']);
        } else {
          router.navigate(['tabs']);
        }
        observer.next(false)
      } else {
        observer.next(true);
      }
      observer.complete();
    });
  });
};
