import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Achievement } from 'src/app/models/achievement';
import { AchievementService } from 'src/app/services/achievement.service';

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.component.html',
  styleUrls: ['./achievement-page.component.scss'],
})
export class AchievementPageComponent implements ViewDidEnter {

  achievements: Achievement[] = [];

  constructor(readonly achievementService: AchievementService) { }

  ionViewDidEnter(): void {
    this.achievementService.findAll().subscribe({
      next: (data) => this.achievements = data,
      error: (error) => console.error("Erro ao carregar conquistas:", error)
    });
  }

}
