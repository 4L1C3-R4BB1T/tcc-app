import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/services/auth.service';
import { isValidEmail } from 'src/utils/validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent {

  constructor(
    readonly authService: AuthService,
    readonly messageService: MessageService,
    readonly router: Router
  ) { }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos!',
      });
      return;
    }

    if (!isValidEmail(email)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Email inválido!',
      });
      return;
    }

    try {
      await this.authService.signIn(email, password);
      this.router.navigate(['tabs']);
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Credenciais inválidas!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao fazer login.',
        });
      }
    }
  }

}
