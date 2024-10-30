import { Injectable } from '@angular/core';
import { Auth, browserLocalPersistence, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth) {
    setPersistence(this.auth, browserLocalPersistence);
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(await userCredential.user.getIdToken()); // token q vc vai ter enviar pro backend. JWT <<<
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signUp(email: string, password: string, name: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(user, { displayName: name });
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      console.error(error);
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
