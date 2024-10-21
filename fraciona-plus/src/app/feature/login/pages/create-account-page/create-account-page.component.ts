import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.scss'],
  providers: [MessageService]
})
export class CreateAccountPageComponent {

  constructor(
    readonly messageService: MessageService,
    readonly router: Router
  ) { }

  signUp(name: string, email: string, password: string, repassword: string) {
    if (!name || !email || !password || !repassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos!',
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

    this.router.navigate(['account/created']);
  }

}
