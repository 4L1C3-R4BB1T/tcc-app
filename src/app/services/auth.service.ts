import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isCreatingAccount = false; // Variável para rastrear a criação de conta

  constructor(private auth: Auth, private router: Router) {
    setPersistence(this.auth, browserLocalPersistence);
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(await userCredential.user.getIdToken()); // token para enviar para o backend (JWT)

      if (this.isCreatingAccount) {
        this.router.navigate(['account', 'created']);
        this.isCreatingAccount = false;
      } else {
        this.router.navigate(['tabs']);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signUp(email: string, password: string, name: string) {
    this.isCreatingAccount = true;
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(user, { displayName: name });
      return true;
    } catch (error) {
      console.error(error);
      this.isCreatingAccount = false;
      throw error;
    }
  }

  async signOut() {
    await this.auth.signOut();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
