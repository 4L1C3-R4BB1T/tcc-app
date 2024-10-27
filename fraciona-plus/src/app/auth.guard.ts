import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const user = this.auth.currentUser;
      if (user) {
        observer.next(true);
      } else {
        this.router.navigate(['/account']);
        observer.next(false);
      }
      observer.complete();
    });
  }
}
