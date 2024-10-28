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
      await signInWithEmailAndPassword(this.auth, email, password);
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

  async removeUser(): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        console.log('Usuário removido com sucesso!');
      } catch (error) {
        console.error('Erro ao remover usuário:', error);
        throw error;
      }
    } else {
      console.error('Nenhum usuário autenticado.');
      throw new Error('Nenhum usuário autenticado.');
    }
  }

}
