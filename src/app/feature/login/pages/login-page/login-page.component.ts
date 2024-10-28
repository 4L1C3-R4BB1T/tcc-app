import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { isValidEmail } from 'src/app/utils/validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent {

  loading = signal(false);

  constructor(
    readonly authService: AuthService,
    readonly loadingController: LoadingController,
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

    this.loading.set(true);

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
    } finally {
      this.loading.set(false);
    }
  }

}
