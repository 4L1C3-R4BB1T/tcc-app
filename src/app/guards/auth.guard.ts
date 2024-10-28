import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    const user = auth.currentUser;
    if (user) {
      observer.next(true);
    } else {
      router.navigate(['/account']);
      observer.next(false);
    }
    observer.complete();
  });
};
