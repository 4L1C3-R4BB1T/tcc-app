import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/services/auth.service';
import { isValidEmail } from 'src/utils/validators';

@Component({
  selector: 'app-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrls: ['./recovery-page.component.scss'],
  providers: [MessageService]
})
export class RecoveryPageComponent {

  constructor(
    readonly authService: AuthService,
    readonly messageService: MessageService,
    readonly router: Router
  ) { }

  async recovery(email: string) {
    if (!email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Informe o email!',
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
      await this.authService.resetPassword(email);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Verifique seu e-mail para redefinir sua senha!',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível enviar o e-mail de redefinição de senha.',
      });
    }
  }

}
