import { Component, signal } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Achievement } from 'src/app/models/achievement';
import { AchievementService } from 'src/app/services/achievement.service';

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.component.html',
  styleUrls: ['./achievement-page.component.scss'],
})
export class AchievementPageComponent implements ViewDidEnter {

  achievements = signal<Achievement[]>([]);

  loading = signal<boolean>(true);

  constructor(readonly achievementService: AchievementService) { }

  ionViewDidEnter(): void {
    this.loading.set(true);
    this.achievementService.findAll().subscribe({
      next: (data) => {
        this.achievements.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Erro ao carregar conquistas:", error);
        this.loading.set(false);
      }
    });
  }

}
