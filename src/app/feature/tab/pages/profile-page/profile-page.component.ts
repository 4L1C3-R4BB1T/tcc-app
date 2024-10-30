import { Component, OnInit, signal } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, deleteUser, EmailAuthProvider, reauthenticateWithCredential, updateProfile, User } from '@angular/fire/auth';
import { deleteObject, getDownloadURL, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertButton } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { AchievementIcon } from 'src/app/models/achievement';
import { AuthService } from 'src/app/services/auth.service';
import ConfirmPasswordComponent from './components/confirm-password/confirm-password.component';
import { UserStatistics } from 'src/app/models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [DialogService, MessageService]
})
export class ProfilePageComponent implements OnInit {

  user = signal<User | null>(null);

  statistics: UserStatistics = {
    correctAnswers: 34,
    wrongAnswers: 23,
    qttAchievements: 8,
    totalExp: 1538
  }

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
      handler: async () => this.removeAccount()
    },
  ];

  constructor(
    readonly authService: AuthService,
    readonly auth: Auth,
    readonly dialogService: DialogService,
    readonly messageService: MessageService,
    readonly router: Router,
    readonly storage: Storage
  ) { }

  ngOnInit(): void {
    this.user.set(this.auth.currentUser);
  }

  async onUpload(event: Event) {
    try {
      const target = event.target as HTMLInputElement;
      if (target.files === null || !target.files.length) return;
      const file = target.files[0];
      const userId = this.user()?.uid;
      if (!userId) return;
      const filePath = `profile_pictures/${userId}/${file.name}`;
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      await updateProfile(this.user() as User, { photoURL: downloadUrl });
      this.messageService.add({
        severity: 'success',
        detail: 'Foto adicionada',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        detail: 'Erro ao fazer o upload da foto',
      });
    }
  }

  async deleteUserFiles(userId: string) {
    try {
      const userFilesRef = ref(this.storage, `profile_pictures/${userId}`);
      const result = await listAll(userFilesRef);
      await Promise.all(result.items.map(async item => {
        const fileRef = ref(this.storage, `profile_pictures/${userId}/${item.name}`);
        await deleteObject(fileRef);
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
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
    const dialog = this.dialogService.open(ConfirmPasswordComponent, {
      header: 'Confirmar Identidade',
      modal: true,
      width: '90vw',
      position: 'center',
    });

    dialog.onClose.pipe(first())
      .subscribe(async password => {
        try {
          const credential = EmailAuthProvider.credential(this.user()?.email!, password);
          await reauthenticateWithCredential(this.user()!, credential);
          await this.deleteUserFiles(this.user()?.uid!);

          this.messageService.add({
            severity: 'success',
            detail: 'Conta excluída!',
          });

          setTimeout(async () => {
            await deleteUser(this.user()!);
          }, 1000);

        } catch (error) {
          console.error(error);
          if (error instanceof FirebaseError && error.code === 'auth/invalid-credential') {
            this.messageService.add({
              severity: 'error',
              detail: 'Credenciais inválidas!',
            });
          }
        }
      });
  }

}
