import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent {

  loading = signal(false);

  constructor(
    readonly loadingController: LoadingController,
    readonly messageService: MessageService,
    readonly router: Router
  ) { }

  signIn(email: string, password: string) {
    if (!email || !password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos!',
      });
      return;
    }

    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['tabs']);
    }, 2000);
  }

}
