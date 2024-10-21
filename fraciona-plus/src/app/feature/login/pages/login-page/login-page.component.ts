import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent {

  constructor(
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

    this.router.navigate(['tabs']);
  }

}
