import { Component, OnInit, signal } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { UserRanking } from 'src/app/models/user';
import { AchievementService } from 'src/app/services/achievement.service';
import { RankingService } from 'src/app/services/ranking.service';
import { StatisticService } from './../../../../services/statistic.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, ViewDidEnter {

  userRanking = signal<UserRanking | null>(null);

  offensive = signal<number>(0);

  activities = signal<Date[]>([]);
  daysWithActivity: boolean[] = [false, false, false, false, false, false, false];

  constructor(
    readonly rankingService: RankingService,
    readonly statisticService: StatisticService,
    readonly achievementService: AchievementService
  ) { }

  ngOnInit(): void {
    this.loadingData();
  }

  ionViewDidEnter(): void {
    this.loadingData();
  }

  loadingData() {
    this.rankingService.findByUser().subscribe({
      next: (data) => this.userRanking.set(data),
      error: (error) => console.error("Erro ao carregar ranking do usuário:", error)
    });

    this.statisticService.findByUser().subscribe({
      next: (data) => {
        this.offensive.set(data.offensive),
          this.activities.set(data.activities.map(activity => {
            let date = activity.date as unknown as string;
            const [year, month, day] = date.split('T')[0].split('-').map(Number);
            return new Date(year, month - 1, day);
          }));
        this.markDaysWithActivity();
      },
      error: (error) => console.error('Erro ao buscar estatísticas:', error)
    });

    this.achievementService.checkAchievements().subscribe({
      next: () => console.log("Conquistas verificadas com sucesso"),
      error: (error) => console.error("Erro ao checar conquistas:", error)
    });
  }

  markDaysWithActivity() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.activities().forEach(activity => {
      const dayOfWeek = activity.getDay();
      if (activity >= this.getStartOfWeek(today)) {
        this.daysWithActivity[dayOfWeek] = true;
      }
    });
  }

  getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
  }

}
