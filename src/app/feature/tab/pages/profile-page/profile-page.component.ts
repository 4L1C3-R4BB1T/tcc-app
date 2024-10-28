import { Component, OnInit, signal } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertButton } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AchievementIcon } from 'src/app/models/achievement';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [DialogService, MessageService]
})
export class ProfilePageComponent implements OnInit {

  user = signal<User | null>(null);

  achievements: AchievementIcon[] = [
    {
      image: 'baby.png',
      color: '#39FF14'
    },
    {
      image: 'puzzle.png',
      color: '#39FF14'
    },
    {
      image: 'brain.png',
      color: '#00BFFF'
    },
    {
      image: 'explorer.png',
      color: '#00BFFF'
    },
    {
      image: 'marathon.png',
      color: '#00BFFF'
    },
    {
      image: 'party.png',
      color: '#8A2BE2'
    },
    {
      image: 'graduation.png',
      color: '#FF4500'
    }
  ];

  public closeAlertButtons: AlertButton[] = [
    {
      text: 'Não',
      role: 'no',
      cssClass: '!text-black',
      handler: () => console.log("Não")
    },
    {
      text: 'Sim',
      role: 'yes',
      cssClass: '!text-black',
      handler: () => this.signOut()
    },
  ];

  public deleteAlertButtons: AlertButton[] = [
    {
      text: 'Cancelar',
      role: 'yes',
      cssClass: '!text-black',
      handler: () => console.log("Cancelar")
    },
    {
      text: 'Sim, deletar minha conta.',
      role: 'no',
      cssClass: '!text-black',
      handler: () => this.removeAccount()
    },
  ];

  constructor(
    readonly authService: AuthService,
    readonly auth: Auth,
    readonly dialogService: DialogService,
    readonly messageService: MessageService,
    readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user.set(this.auth.currentUser);
  }

  async signOut() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível desconectar. Tente novamente mais tarde.',
      });
    }
  }

  async removeAccount() {
    try {
      await this.authService.removeUser();
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Sua conta foi removida com sucesso!',
      });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível remover sua conta. Tente novamente mais tarde.',
      });
    }
  }

}
