import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth) { }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async signUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
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
