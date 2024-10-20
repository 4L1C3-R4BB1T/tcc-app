import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrls: ['./recovery-page.component.scss'],
  providers: [MessageService]
})
export class RecoveryPageComponent {

  loading = signal(false);

  constructor(
    readonly loadingController: LoadingController,
    readonly messageService: MessageService,
    readonly router: Router
  ) { }

  recovery(email: string) {
    if (!email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Informe o email!',
      });
      return;
    }

    this.messageService.add({
        severity: 'success',
        summary: 'Recuperação de Senha',
        detail: 'Email enviado!',
      });
  }

}
