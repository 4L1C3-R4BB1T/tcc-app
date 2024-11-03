import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { AchievementService } from 'src/app/services/achievement.service';
import { AuthService } from 'src/app/services/auth.service';
import { isValidEmail } from 'src/app/utils/validators';
import { SectionService } from './../../../../services/section.service';
import { StatisticService } from './../../../../services/statistic.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.scss'],
  providers: [MessageService]
})
export class CreateAccountPageComponent {

  loading = signal(false);

  constructor(
    readonly authService: AuthService,
    readonly loadingController: LoadingController,
    readonly messageService: MessageService,
    readonly router: Router,
    readonly statisticService: StatisticService,
    readonly achievementService: AchievementService,
    readonly sectionService: SectionService
  ) { }

  async signUp(name: string, email: string, password: string, repassword: string) {
    if (!name || !email || !password || !repassword) {
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

    if (password.length < 6) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'A senha deve ter no mínimo 6 caracteres!',
      });
      return;
    }

    if (password !== repassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Confirmação de senha incorreta!',
      });
      return;
    }

    this.loading.set(true);

    try {
      await this.authService.signUp(email, password, name);

      this.statisticService.create().subscribe({
        next: () => console.log("Estatísticas criadas para o usuário"),
        error: (error) => console.error("Erro ao criar estatísticas:", error)
      }); // criar estatisticas para o usuario

      this.sectionService.create().subscribe({
        next: (data) => console.log("Seções setadas para o usuário"),
        error: (error) => console.error("Erro ao criar seções para o usuário:", error)
      }); // criar seções para o usuario

      this.router.navigate(['account', 'created']);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Este e-mail já foi cadastrado!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível realizar o cadastro.',
        });
      }
    } finally {
      this.loading.set(false);
    }
  }

}
