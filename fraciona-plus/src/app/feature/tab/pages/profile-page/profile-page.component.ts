import { Component } from '@angular/core';
import { AlertButton } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AchievementIcon } from 'src/app/models/achievement';
import { ChangeNameComponent } from './components/change-name/change-name.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [DialogService, MessageService]
})
export class ProfilePageComponent {

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
      handler: () => {
        console.log("Não")
      }
    },
    {
      text: 'Sim',
      role: 'yes',
      cssClass: '!text-black',
      handler: () => {
        console.log("Sim")
      }
    },
  ];

  public deleteAlertButtons: AlertButton[] = [
    {
      text: 'Cancelar',
      role: 'yes',
      cssClass: '!text-black',
      handler: () => {
        console.log("Sim")
      }
    },
    {
      text: 'Sim, deletar minha conta.',
      role: 'no',
      cssClass: '!text-black',
      handler: () => {
        console.log("Não")
      }
    },
  ];

  constructor(readonly dialogService: DialogService, readonly messageService: MessageService) { }

  public showDialog() {
    const ref = this.dialogService.open(ChangeNameComponent, {
      header: 'Atualizar nome',
      modal: true,
      width: '90vw',
      styleClass: 'bg-red-500',
      position: 'center',
    });

    ref.onClose.subscribe(result => {
      if (result) {
        this.messageService.add({
          severity: 'success',
          summary: 'Atualização', detail: 'Nome atualizado!',
          styleClass: 'left-0'
        });
      }
    });
  }

  values = ['Livia']

}
